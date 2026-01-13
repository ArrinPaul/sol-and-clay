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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-brand-beige via-white to-accent-beige">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-brand-brown font-medium tracking-widest uppercase text-sm mb-6 md:mb-8 letter-spacing-2">
                Collection
              </p>
              <h1 className="font-headline text-6xl md:text-7xl lg:text-7xl font-bold text-dark-brown mb-8 leading-tight">
                {collection.title}
              </h1>
              <p className="text-lg md:text-xl text-brand-brown max-w-2xl mx-auto leading-relaxed mb-2">
                {collection.description}
              </p>
              <div className="h-1 w-24 bg-brand-brown mx-auto mt-8"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About this collection */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-luxury">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mb-6">
                About This Collection
              </h2>
              <p className="text-lg text-brand-brown mb-4 leading-relaxed">{collection.story}</p>
              <p className="text-base text-brand-brown leading-relaxed">
                <strong>Materials:</strong> {collection.materials}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20 bg-accent-beige">
        <div className="container-luxury">
          <FadeIn>
            <h2 className="text-center font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mb-12">
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
                    <Card className="overflow-hidden border border-brand-brown/20 hover:shadow-luxury transition-all h-full flex flex-col">
                      <div className="relative aspect-square w-full bg-accent-beige">
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
                      <CardContent className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-headline text-xl font-semibold text-dark-brown">
                            {product.title}
                          </h3>
                          <p className="text-brand-brown font-medium mt-2">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          className="mt-4 w-full bg-brand-brown text-brand-beige hover:shadow-brown font-semibold"
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
