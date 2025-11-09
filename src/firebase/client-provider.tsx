'use client';

// @ts-expect-error - React hooks are exported correctly in runtime even though IDE doesn't recognize them in 'use client' components
import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side for Firestore only
    // Authentication is handled by Clerk
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // @ts-expect-error - Provider children false positive in 'use client' components
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}