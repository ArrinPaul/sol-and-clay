// Main exports from Firebase configuration
export { db, storage } from './config';
export type { FirestorePermissionError } from './errors';
export { FirebaseError, handleFirebaseError } from './errors';
export { errorEmitter } from './error-emitter';
export type { WithId } from './types';
export { toWithId } from './types';

// Admin SDK exports (for server-side use only)
export { getAdminDb, getAdminStorage, COLLECTIONS } from './admin';
