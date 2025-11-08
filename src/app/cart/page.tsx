'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { ShoppingBag, X, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  deleteDocumentNonBlocking,
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';

export default function CartPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const cartItemsRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'cartItems')
        : null,
    [user, firestore]
  );
  const { data: cartItems, isLoading: isCartLoading } =
    useCollection(cartItemsRef);

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

  const isLoading = isUserLoading || isCartLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="font-headline text-4xl font-bold text-foreground mb-2">
          Your Cart
        </h1>
        <p className="text-muted-foreground">
          Review your items and proceed to checkout.
        </p>
      </FadeIn>

      {!user || !cartItems || cartItems.length === 0 ? (
        <FadeIn
          delay="delay-200"
          className="mt-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-border rounded-lg py-24"
        >
          <div className="bg-secondary rounded-full p-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="mt-6 font-headline text-2xl font-bold">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven&apos;t added any beautiful items yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/collections">Explore Collections</Link>
          </Button>
        </FadeIn>
      ) : (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <FadeIn className="space-y-6">
              {cartItems.map((item) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === item.imageId
                );
                return (
                  <Card key={item.id} className="flex items-center p-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      {image && (
                        <Link href={`/products/${item.slug}`}>
                          <Image
                            src={image.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </Link>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm">Qty: {item.quantity}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </FadeIn>
          </div>

          <div className="lg:col-span-1">
            <FadeIn delay="delay-200">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>
        </div>
      )}
    </div>
  );
}
