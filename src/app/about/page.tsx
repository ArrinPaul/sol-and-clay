

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { Sparkles, Users, Target } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';

export const metadata = {
  title: 'Our Story - Sol & Clay',
  description:
    'Sol & Clay builds collections around strong visual ideas. Each piece is handcrafted and carries a story of design and touch.',
};

const timelineData = [
    {
      title: "The Idea",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8">
            Sol & Clay was born from a love for earthy materials and a vision for soulful, modern homes. It all started with sketches of handcrafted objects and a desire to give artisans a platform to share their craft.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="https://picsum.photos/seed/pottery-sketch/1000/500"
              alt="Sketchbook with pottery designs"
              width={1000}
              height={500}
              data-ai-hint="pottery sketch"
              className="rounded-lg object-cover h-40 md:h-60 w-full shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "First Partnerships",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-sm font-normal mb-8">
            We sought out our first maker partners—artisans who shared our passion for quality and design. These initial collaborations helped shape our first collection and defined the collaborative spirit of Sol & Clay.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <Image
              src="https://picsum.photos/seed/partner-1/500/500"
              alt="Two artisans collaborating in a studio"
              width={500}
              height={500}
              data-ai-hint="artisan collaboration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
             <Image
              src="https://picsum.photos/seed/partner-2/500/500"
              alt="Close-up of hands working on pottery"
              width={500}
              height={500}
              data-ai-hint="hands pottery"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
          </div>
        </div>
      ),
    },
    {
      title: "The Launch",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-sm font-normal mb-8">
            With our first collection ready, we launched the Sol & Clay website. It was the culmination of countless hours of design, craft, and collaboration, finally ready to be shared with the world.
          </p>
          <div className="grid grid-cols-1 gap-4">
             <Image
              src="https://picsum.photos/seed/launch-1/1000/500"
              alt="Beautifully arranged pottery from the first collection"
              width={1000}
              height={500}
              data-ai-hint="pottery collection"
              className="rounded-lg object-cover h-40 md:h-60 w-full shadow-md"
            />
          </div>
        </div>
      ),
    },
];


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
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Our Story
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              At Sol & Clay, we build collections around strong visual ideas.
              Each piece is designed with intention and made with care —
              functional, soulful, and alive.
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
              We value craft, collaboration, and character over mass
              production. Every item is made with intention and care.
            </p>
          </FadeIn>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <FadeIn className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-semibold">
                Craft
              </h3>
              <p className="mt-2 text-muted-foreground">
                We partner with independent makers who pour their heart and
                skill into every piece, ensuring exceptional quality and
                uniqueness.
              </p>
            </FadeIn>
            <FadeIn className="text-center" delay="delay-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-semibold">
                Collaboration
              </h3>
              <p className="mt-2 text-muted-foreground">
                We are a platform for artisans to thrive, fostering a community
                that values creativity and shared storytelling.
              </p>
            </FadeIn>
            <FadeIn className="text-center" delay="delay-400">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-semibold">
                Character
              </h3>
              <p className="mt-2 text-muted-foreground">
                We curate objects that are not only beautiful but also
                meaningful, designed to bring warmth and soul into your
                everyday life.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <Timeline data={timelineData} />

      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Our Craft Process
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Clay → Shape → Glaze → Fire → Home. From sketch to kiln, we work
              with artisans who transform ideas into timeless décor. Our
              process is a dialogue between design and material, ensuring every
              piece reflects our shared vision and the maker&apos;s unique touch.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
