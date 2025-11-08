
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Users, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { collections, testimonials } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <FadeIn direction="down">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Functional décor with soul.
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Handcrafted pieces designed to bring warmth and beauty into your
              home.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay="delay-400">
            <Button asChild size="lg" className="mt-8">
              <Link href="/collections">
                Explore Our Collections <ArrowRight />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* About Snippet Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <p className="mx-auto max-w-3xl text-center font-headline text-2xl text-foreground md:text-3xl">
              Every piece tells a story — shaped by hands, inspired by earth.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Collections Carousel */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Featured Collections
            </h2>
          </FadeIn>
          <FadeIn className="mt-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="mx-auto w-full max-w-sm md:max-w-3xl lg:max-w-5xl"
            >
              <CarouselContent>
                {collections.map((collection, index) => {
                  const image = PlaceHolderImages.find(
                    (img) => img.id === collection.imageId
                  );
                  return (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <Link
                          href={`/collections/${collection.slug}`}
                          className="group block"
                        >
                          <Card className="overflow-hidden border-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-xl">
                            <div className="relative h-96 w-full">
                              {image && (
                                <Image
                                  src={image.imageUrl}
                                  alt={image.description}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  data-ai-hint={image.imageHint}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              )}
                            </div>
                            <CardHeader>
                              <CardTitle className="font-headline text-2xl">
                                {collection.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">
                                {collection.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </FadeIn>
        </div>
      </section>

      {/* Why Handmade Matters Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Why Handmade Matters
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FadeIn delay="delay-0">
              <Card className="h-full border-0 bg-transparent text-center shadow-none">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Leaf />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">
                    Sustainability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Crafted in small batches to minimize waste and honor our
                    materials.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-200">
              <Card className="h-full border-0 bg-transparent text-center shadow-none">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Users />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">
                    Local Craftsmanship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Supporting local artisans and preserving traditional craft
                    techniques.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-400">
              <Card className="h-full border-0 bg-transparent text-center shadow-none">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Leaf />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">
                    Natural Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Using responsibly sourced clay and non-toxic glazes for
                    pieces that are safe and beautiful.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
          </FadeIn>
          <FadeIn className="mt-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="mx-auto w-full max-w-sm md:max-w-2xl lg:max-w-4xl"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-4">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col justify-center p-6 text-center">
                          <div className="flex justify-center text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-current" />
                            ))}
                          </div>
                          <p className="mt-4 flex-grow text-muted-foreground">
                            "{testimonial.quote}"
                          </p>
                          <footer className="mt-4 font-semibold">
                            - {testimonial.author}
                          </footer>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </FadeIn>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Bring warmth home — Explore our latest pieces.
            </h2>
            <Button asChild size="lg" variant="secondary" className="mt-6">
              <Link href="/collections">Shop All Collections</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
