
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  products as allProducts,
  collections,
  getRelatedProducts,
} from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Zap } from 'lucide-react';
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

type Props = {
  params: { slug: string };
};

// Metadata generation can't be done in a client component, but can be exported
// export async function generateMetadata({ params }: Props) {
//   const product = allProducts.find((p) => p.slug === params.slug);

//   if (!product) {
//     return {
//       title: 'Product Not Found',
//     };
//   }

//   return {
//     title: `${product.title} - Sol & Clay`,
//     description: product.story,
//   };
// }

export default function ProductDetailPage({ params }: Props) {
  const product = allProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

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
                const image = PlaceHolderImages.find((img) => img.id === imageId);
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
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                <Zap className="mr-2" /> Buy Now
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
}

// export async function generateStaticParams() {
//   return allProducts.map((product) => ({
//     slug: product.slug,
//   }));
// }

    