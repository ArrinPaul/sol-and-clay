

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
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover brightness-75"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <FadeIn direction="down">
            <span className="inline-block mb-4 rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm text-sm font-semibold tracking-wide text-primary">
              About Sol & Clay
            </span>
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl drop-shadow-sm">
              Our Story
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              At Sol & Clay, we build collections around strong visual ideas.
              Each piece is designed with intention and made with care —
              functional, soulful, and alive.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">Our Values</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                Our Philosophy
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                We value craft, collaboration, and character over mass
                production. Every item is made with intention and care.
              </p>
            </div>
          </FadeIn>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <FadeIn className="text-center">
              <div className="p-8 rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h3 className="mt-8 font-headline text-2xl font-semibold text-foreground">
                  Craft
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We partner with independent makers who pour their heart and
                  skill into every piece, ensuring exceptional quality and
                  uniqueness in each creation.
                </p>
              </div>
            </FadeIn>
            <FadeIn className="text-center" delay="delay-200">
              <div className="p-8 rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="mt-8 font-headline text-2xl font-semibold text-foreground">
                  Collaboration
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We are a platform for artisans to thrive, fostering a community
                  that values creativity and shared storytelling through design.
                </p>
              </div>
            </FadeIn>
            <FadeIn className="text-center" delay="delay-400">
              <div className="p-8 rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="mt-8 font-headline text-2xl font-semibold text-foreground">
                  Character
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We curate objects that are not only beautiful but also
                  meaningful, designed to bring warmth and soul into your
                  everyday life and spaces.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Timeline data={timelineData} />

      <section className="bg-gradient-to-b from-accent/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">The Process</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                Our Craft Process
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                From sketch to kiln, we work with artisans who transform ideas into timeless décor. 
                Our process is a dialogue between design and material, ensuring every piece reflects 
                our shared vision and the maker&apos;s unique touch.
              </p>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                    1
                  </div>
                  <p className="mt-3 font-headline text-xl font-semibold">Clay</p>
                </div>
                <div className="text-3xl text-primary">→</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                    2
                  </div>
                  <p className="mt-3 font-headline text-xl font-semibold">Shape</p>
                </div>
                <div className="text-3xl text-primary">→</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                    3
                  </div>
                  <p className="mt-3 font-headline text-xl font-semibold">Glaze</p>
                </div>
                <div className="text-3xl text-primary">→</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                    4
                  </div>
                  <p className="mt-3 font-headline text-xl font-semibold">Fire</p>
                </div>
                <div className="text-3xl text-primary">→</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg shadow-lg">
                  ♥
                </div>
                <p className="mt-3 font-headline text-xl font-semibold">Home</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
