'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { ShoppingBag, X, Loader2, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { createCheckoutSession } from '@/app/actions/stripe';
import { getStripe } from '@/lib/stripe';
import { useToast } from '@/hooks/use-toast';
import type { CartItem } from '@/lib/types';

export default function CartPage() {
  const { cartItems, loading, removeFromCart } = useCart();
  const { toast } = useToast();

  const subtotal =
    cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) ?? 0;
  const shipping = cartItems && cartItems.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brand-brown" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-brand-beige via-white to-accent-beige">
        <div className="container-luxury">
          <FadeIn>
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-dark-brown mb-4">
              Your Cart
            </h1>
            <p className="text-brand-brown text-lg">
              Review your items and proceed to checkout.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12">
        <div className="container-luxury">
          {!cartItems || cartItems.length === 0 ? (
            <FadeIn className="flex flex-col items-center justify-center text-center border-2 border-dashed border-brand-brown/30 bg-white py-16">
              <div className="bg-brand-brown/10 rounded-full p-6 mb-6">
                <ShoppingBag className="h-12 w-12 text-brand-brown" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-dark-brown mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-brand-brown mb-8 max-w-md">
                Looks like you haven&apos;t added any beautiful items yet. Explore our curated collections to find the perfect piece.
              </p>
              <Button asChild size="lg" className="bg-brand-brown text-brand-beige hover:shadow-brown font-semibold px-8">
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
                      <div
                        key={item.productId}
                        className="flex items-center p-6 bg-white border border-brand-brown/20 hover:shadow-luxury transition-all"
                        tabIndex={0}
                        role="group"
                        aria-label={`Cart item: ${item.title}`}
                      >
                        <div className="relative h-24 w-24 overflow-hidden bg-accent-beige flex-shrink-0">
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
                          <Link href={`/products/${item.slug}`} className="hover:text-brand-brown transition-colors">
                            <h3 className="font-headline text-xl font-semibold text-dark-brown">{item.title}</h3>
                          </Link>
                          <p className="text-brand-brown font-medium mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="text-brand-brown">Qty: {item.quantity}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-brand-brown hover:text-dark-brown hover:bg-brand-beige"
                            onClick={() => removeFromCart(item.productId)}
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
                  <div className="bg-white p-8 border border-brand-brown/20 sticky top-24">
                    <h2 className="font-headline text-2xl font-bold text-dark-brown mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between text-brand-brown">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-brand-brown">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-brand-brown/20" />
                      <div className="flex justify-between font-bold text-xl text-dark-brown">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-8 bg-brand-brown text-brand-beige hover:shadow-brown font-semibold h-14 text-lg"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <p className="text-center text-sm text-brand-brown mt-4">
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
