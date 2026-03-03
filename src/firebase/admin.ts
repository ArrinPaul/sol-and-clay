import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

/**
 * Firebase Admin SDK configuration for server-side operations.
 * This is used in API routes and server actions to perform
 * secure database operations that bypass Firestore security rules.
 */

let adminApp: App | undefined;
let adminDb: Firestore | undefined;
let adminStorage: Storage | undefined;

function getAdminApp(): App {
  if (adminApp) {
    return adminApp;
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0];
    return adminApp;
  }

  // Check for service account credentials
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (serviceAccount) {
    try {
      const parsedServiceAccount = JSON.parse(serviceAccount);
      adminApp = initializeApp({
        credential: cert(parsedServiceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch (error) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error);
      throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY format. Must be valid JSON.');
    }
  } else {
    // Fallback: Initialize without credentials (works in Firebase hosting/Cloud Run)
    // This uses Application Default Credentials
    adminApp = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }

  return adminApp;
}

/**
 * Get the Firebase Admin Firestore instance.
 * Use this for server-side database operations.
 */
export function getAdminDb(): Firestore {
  if (adminDb) {
    return adminDb;
  }
  
  const app = getAdminApp();
  adminDb = getFirestore(app);
  return adminDb;
}

/**
 * Get the Firebase Admin Storage instance.
 * Use this for server-side file uploads.
 */
export function getAdminStorage(): Storage {
  if (adminStorage) {
    return adminStorage;
  }
  
  const app = getAdminApp();
  adminStorage = getStorage(app);
  return adminStorage;
}

/**
 * Collection names as constants to avoid typos.
 */
export const COLLECTIONS = {
  COLLABORATIONS: 'collaborations',
  ORDERS: 'orders',
  USERS: 'users',
  PRODUCTS: 'products',
  COLLECTIONS: 'collections',
  CONTACTS: 'contacts',
  CUSTOM_ORDERS: 'customOrders',
} as const;
