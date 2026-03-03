export type FirestorePermissionError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

export class FirebaseError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'FirebaseError';
  }
}

interface FirebaseErrorLike extends Error {
  code?: string;
}

export const handleFirebaseError = (error: unknown): FirestorePermissionError => {
  if (error instanceof Error) {
    const firebaseError = error as FirebaseErrorLike;
    return {
      code: firebaseError.code || 'UNKNOWN_ERROR',
      message: error.message,
    };
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
  };
};
