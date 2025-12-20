'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// Firebase initialization for Firestore only
// Authentication is handled by Firebase Auth
export function initializeFirebase() {
  if (!getApps().length) {
    // Always initialize explicitly with the provided firebaseConfig object.
    // Relying on environment-provided credentials can be fragile in local dev
    // and inside some hosting environments. Using the explicit config keeps
    // behavior deterministic.
    const firebaseApp = initializeApp(firebaseConfig);
    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';

// Re-export WithId type for convenience
export type { WithId } from './firestore/use-collection';

// Add useToast to the exports
export { useToast };
