
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { Sparkles, Users, Target } from 'lucide-react';

export const metadata = {
  title: 'About Sol & Clay',
  description: 'Learn about our mission to bring soulful, handcrafted objects into modern homes and the values that guide us.',
};

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'about-hero');

  return (
    <div>
      <section className="relative h-[60vh] min-h-[400px] w-full bg-secondary/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <FadeIn direction="down">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Objects with Soul
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              We are Sol & Clay, a curated space where modern design meets the timeless beauty of handcrafted objects. We believe the items in our homes should be more than just functional—they should tell a story, evoke a feeling, and connect us to the artisans who made them.
            </p>
          </FadeIn>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Our Philosophy
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
              Our philosophy is rooted in three core principles that guide everything we do, from sourcing to curation.
            </p>
          </FadeIn>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <FadeIn className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-semibold">Artisanal Quality</h3>
              <p className="mt-2 text-muted-foreground">We partner with independent makers who pour their heart and skill into every piece, ensuring exceptional quality and uniqueness.</p>
            </FadeIn>
             <FadeIn className="text-center" delay="delay-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-semibold">Community Connection</h3>
              <p className="mt-2 text-muted-foreground">We are a platform for artisans to thrive, fostering a community that values creativity, collaboration, and conscious consumerism.</p>
            </FadeIn>
             <FadeIn className="text-center" delay="delay-400">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-semibold">Soulful Design</h3>
              <p className="mt-2 text-muted-foreground">We curate objects that are not only beautiful but also meaningful, designed to bring warmth and soul into your everyday life.</p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
