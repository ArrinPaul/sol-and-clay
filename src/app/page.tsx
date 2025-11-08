import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Feather, Scissors, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections, makerOfMonth } from '@/lib/data';

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
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              From Earth to Art
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover artisanal home décor that brings warmth, soul, and modern elegance into your space. Each piece tells a story.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay="delay-400">
            <Button asChild size="lg" className="mt-8">
              <Link href="/collections">
                Explore The Collection <ArrowRight />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Featured Collections
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              Hand-selected pieces curated to bring harmony and beauty to your home.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {collections.slice(0, 3).map((collection, index) => {
              const image = PlaceHolderImages.find((img) => img.id === collection.imageId);
              return (
                <FadeIn key={collection.id} delay={`delay-${index * 200}`}>
                  <Link href="#" className="group block">
                    <Card className="overflow-hidden border-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-xl">
                      <div className="relative h-96 w-full">
                        {image && (
                           <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl">
                          {collection.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{collection.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Make Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Our Process
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
              The journey of each piece from raw material to a work of art.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FadeIn delay="delay-0">
              <Card className="h-full text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <Feather className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">Clay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">It all begins with carefully selected, high-quality clay, sourced for its purity and texture.</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-200">
               <Card className="h-full text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <Scissors className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">Shape</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our artisans skillfully shape each piece by hand, imbuing it with a unique character and soul.</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-400">
               <Card className="h-full text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <Sparkles className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">Glaze</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">A final firing with our signature glazes creates a durable, beautiful finish that will last a lifetime.</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Maker of the Month */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn direction="left">
              <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-xl">
                {makerOfMonth.image && (
                   <Image
                    src={makerOfMonth.image.imageUrl}
                    alt={makerOfMonth.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={makerOfMonth.image.imageHint}
                  />
                )}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <h3 className="font-headline text-sm uppercase tracking-widest text-muted-foreground">Maker of the Month</h3>
              <h2 className="mt-2 font-headline text-4xl font-bold text-foreground">{makerOfMonth.name}</h2>
              <p className="mt-4 text-muted-foreground">{makerOfMonth.bio}</p>
              <Button asChild variant="link" className="p-0 text-base">
                <Link href="#">Read her story <ArrowRight /></Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
