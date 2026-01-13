
import Link from "next/link";
import type { FC } from "react";
import { FadeIn } from "@/components/utils/fade-in";
import { Package, Truck, Undo } from "lucide-react";

export const metadata = {
  title: 'Shipping & Returns - Sol & Clay',
  description: 'Information about our shipping policies, delivery times, and how to make a return.',
};

const ShippingPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-center font-headline text-5xl font-bold tracking-tight text-dark-brown md:text-6xl">
          Shipping & Returns
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Everything you need to know about how we get our soulful objects from our hands to yours.
        </p>
      </FadeIn>

      <div className="mx-auto mt-16 max-w-4xl space-y-12">
        <FadeIn delay="delay-200" className="flex items-start gap-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-headline text-2xl font-semibold text-dark-brown">Shipping Information</h2>
            <div className="prose prose-lg text-muted-foreground mt-4 max-w-none">
              <p>We carefully pack and ship all orders from our studio in Brooklyn, NY. We offer both domestic and international shipping options.</p>
              <ul>
                <li><strong>Domestic (USA):</strong> Standard shipping typically takes 3-7 business days. Expedited options are available at checkout.</li>
                <li><strong>International:</strong> Delivery times vary from 7-21 business days depending on your location and customs processing.</li>
              </ul>
              <p>You will receive a shipping confirmation email with tracking information as soon as your order is on its way.</p>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay="delay-400" className="flex items-start gap-6">
           <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Undo className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-headline text-2xl font-semibold text-dark-brown">Return Policy</h2>
            <div className="prose prose-lg text-muted-foreground mt-4 max-w-none">
              <p>We want you to love your Sol & Clay pieces. If you&apos;re not completely satisfied, we accept returns on most items within 30 days of delivery.</p>
              <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
                <p>Please <Link href="/contact">contact us</Link> to initiate a return. Please note that customers are responsible for return shipping costs. Sale items and custom orders are final sale and cannot be returned.</p>
            </div>
          </div>
        </FadeIn>

         <FadeIn delay="delay-600" className="flex items-start gap-6">
           <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-headline text-2xl font-semibold text-dark-brown">Packaging</h2>
            <div className="prose prose-lg text-muted-foreground mt-4 max-w-none">
                <p>We are committed to protecting both your order and our planet. Our packaging materials are 100% recyclable, and we use biodegradable fillers to ensure your items arrive safely and sustainably. We believe in conscious consumerism from start to finish.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ShippingPage;
