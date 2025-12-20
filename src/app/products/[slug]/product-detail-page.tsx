
'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getRelatedProducts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Zap, Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  useFirestore,
  useToast,
  useMemoFirebase,
} from '@/firebase';
import { useAuth } from '@/firebase/hooks/use-auth';
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import type { Product, CartItem } from '@/lib/types';
import { createCheckoutSession } from '@/app/actions/stripe';
import { getStripe } from '@/lib/stripe';
import { WithId } from '@/firebase';

type Props = {
  product: Product;
};

const ProductDetailPageClient: FC<Props> = ({ product }) => {
  const { user } = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const cartRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'cartItems')
        : null,
    [user, firestore]
  );

  const handleAddToCart = async () => {
    if (!user || !cartRef) {
      // Store current page URL to redirect back after login
      const currentUrl = window.location.pathname;
      router.push(`/login?redirect_url=${encodeURIComponent(currentUrl)}`);
      return;
    }

    setIsAdding(true);

    const q = query(cartRef, where('productId', '==', product.id));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add new item
        const batch = writeBatch(firestore);
        const newDocRef = doc(cartRef);
        batch.set(newDocRef, {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          imageId: product.images[0],
          slug: product.slug,
        });
        await batch.commit();
      } else {
        // Item exists, so we don't add it again.
        // A real app might update quantity here.
      }

      toast({
        title: 'Added to Cart',
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not add item to cart. Please try again.',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      // Store current page URL to redirect back after login
      const currentUrl = window.location.pathname;
      router.push(`/login?redirect_url=${encodeURIComponent(currentUrl)}`);
      return;
    }

    setIsBuying(true);

    const item: WithId<CartItem> = {
      id: product.id,
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageId: product.images[0],
      slug: product.slug,
    };

    try {
      const { sessionId } = await createCheckoutSession([item]);
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
    } finally {
      setIsBuying(false);
    }
  };

  const relatedProducts = getRelatedProducts(product.id);

  const renderAvailability = () => {
    if (product.stock > 10) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      );
    }
    if (product.stock > 0) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Low Stock
        </Badge>
      );
    }
    return <Badge variant="destructive">Out of Stock</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Image Gallery */}
        <FadeIn>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((imageId, index) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === imageId
                );
                return (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={`${product.title} - view ${index + 1}`}
                          fill
                          className="rounded-lg object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </FadeIn>

        {/* Product Details */}
        <FadeIn direction="left" delay="delay-200">
          <div className="flex flex-col">
            <h1 className="font-headline text-4xl font-bold text-foreground">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.rating.toFixed(1)})
              </span>
              {renderAvailability()}
            </div>
            <p className="mt-4 font-headline text-3xl text-foreground">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose prose-lg mt-6 text-muted-foreground">
              <p>{product.story}</p>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold text-foreground">
                Materials & Dimensions
              </h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
                <li>{product.materials}</li>
                <li>{product.dimensions}</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isAdding || product.stock === 0}
              >
                {isAdding ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ShoppingCart className="mr-2" />
                )}
                {isAdding
                  ? 'Adding...'
                  : product.stock === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1"
                disabled={isBuying || product.stock === 0}
                onClick={handleBuyNow}
              >
                {isBuying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2" />
                )}
                {isBuying ? 'Processing...' : 'Buy Now'}
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Want to personalize this piece?{' '}
              <Link href="/contact" className="underline">
                Contact us for a custom order
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Related Products */}
      <div className="my-16 md:my-24">
        <FadeIn>
          <h2 className="text-center font-headline text-4xl font-bold text-foreground mb-12">
            Related Products
          </h2>
        </FadeIn>
        <FadeIn>
          <Carousel
            opts={{ align: 'start', loop: false }}
            className="mx-auto w-full max-w-sm md:max-w-3xl lg:max-w-5xl"
          >
            <CarouselContent>
              {relatedProducts.map((relatedProduct) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === relatedProduct.images[0]
                );
                return (
                  <CarouselItem
                    key={relatedProduct.id}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <Link
                      href={`/products/${relatedProduct.slug}`}
                      className="group block p-1"
                    >
                      <Card className="overflow-hidden">
                        <div className="relative aspect-square w-full">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={relatedProduct.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                          )}
                        </div>
                        <CardContent className="p-3">
                          <h3 className="truncate font-headline text-lg font-semibold">
                            {relatedProduct.title}
                          </h3>
                          <p className="text-muted-foreground">
                            ${relatedProduct.price.toFixed(2)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden sm:flex" />
            <CarouselNext className="-right-4 hidden sm:flex" />
          </Carousel>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProductDetailPageClient;
