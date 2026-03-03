
'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { filterCollaborationRequest } from '@/ai/flows/filter-collaboration-requests';
import { getAdminDb, getAdminStorage, COLLECTIONS } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { checkRateLimit, getClientIdentifier, RateLimiters } from '@/lib/rate-limit';
import { sendCollaborationNotification } from '@/lib/email';

const formSchema = z.object({
  studioName: z.string().min(1, 'Studio name is required'),
  email: z.string().email('Invalid email address'),
  portfolioURL: z.string().url('Invalid portfolio URL'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  image: z.instanceof(File).optional(),
});

/**
 * Upload image to Firebase Storage and return the download URL.
 */
async function uploadImage(file: File, studioName: string): Promise<string | null> {
  try {
    const storage = getAdminStorage();
    const bucket = storage.bucket();
    
    // Create a unique filename
    const timestamp = Date.now();
    const sanitizedName = studioName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `collaborations/${sanitizedName}-${timestamp}.${extension}`;
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Firebase Storage
    const fileRef = bucket.file(filename);
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });
    
    // Make the file publicly accessible
    await fileRef.makePublic();
    
    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function submitCollaborationRequest(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const clientId = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit(`collaboration:${clientId}`, RateLimiters.formSubmission);
  
  if (!rateLimitResult.allowed) {
    const waitSeconds = Math.ceil(rateLimitResult.resetInMs / 1000);
    return { 
      success: false, 
      error: `Too many submissions. Please try again in ${waitSeconds} seconds.` 
    };
  }

  const rawFormData = {
    studioName: formData.get('studioName'),
    email: formData.get('email'),
    portfolioURL: formData.get('portfolioURL'),
    message: formData.get('message'),
    image: formData.get('image'),
  };

  const parsed = formSchema.safeParse(rawFormData);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map(e => e.message).join(', ');
    return { success: false, error: errorMessages };
  }

  const { studioName, email, portfolioURL, message, image } = parsed.data;

  try {
    // Upload image if provided
    let imageURL: string | null = null;
    if (image && image.size > 0) {
      imageURL = await uploadImage(image, studioName);
    }

    // Analyze the submission with AI
    const analysisResult = await filterCollaborationRequest({
      studioName,
      email,
      portfolioURL,
      pitch: message,
      imageURL: imageURL || 'https://picsum.photos/seed/placeholder/800/600',
    });

    // Determine status based on AI analysis
    let status = 'pending_review';
    if (analysisResult.isSpam) {
      status = 'rejected_spam';
    } else if (!analysisResult.isRelevant) {
      status = 'rejected_irrelevant';
    } else {
      status = 'pending_review';
    }

    // Save to Firestore
    const db = getAdminDb();
    const collaborationsRef = db.collection(COLLECTIONS.COLLABORATIONS);
    
    const docData = {
      studioName,
      email,
      portfolioURL,
      pitch: message,
      imageURL,
      status,
      isSpam: analysisResult.isSpam,
      isRelevant: analysisResult.isRelevant,
      reason: analysisResult.reason,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const docRef = await collaborationsRef.add(docData);
    
    console.log('✅ Collaboration saved to Firestore with ID:', docRef.id);

    // Notify admin about new collaboration request
    await sendCollaborationNotification(studioName, email, status);

    return { 
      success: true, 
      id: docRef.id,
      status,
    };
  } catch (error) {
    console.error('Error processing collaboration request:', error);
    return {
      success: false,
      error: 'An error occurred while processing your submission. Please try again.',
    };
  }
}

    