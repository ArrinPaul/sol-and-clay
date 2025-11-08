
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { ShoppingBag, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Shopping Cart - Sol & Clay',
  description: 'Review and checkout your selected items.',
};

// Mock data, in a real app this would come from a cart provider/state
const cartItems = [
  {
    id: 1,
    name: 'Terracotta Vase',
    price: 65.00,
    quantity: 1,
    imageId: 'product-1',
  },
  {
    id: 2,
    name: 'Hand-Glazed Mug Set',
    price: 80.00,
    quantity: 1,
    imageId: 'product-2',
  },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shipping = 10.00;
const total = subtotal + shipping;

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="font-headline text-4xl font-bold text-foreground mb-2">Your Cart</h1>
        <p className="text-muted-foreground">Review your items and proceed to checkout.</p>
      </FadeIn>

      {cartItems.length === 0 ? (
        <FadeIn delay="delay-200" className="mt-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-border rounded-lg py-24">
            <div className="bg-secondary rounded-full p-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mt-6 font-headline text-2xl font-bold">Your Cart is Empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added any beautiful items yet.</p>
            <Button asChild className="mt-6">
                <Link href="/collections">Explore Collections</Link>
            </Button>
        </FadeIn>
      ) : (
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <FadeIn className="space-y-6">
              {cartItems.map(item => {
                const image = PlaceHolderImages.find(img => img.id === item.imageId);
                return (
                  <Card key={item.id} className="flex items-center p-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <p className="text-sm">Qty: {item.quantity}</p>
                       <Button variant="ghost" size="icon" className="text-muted-foreground">
                         <X className="h-4 w-4" />
                       </Button>
                    </div>
                  </Card>
                )
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
                        <Button className="w-full" size="lg">Proceed to Checkout</Button>
                    </CardFooter>
                </Card>
            </FadeIn>
          </div>
        </div>
      )}
    </div>
  );
}
