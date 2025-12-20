
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/utils/fade-in';
import { XCircle, ShoppingCart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn className="flex flex-col items-center justify-center text-center">
        <XCircle className="h-24 w-24 text-destructive mb-6" />
        <h1 className="font-headline text-4xl font-bold text-foreground">
          Payment Cancelled
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your order was not processed. Your cart has been saved, so you can
          try again anytime.
        </p>
        <Button asChild className="mt-8">
          <Link href="/cart">
            <ShoppingCart className="mr-2" />
            Return to Cart
          </Link>
        </Button>
      </FadeIn>
    </div>
  );
}
