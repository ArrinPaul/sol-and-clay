
'use server';

import { z } from 'zod';
import { filterCollaborationRequest } from '@/ai/flows/filter-collaboration-requests';

const formSchema = z.object({
  studioName: z.string(),
  email: z.string().email(),
  portfolioURL: z.string().url(),
  message: z.string(),
  image: z.instanceof(File),
});

export async function submitCollaborationRequest(formData: FormData) {
  const rawFormData = {
    studioName: formData.get('studioName'),
    email: formData.get('email'),
    portfolioURL: formData.get('portfolioURL'),
    message: formData.get('message'),
    image: formData.get('image'),
  };

  const parsed = formSchema.safeParse(rawFormData);
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const { studioName, email, portfolioURL, message } = parsed.data;

  // In a real application, you would upload the image to Firebase Storage
  // and get a downloadable URL. For this demo, we'll use a placeholder.
  const imageURL = 'https://picsum.photos/seed/sample-upload/800/600';

  try {
    const analysisResult = await filterCollaborationRequest({
      studioName,
      email,
      portfolioURL,
      pitch: message, // Use `message` field from form as `pitch`
      imageURL,
    });

    // In a real application, you would now save the submission and the
    // analysis result to your Firestore 'collaborations' collection.
    console.log('Collaboration submission received:', {
      ...parsed.data,
      image: { name: parsed.data.image.name, size: parsed.data.image.size },
    });
    console.log('AI Analysis Result:', analysisResult);

    // You could set a status based on the analysis
    let status = 'pending_review';
    if (analysisResult.isSpam) {
      status = 'rejected_spam';
    } else if (!analysisResult.isRelevant) {
      status = 'rejected_irrelevant';
    }

    // Example of what you would save to Firestore:
    const dataToSave = {
      studioName,
      email,
      portfolioURL,
      pitch: message,
      imageURL, // The URL from Firebase Storage
      status,
      aiReasoning: analysisResult.reason,
      createdAt: new Date().toISOString(),
    };

    console.log('Data to save to Firestore:', dataToSave);

    return { success: true };
  } catch (error) {
    console.error('Error processing collaboration request:', error);
    return {
      success: false,
      error: 'An error occurred while analyzing the submission.',
    };
  }
}

    