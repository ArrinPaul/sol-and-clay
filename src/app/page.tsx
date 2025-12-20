'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections, testimonials } from '@/lib/data';
import { Star } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] w-full flex items-center bg-gradient-to-br from-beige-light via-cream to-beige-warm">
        <div className="container-luxury py-32">
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-gold-luxury font-medium tracking-wider uppercase text-sm mb-6">
                Handcrafted Excellence
              </p>
              <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-brown-darkest leading-[1.1] mb-8">
                Where Craft Meets Timeless Elegance
              </h1>
              <p className="text-xl md:text-2xl text-brown-dark leading-relaxed max-w-2xl mb-12">
                Discover handcrafted ceramics that transform everyday moments into mindful rituals. Each piece tells a story of artistry, heritage, and uncompromising quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/collections">
                  <Button size="lg" className="bg-gradient-gold text-brown-darkest hover:shadow-gold-glow font-semibold px-10 py-7 text-lg transition-all hover:scale-105">
                    Explore Collections
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-2 border-brown-darkest text-brown-darkest hover:bg-brown-darkest hover:text-cream px-10 py-7 text-lg transition-all">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold-luxury font-medium tracking-wider uppercase text-sm mb-4">
                Curated Selection
              </p>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-brown-darkest mb-6">
                Featured Collections
              </h2>
              <p className="text-xl text-brown-dark max-w-2xl mx-auto">
                Explore our signature collections, each thoughtfully curated to bring warmth and character to your home.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {collections.slice(0, 6).map((collection, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === collection.imageId
              );
              return (
                <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block card-luxury"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige-warm mb-6">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-darkest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-headline text-2xl font-semibold text-brown-darkest group-hover:text-gold-luxury transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-brown-dark leading-relaxed">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-2 text-gold-luxury font-medium group-hover:gap-3 transition-all">
                        <span>View Collection</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/collections">
              <Button size="lg" variant="outline" className="border-2 border-brown-darkest text-brown-darkest hover:bg-brown-darkest hover:text-cream px-10 py-6 text-lg">
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 md:py-32 bg-brown-darkest text-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="text-gold-luxury font-medium tracking-wider uppercase text-sm mb-6">
                  Our Philosophy
                </p>
                <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8">
                  Artistry in Every Detail
                </h2>
                <p className="text-beige-warm text-lg leading-relaxed mb-6">
                  Each piece in our collection is a testament to the marriage of ancient techniques and contemporary design. Our artisans pour decades of expertise into every curve, every glaze, creating functional art that elevates daily rituals into moments of mindfulness.
                </p>
                <p className="text-beige-warm text-lg leading-relaxed mb-8">
                  From the careful selection of clay to the final polish, every step is executed with intentionality and care. We believe in slow creation, where time becomes an ingredient in beauty.
                </p>
                <Link href="/about">
                  <Button size="lg" className="bg-gradient-gold text-brown-darkest hover:shadow-gold-glow font-semibold px-10 py-6 text-lg">
                    Learn Our Story
                  </Button>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay="delay-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-[3/4] bg-brown-dark rounded-sm overflow-hidden">
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
                  <div className="bg-gold-luxury/10 p-8 rounded-sm border border-gold-luxury/20">
                    <div className="text-4xl font-headline font-bold text-gold-luxury mb-2">15+</div>
                    <div className="text-beige-warm">Years of Craftsmanship</div>
                  </div>
                  <div className="bg-gold-luxury/10 p-8 rounded-sm border border-gold-luxury/20">
                    <div className="text-4xl font-headline font-bold text-gold-luxury mb-2">100%</div>
                    <div className="text-beige-warm">Handmade</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-beige-light">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold-luxury font-medium tracking-wider uppercase text-sm mb-4">
                Customer Stories
              </p>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-brown-darkest">
                What Our Collectors Say
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={`delay-${index * 100}`}>
                <div className="bg-white p-8 rounded-sm shadow-luxury">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold-luxury text-gold-luxury" />
                    ))}
                  </div>
                  <blockquote className="text-brown-dark text-lg leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="text-brown-darkest font-semibold">— {testimonial.author}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-brown-darkest to-brown-dark text-cream">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8">
                Let&apos;s Create Together
              </h2>
              <p className="text-beige-warm text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Are you an artisan looking to share your craft with the world? We&apos;re always seeking talented makers to collaborate with.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/collaborate">
                  <Button size="lg" className="bg-gradient-gold text-brown-darkest hover:shadow-gold-glow font-semibold px-10 py-7 text-lg">
                    Start Collaborating
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-cream text-cream hover:bg-cream hover:text-brown-darkest px-10 py-7 text-lg">
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
