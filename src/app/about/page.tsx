import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { Sparkles, Users, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Our Story - Sol & Clay',
  description:
    'Sol & Clay builds collections around strong visual ideas. Each piece is handcrafted and carries a story of design and touch.',
};

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'about-hero');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-beige-primary via-white to-beige-warm">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-brown-primary font-medium tracking-wider uppercase text-sm mb-6">
                Our Story
              </p>
              <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-tight mb-8">
                Where Artistry Meets Purpose
              </h1>
              <p className="text-xl md:text-2xl text-brown-primary leading-relaxed max-w-3xl">
                Sol & Clay is a boutique studio specializing in artisanal home décor. We bridge the gap between master makers and design-conscious homes, offering curated collections that celebrate craft, material, and meaningful design.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-brown-primary font-medium tracking-wider uppercase text-sm mb-4">
                Our Philosophy
              </p>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-black mb-6">
                The Values We Live By
              </h2>
              <p className="text-xl text-brown-primary max-w-2xl mx-auto">
                We value craft, collaboration, and character over mass production. Every item is made with intention and care.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn>
              <div className="p-10 bg-beige-primary border border-brown-primary/20 hover:shadow-luxury transition-all duration-300 group">
                <div className="w-16 h-16 flex items-center justify-center bg-brown-primary text-beige-primary mb-8 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-2xl font-semibold text-black mb-4">
                  Exceptional Craft
                </h3>
                <p className="text-brown-primary leading-relaxed">
                  We partner with independent makers who pour their heart and skill into every piece, ensuring exceptional quality and uniqueness in each creation.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay="delay-200">
              <div className="p-10 bg-beige-primary border border-brown-primary/20 hover:shadow-luxury transition-all duration-300 group">
                <div className="w-16 h-16 flex items-center justify-center bg-brown-primary text-beige-primary mb-8 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-2xl font-semibold text-black mb-4">
                  True Collaboration
                </h3>
                <p className="text-brown-primary leading-relaxed">
                  We are a platform for artisans to thrive, fostering a community that values creativity and shared storytelling through design.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay="delay-400">
              <div className="p-10 bg-beige-primary border border-brown-primary/20 hover:shadow-luxury transition-all duration-300 group">
                <div className="w-16 h-16 flex items-center justify-center bg-brown-primary text-beige-primary mb-8 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-2xl font-semibold text-black mb-4">
                  Enduring Character
                </h3>
                <p className="text-brown-primary leading-relaxed">
                  We curate objects that are not only beautiful but also meaningful, designed to bring warmth and soul into your everyday life.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 bg-black text-beige-primary">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="text-brown-primary font-medium tracking-wider uppercase text-sm mb-6">
                  The Beginning
                </p>
                <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8">
                  Born from a Love for Earth & Fire
                </h2>
                <p className="text-beige-warm text-lg leading-relaxed mb-6">
                  Sol & Clay was born from a love for earthy materials and a vision for soulful, modern homes. It all started with sketches of handcrafted objects and a desire to give artisans a platform to share their craft.
                </p>
                <p className="text-beige-warm text-lg leading-relaxed mb-8">
                  We sought out our first maker partners—artisans who shared our passion for quality and design. These initial collaborations helped shape our first collection and defined the collaborative spirit of Sol & Clay.
                </p>
                <Link href="/collaborate">
                  <Button size="lg" className="bg-brown-primary text-beige-primary hover:shadow-brown font-semibold px-8 py-6">
                    Join Our Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay="delay-200">
              <div className="relative">
                <div className="aspect-[4/5] bg-brown-primary overflow-hidden">
                  {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt="Artisan at work"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="absolute -bottom-8 -left-8 bg-brown-primary/10 border border-brown-primary/30 p-8 backdrop-blur-sm">
                  <div className="text-5xl font-headline font-bold text-brown-primary mb-2">15+</div>
                  <div className="text-beige-warm">Years of Craftsmanship</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-beige-primary">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-brown-primary font-medium tracking-wider uppercase text-sm mb-4">
                The Process
              </p>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-black mb-6">
                From Earth to Home
              </h2>
              <p className="text-xl text-brown-primary max-w-3xl mx-auto">
                From sketch to kiln, we work with artisans who transform ideas into timeless décor. Our process is a dialogue between design and material.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { step: '1', label: 'Clay' },
              { step: '2', label: 'Shape' },
              { step: '3', label: 'Glaze' },
              { step: '4', label: 'Fire' },
              { step: '♥', label: 'Home', isLast: true },
            ].map((item, index) => (
              <FadeIn key={item.label} delay={`delay-${index * 100}`}>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 flex items-center justify-center font-bold text-2xl shadow-luxury ${item.isLast ? 'bg-brown-primary text-beige-primary' : 'bg-black text-beige-primary'}`}>
                      {item.step}
                    </div>
                    <p className="mt-4 font-headline text-xl font-semibold text-black">{item.label}</p>
                  </div>
                  {!item.isLast && (
                    <div className="text-3xl text-brown-primary hidden md:block">→</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-black to-brown-primary text-beige-primary">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8">
                Ready to Explore?
              </h2>
              <p className="text-beige-warm text-xl mb-12 leading-relaxed">
                Discover our curated collections of handcrafted ceramics and find the perfect piece for your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/collections">
                  <Button size="lg" className="bg-brown-primary text-beige-primary hover:shadow-brown font-semibold px-10 py-7 text-lg">
                    Browse Collections
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-beige-primary text-beige-primary hover:bg-beige-primary hover:text-black px-10 py-7 text-lg">
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
