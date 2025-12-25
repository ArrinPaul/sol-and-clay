'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');

  // All 10 product images for collage
  const collageImages = [
    '/images/28b07e9c9a08ab7f0323ded71fb0ff10.jpg',
    '/images/28be913f8ed6858237e8f63c27a76cc5.jpg',
    '/images/46656ca3dce3c405dbf6c115edcbfd27.jpg',
    '/images/472e4913fb497e74e5c54e30df76aef0.jpg',
    '/images/5aef65772d79235ad0abc7f3eaa548f7.jpg',
    '/images/6f32cb02c9e8fc994cf3357915272b24.jpg',
    '/images/d537eee6b7d672fd3121a3ffd813fd1b.jpg',
    '/images/e9e3819959e15ab391044bf4b51b9b19.jpg',
    '/images/efd405d37f3b49d1a1c91273aed85736.jpg',
    '/images/f26bed75b258ee68fd86a2fa349e5350.jpg',
  ];

  return (
    <div className="flex flex-col">
      {/* Animated Image Collage Section with Horizontal Scroll and Varied Sizes */}
      <section className="relative w-full bg-white py-8 md:py-16">
        {/* Top Row - Horizontal Scrolling with Varied Sizes */}
        <div className="mb-8 md:mb-12 overflow-hidden">
          <div className="flex gap-3 md:gap-6 pb-4" style={{ animation: 'scrollLeft 20s linear infinite' }}>
            {[...collageImages.slice(0, 5), ...collageImages.slice(0, 5), ...collageImages.slice(0, 5)].map((img, index) => {
              const sizes = ['h-40 md:h-64', 'h-48 md:h-72', 'h-40 md:h-64', 'h-56 md:h-80', 'h-40 md:h-64'];
              const sizeClass = sizes[index % 5];
              return (
                <div 
                  key={index}
                  className={`relative flex-shrink-0 w-40 md:w-72 ${sizeClass} overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500`}
                >
                  <Image
                    src={img}
                    alt={`Product ${(index % 5) + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 160px, 288px"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Logo with Pulsing Animation */}
        <FadeIn delay="delay-500">
          <div className="text-center mb-8 md:mb-12 py-6">
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight animate-pulse-slow">
              Sol & Clay
            </h1>
          </div>
        </FadeIn>

        {/* Bottom Row - Horizontal Scrolling (Reverse Direction) with Varied Sizes */}
        <div className="overflow-hidden">
          <div className="flex gap-3 md:gap-6 pb-4" style={{ animation: 'scrollRight 20s linear infinite' }}>
            {[...collageImages.slice(5, 10), ...collageImages.slice(5, 10), ...collageImages.slice(5, 10)].map((img, index) => {
              const sizes = ['h-56 md:h-80', 'h-40 md:h-64', 'h-48 md:h-72', 'h-40 md:h-64', 'h-44 md:h-68'];
              const sizeClass = sizes[index % 5];
              return (
                <div 
                  key={index + 5}
                  className={`relative flex-shrink-0 w-40 md:w-72 ${sizeClass} overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500`}
                >
                  <Image
                    src={img}
                    alt={`Product ${(index % 5) + 6}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 160px, 288px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] w-full flex items-center bg-gradient-to-br from-beige-light via-beige-primary to-beige-warm">
        <div className="container-luxury py-32">
          <FadeIn>
            <div className="max-w-4xl">
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-8">
                Classic ceramics, made with potters across India
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/collections">
                  <Button size="lg" className="bg-brown-primary text-beige-primary hover:shadow-brown font-semibold px-10 py-7 text-lg transition-all hover:scale-105">
                    Explore the collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] bg-beige-warm rounded-sm overflow-hidden">
                  {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt="Ceramic making process"
                      width={400}
                      height={533}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="aspect-[3/4] bg-beige-warm rounded-sm overflow-hidden mt-8">
                  {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt="Studio environment"
                      width={400}
                      height={533}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-black mb-6">
                  Classic ceramic pieces, made slowly
                </h2>
                <p className="text-lg text-brown-primary leading-relaxed mb-6">
                  We work with independent ceramic studios across India to create functional pieces for everyday use.
                </p>
                <p className="text-lg text-brown-primary leading-relaxed">
                  Each collection begins with a concept and comes alive through the hands of skilled makers.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 md:py-32 bg-beige-warm">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-black mb-6">
                Our First Collection
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 lg:gap-12 max-w-2xl mx-auto">
            {collections.slice(0, 1).map((collection, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === collection.imageId
              );
              return (
                <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block bg-beige-light rounded-lg overflow-hidden shadow-md hover:shadow-luxury transition-all duration-300"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige-warm">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          data-ai-hint={image.imageHint}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="space-y-3 p-6 bg-beige-light">
                      <h3 className="font-headline text-2xl font-semibold text-black group-hover:text-brown-primary transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-brown-primary leading-relaxed">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-2 text-brown-primary font-medium group-hover:gap-3 transition-all">
                        <span>View Collection</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-brown-primary text-lg">
              More collections coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 md:py-32 bg-brown-dark text-beige-primary">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8">
                  Our approach
                </h2>
                <p className="text-beige-warm text-lg leading-relaxed mb-6">
                  Sol & Clay brings together design direction and independent ceramic studios.
                </p>
                <p className="text-beige-warm text-lg leading-relaxed mb-8">
                  We focus on thoughtful concepts, functional use, and strong storytelling, while the making stays with the people who do it best.
                </p>
                <Link href="/about">
                  <Button size="lg" className="bg-brown-primary text-beige-primary hover:shadow-brown font-semibold px-10 py-6 text-lg">
                    Read more about us →
                  </Button>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-[3/4] bg-brown-primary rounded-sm overflow-hidden">
                    {heroImage && (
                      <Image
                        src={heroImage.imageUrl}
                        alt="Artisan at work"
                        width={400}
                        height={533}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="bg-brown-primary/10 p-8 rounded-sm border border-brown-primary/20">
                    <div className="text-4xl font-headline font-bold text-brown-primary mb-2">15+</div>
                    <div className="text-beige-warm">Years of Craftsmanship</div>
                  </div>
                  <div className="bg-brown-primary/10 p-8 rounded-sm border border-brown-primary/20">
                    <div className="text-4xl font-headline font-bold text-brown-primary mb-2">100%</div>
                    <div className="text-beige-warm">Handmade</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-brown-dark to-brown-primary text-beige-primary">
        <div className="container-luxury px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                Let&apos;s Create Together
              </h2>
              <p className="text-beige-warm text-base sm:text-lg md:text-xl mb-10 md:mb-12 leading-relaxed">
                Are you an artisan looking to share your craft with the world? We&apos;re always seeking talented makers to collaborate with.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link href="/collaborate" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-brown-primary text-beige-primary hover:shadow-brown font-semibold px-8 sm:px-10 py-6 md:py-7 text-base md:text-lg">
                    Collaborate with us
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-beige-light text-brown-primary hover:bg-beige-primary font-semibold px-8 sm:px-10 py-6 md:py-7 text-base md:text-lg transition-all">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
