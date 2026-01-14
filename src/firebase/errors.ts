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

export const handleFirebaseError = (error: unknown): FirestorePermissionError => {
  if (error instanceof Error) {
    return {
      code: (error as any).code || 'UNKNOWN_ERROR',
      message: error.message,
    };
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
  };
};
