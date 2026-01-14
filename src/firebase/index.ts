// Main exports from Firebase configuration
export { db, storage, auth } from './config';
export type { FirestorePermissionError } from './errors';
export { FirebaseError, handleFirebaseError } from './errors';
export { errorEmitter } from './error-emitter';
export type { WithId } from './types';
export { toWithId } from './types';
