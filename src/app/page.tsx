'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections } from '@/lib/data';
import { Parallax } from '@/components/utils/parallax';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');
  const secondaryImage = PlaceHolderImages.find((img) => img.id === 'collection-wave');

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
        <div className="mb-6 md:mb-12 overflow-hidden">
          <div className="flex gap-2 md:gap-6 pb-4" style={{ animation: 'scrollLeft 40s linear infinite' }}>
            {[...collageImages, ...collageImages].map((img, index) => {
              const sizes = ['h-40 md:h-64', 'h-48 md:h-72', 'h-40 md:h-64', 'h-56 md:h-80', 'h-40 md:h-64'];
              const sizeClass = sizes[index % 5];
              return (
                <div 
                  key={index}
                  className={`relative flex-shrink-0 w-40 md:w-72 ${sizeClass} overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500`}
                >
                  <Image
                    src={img}
                    alt={`Product ${(index % 10) + 1}`}
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
          <div className="text-center mb-6 md:mb-12 py-6">
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-dark-brown tracking-tight animate-pulse-slow">
              Checkered collection
            </h1>
          </div>
        </FadeIn>

        {/* Bottom Row - Horizontal Scrolling (Reverse Direction) with Varied Sizes */}
        <div className="overflow-hidden">
          <div className="flex gap-2 md:gap-6 pb-4" style={{ animation: 'scrollRight 40s linear infinite' }}>
            {[...collageImages.slice(5), ...collageImages.slice(0, 5), ...collageImages.slice(5)].map((img, index) => {
              const sizes = ['h-56 md:h-80', 'h-40 md:h-64', 'h-48 md:h-72', 'h-40 md:h-64', 'h-44 md:h-68'];
              const sizeClass = sizes[index % 5];
              return (
                <div 
                  key={index + 10}
                  className={`relative flex-shrink-0 w-40 md:w-72 ${sizeClass} overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500`}
                >
                  <Image
                    src={img}
                    alt={`Product ${(index % 10) + 1}`}
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



      {/* Process Section */}
      <section className="py-8 md:py-12 bg-dark-brown text-brand-beige">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <FadeIn>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <Parallax speed={-0.1}>
                  <div className="aspect-[3/4] bg-accent-beige rounded-sm overflow-hidden">
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
                </Parallax>
                <Parallax speed={0.1}>
                  <div className="aspect-[3/4] bg-accent-beige rounded-sm overflow-hidden mt-8">
                    {secondaryImage && (
                      <Image
                        src={secondaryImage.imageUrl}
                        alt="Studio environment"
                        width={400}
                        height={533}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </Parallax>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-beige leading-[1.1] mb-6 md:mb-8">
                  Classic ceramics, made with potters across India
                </h1>
                <p className="text-lg text-accent-beige leading-normal md:leading-relaxed mb-4 md:mb-6">
                  We work with independent ceramic studios across India to create functional pieces for everyday use. Each collection begins with a concept and comes alive through the hands of skilled makers.
                </p>
                <Link href="/collections" className="inline-flex items-center gap-2 text-dark-brown bg-brand-beige hover:bg-brand-beige/90 transition-colors font-medium text-lg px-6 py-3 rounded-lg border-2 border-dark-brown w-full sm:w-auto justify-center sm:justify-start">
                  Explore the collection
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <div className="mt-8 md:mt-12">
                  
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 md:py-20 bg-brand-beige">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-dark-brown mb-4 md:mb-6">
                Our Collection
              </h2>
              <p className="text-lg md:text-xl text-brand-brown max-w-2xl mx-auto">
                Where timeless patterns meet modern craftsmanship.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
            {collections.map((collection, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === collection.imageId
              );
              return (
                <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block bg-accent-beige rounded-lg overflow-hidden shadow-md hover:shadow-luxury transition-all duration-300"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-accent-beige">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-headline text-2xl font-semibold text-brand-beige text-center">
                          {collection.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-8 md:py-12 bg-dark-brown text-brand-beige">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
                  Our approach
                </h2>
                <p className="text-accent-beige text-lg leading-normal md:leading-relaxed mb-4 md:mb-6">
                  Sol & Clay brings together design direction and independent ceramic studios.
                </p>
                <p className="text-accent-beige text-lg leading-normal md:leading-relaxed mb-6 md:mb-8">
                  We focus on thoughtful concepts, functional use, and strong storytelling, while the making stays with the people who do it best.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-brand-beige bg-dark-brown hover:bg-dark-brown/90 transition-colors font-medium text-lg px-6 py-3 rounded-lg border-2 border-brand-beige">
                  Read more about us →
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <Parallax speed={-0.1}>
                  <div className="space-y-6">
                    <div className="aspect-[3/4] bg-brand-brown rounded-sm overflow-hidden">
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
                </Parallax>
                <Parallax speed={0.1}>
                    <div className="space-y-6 pt-12">
                    <div className="bg-brand-brown/10 p-8 rounded-sm border border-brand-brown/20">
                      <div className="text-4xl font-headline font-bold text-white mb-2 md:mb-2">Trusted By </div>
                      <div className="text-white">Many</div>
                    </div>
                    <div className="bg-brand-brown/10 p-8 rounded-sm border border-brand-brown/20">
                      <div className="text-4xl font-headline font-bold text-white mb-2 md:mb-2">100%</div>
                      <div className="text-white">Handmade</div>
                    </div>
                    </div>
                </Parallax>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand-beige to-accent-beige text-dark-brown">
        <div className="container-luxury px-6 sm:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                Let&apos;s Create Together
              </h2>
              <p className="text-brand-brown text-base sm:text-lg md:text-xl mb-6 md:mb-10 md:mb-12 leading-normal md:leading-relaxed">
                Are you an artisan looking to share your craft with the world? We&apos;re always seeking talented makers to collaborate with.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 justify-center items-center">
                <Link href="/collaborate" className="w-full sm:w-auto inline-flex items-center gap-2 text-brand-beige bg-dark-brown hover:bg-dark-brown/90 transition-colors font-medium text-lg px-6 py-3 rounded-lg border-2 border-brand-beige justify-center">
                  Collaborate with us
                </Link>
                <Link href="/contact" className="w-full sm:w-auto inline-flex items-center gap-2 text-brand-beige bg-dark-brown hover:bg-dark-brown/90 transition-colors font-medium text-lg px-6 py-3 rounded-lg border-2 border-brand-beige justify-center">
                  Get In Touch
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
