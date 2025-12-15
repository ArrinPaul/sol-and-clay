
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Users } from 'lucide-react';
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
import { Star } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');
  const collectionsPlugin = useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const testimonialsPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover brightness-90"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <FadeIn direction="down">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm">
              <span className="text-sm font-semibold tracking-wide text-primary">
                Handcrafted with Care
              </span>
            </div>
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm">
              Functional décor with soul.
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Handcrafted pieces designed to bring warmth and beauty into your
              home. Every item tells a story of artisan craftsmanship.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay="delay-400">
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                <Link href="/collections">
                  Explore Collections <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 backdrop-blur-sm bg-background/50 hover:bg-background/70">
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Snippet Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">Our Philosophy</span>
              <p className="font-headline text-3xl leading-relaxed text-foreground md:text-4xl lg:text-5xl">
                Every piece tells a story — <br className="hidden md:block" />
                <span className="text-primary">shaped by hands</span>, inspired by earth.
              </p>
              <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Sustainable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Handcrafted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Timeless</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Collections Carousel */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">Discover</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                Featured Collections
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collections, each thoughtfully designed to bring character to your space
              </p>
            </div>
          </FadeIn>
          <FadeIn className="mt-12">
            <Carousel
              plugins={[collectionsPlugin.current]}
              opts={{
                align: 'start',
                loop: true,
              }}
              onMouseEnter={collectionsPlugin.current.stop}
              onMouseLeave={collectionsPlugin.current.reset}
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
                          <Card className="overflow-hidden border-2 transition-all duration-500 group-hover:border-primary group-hover:shadow-2xl group-hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
                            <div className="relative h-96 w-full overflow-hidden">
                              {image && (
                                <>
                                  <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    data-ai-hint={image.imageHint}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </>
                              )}
                            </div>
                            <CardHeader className="pb-3">
                              <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                                {collection.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground line-clamp-2">
                                {collection.description}
                              </p>
                              <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View Collection <ArrowRight className="ml-2 h-4 w-4" />
                              </div>
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
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">Our Values</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                Why Handmade Matters
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FadeIn delay="delay-0">
              <Card className="h-full border-2 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary mb-2">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">
                    Sustainability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Crafted in small batches to minimize waste and honor our
                    materials. Every piece is made with environmental consciousness.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-200">
              <Card className="h-full border-2 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary mb-2">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">
                    Local Craftsmanship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Supporting local artisans and preserving traditional craft
                    techniques that have been passed down through generations.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-400">
              <Card className="h-full border-2 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary mb-2">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">
                    Natural Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Using responsibly sourced clay and non-toxic glazes for
                    pieces that are safe, beautiful, and built to last.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-background to-accent/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">Testimonials</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Read about the experiences of those who have welcomed our pieces into their homes
              </p>
            </div>
          </FadeIn>
          <FadeIn className="mt-12">
            <Carousel
              plugins={[testimonialsPlugin.current]}
              opts={{
                align: 'start',
                loop: true,
              }}
              onMouseEnter={testimonialsPlugin.current.stop}
              onMouseLeave={testimonialsPlugin.current.reset}
              className="mx-auto w-full max-w-sm md:max-w-2xl lg:max-w-4xl"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-4">
                      <Card className="h-full border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                        <CardContent className="flex h-full flex-col justify-center p-8 text-center">
                          <div className="flex justify-center text-amber-500 mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-current" />
                            ))}
                          </div>
                          <p className="mt-4 flex-grow text-muted-foreground text-base leading-relaxed italic">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                          <footer className="mt-6 font-semibold text-foreground border-t border-border/50 pt-4">
                            {testimonial.author}
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
      <section className="relative bg-gradient-to-r from-primary via-primary/90 to-accent py-20 text-primary-foreground md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="font-headline text-3xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Bring warmth home —<br className="hidden sm:block" /> Explore our latest pieces.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Discover timeless pieces that transform your space into a sanctuary of beauty and comfort
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <Link href="/collections">Shop All Collections</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all">
                <Link href="/collaborate">Collaborate With Us</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
