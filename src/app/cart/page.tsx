'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { ShoppingBag, X, Loader2, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  useFirestore,
  useCollection,
  useMemoFirebase,
  deleteDocumentNonBlocking,
  useToast,
} from '@/firebase';
import { useAuth } from '@/firebase/hooks/use-auth';
import { collection, doc } from 'firebase/firestore';
import { createCheckoutSession } from '@/app/actions/stripe';
import { getStripe } from '@/lib/stripe';
import type { CartItem } from '@/lib/types';

export default function CartPage() {
  const { user, loading } = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const cartItemsRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'cartItems')
        : null,
    [user, firestore]
  );
  const { data: cartItems, isLoading: isCartLoading } =
    useCollection<CartItem>(cartItemsRef);

  const subtotal =
    cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) ?? 0;
  const shipping = cartItems && cartItems.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  const handleRemoveItem = (itemId: string) => {
    if (!user) return;
    const itemRef = doc(firestore, 'users', user.uid, 'cartItems', itemId);
    deleteDocumentNonBlocking(itemRef);
  };

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Your cart is empty',
        description: 'Add some items before checking out.',
      });
      return;
    }

    try {
      const { sessionId } = await createCheckoutSession(cartItems);
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe.js not loaded');
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Could not proceed to checkout. Please try again.';
      console.error('Checkout error:', error);
      toast({
        variant: 'destructive',
        title: 'Checkout Failed',
        description: errorMsg,
      });
    }
  };

  const isLoading = loading || isCartLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brown-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-primary">
      {/* Header */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-beige-primary via-white to-beige-warm">
        <div className="container-luxury">
          <FadeIn>
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-black mb-4">
              Your Cart
            </h1>
            <p className="text-brown-primary text-lg">
              Review your items and proceed to checkout.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12">
        <div className="container-luxury">
          {!user || !cartItems || cartItems.length === 0 ? (
            <FadeIn className="flex flex-col items-center justify-center text-center border-2 border-dashed border-brown-primary/30 bg-white py-24">
              <div className="bg-brown-primary/10 rounded-full p-6 mb-6">
                <ShoppingBag className="h-12 w-12 text-brown-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-black mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-brown-primary mb-8 max-w-md">
                Looks like you haven&apos;t added any beautiful items yet. Explore our curated collections to find the perfect piece.
              </p>
              <Button asChild size="lg" className="bg-brown-primary text-beige-primary hover:shadow-brown font-semibold px-8">
                <Link href="/collections">
                  Explore Collections
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <FadeIn className="space-y-6">
                  {cartItems.map((item) => {
                    const image = PlaceHolderImages.find(
                      (img) => img.id === item.imageId
                    );
                    return (
                      <div key={item.id} className="flex items-center p-6 bg-white border border-brown-primary/20 hover:shadow-luxury transition-all">
                        <div className="relative h-24 w-24 overflow-hidden bg-beige-warm flex-shrink-0">
                          {image && (
                            <Link href={`/products/${item.slug}`}>
                              <Image
                                src={image.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform"
                                data-ai-hint={image.imageHint}
                              />
                            </Link>
                          )}
                        </div>
                        <div className="ml-6 flex-1">
                          <Link href={`/products/${item.slug}`} className="hover:text-brown-primary transition-colors">
                            <h3 className="font-headline text-xl font-semibold text-black">{item.title}</h3>
                          </Link>
                          <p className="text-brown-primary font-medium mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="text-brown-primary">Qty: {item.quantity}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-brown-primary hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </FadeIn>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <FadeIn delay="delay-200">
                  <div className="bg-white p-8 border border-brown-primary/20 sticky top-24">
                    <h2 className="font-headline text-2xl font-bold text-black mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between text-brown-primary">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-brown-primary">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-brown-primary/20" />
                      <div className="flex justify-between font-bold text-xl text-black">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-8 bg-brown-primary text-beige-primary hover:shadow-brown font-semibold h-14 text-lg"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <p className="text-center text-sm text-brown-primary mt-4">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
