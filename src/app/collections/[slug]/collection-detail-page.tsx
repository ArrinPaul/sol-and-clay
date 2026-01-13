'use client';
import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collection, Product } from '@/lib/types';

type Props = {
  collection: Collection;
  products: Product[];
};

const CollectionDetailPage: FC<Props> = ({ collection, products }) => {
  const collectionImage = PlaceHolderImages.find(
    (img) => img.id === collection.imageId
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-secondary/30">
        {collectionImage && (
          <Image
            src={collectionImage.imageUrl}
            alt={collectionImage.description}
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={collectionImage.imageHint}
          />
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <FadeIn direction="down">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-dark-brown sm:text-6xl">
              {collection.title}
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              {collection.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About this collection */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold">
                About This Collection
              </h2>
              <p className="mt-4 text-muted-foreground">{collection.story}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Materials:</strong> {collection.materials}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-dark-brown mb-12">
              Shop This Collection
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === product.images[0]
              );
              return (
                <FadeIn key={product.id} delay={`delay-${(index + 1) * 100}`}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    <Card className="overflow-hidden border-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-xl h-full flex flex-col">
                      <div className="relative aspect-square w-full">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-headline text-xl font-semibold">
                            {product.title}
                          </h3>
                          <p className="text-muted-foreground mt-1">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4 w-full transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default CollectionDetailPage;
