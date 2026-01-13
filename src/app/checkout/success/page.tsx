'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/utils/fade-in';
import { CheckCircle, Home } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export const dynamic = 'force-dynamic';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  // Clear the cart after a successful purchase
  useEffect(() => {
    // We get the session_id from the URL to confirm it was a success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('session_id')) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn className="flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-24 w-24 text-brand-brown mb-6" />
        <h1 className="font-headline text-4xl font-bold text-dark-brown">
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
