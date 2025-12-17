
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
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden">
        <div className="container mx-auto px-6 py-32">
          <FadeIn>
            <div className="max-w-5xl">
              <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-foreground leading-tight mb-8">
                Artisanal Home Décor
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Curated collection of handcrafted pieces from skilled artisans. Each item tells a story of craft, creativity, and timeless design.
              </p>
              <div className="mt-12">
                <Link href="/collections">
                  <Button size="lg" className="text-base px-8 py-6 rounded-none">
                    Explore Collections
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>



      {/* Featured Collections Grid */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-12">
              <div className="flex items-end justify-between">
                <h2 className="font-headline text-4xl md:text-5xl font-normal text-foreground">
                  Featured Collections
                </h2>
                <Link 
                  href="/collections" 
                  className="hidden md:flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {collections.slice(0, 4).map((collection, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === collection.imageId
              );
              return (
                <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted mb-4">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint={image.imageHint}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        View Collection
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-foreground hover:text-primary transition-colors"
            >
              <span>All Collections</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-normal text-foreground">
                What We Offer
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <FadeIn delay="delay-0">
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  Curated Collections
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thoughtfully selected pieces from skilled artisans. Each collection tells a unique story.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  Custom Orders
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work directly with makers to create bespoke pieces tailored to your vision.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay="delay-400">
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  Artisan Partnerships
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Collaborate with us to showcase your handcrafted work worldwide.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-headline text-4xl md:text-5xl font-normal mb-6">
                Let's Work Together
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
                Have a project in mind or interested in collaborating? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-base px-8 py-6 rounded-none">
                    Get In Touch
                  </Button>
                </Link>
                <Link 
                  href="mailto:hello@solandclay.com"
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                >
                  hello@solandclay.com
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
