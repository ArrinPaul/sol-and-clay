
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/utils/fade-in';
import { CheckCircle, Home } from 'lucide-react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

export default function CheckoutSuccessPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const cartRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'cartItems')
        : null,
    [user, firestore]
  );

  // Clear the cart after a successful purchase
  useEffect(() => {
    const clearCart = async () => {
      if (cartRef) {
        const querySnapshot = await getDocs(cartRef);
        const batch = writeBatch(firestore);
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    };
    
    // We get the session_id from the URL to confirm it was a success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('session_id')) {
      clearCart();
    }
  }, [cartRef, firestore]);

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn className="flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h1 className="font-headline text-4xl font-bold text-foreground">
          Thank You for Your Order!
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your payment was successful. A confirmation email has been sent to you.
          We are now preparing your handcrafted items with care.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <Home className="mr-2" />
            Back to Home
          </Link>
        </Button>
      </FadeIn>
    </div>
  );
}
