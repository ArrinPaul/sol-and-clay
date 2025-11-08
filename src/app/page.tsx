import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, Users, Wind } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-main');
  const featuredCollectionImage = PlaceHolderImages.find(img => img.id === 'collection-checkered');

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
              Functional décor with soul.
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Each piece is handcrafted, warm, and personal — designed to bring depth and beauty into modern spaces.
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

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <p className="max-w-3xl mx-auto text-center font-headline text-2xl md:text-3xl text-foreground">
              At Sol & Clay, we believe beauty lies in imperfection. Every curve, texture, and glaze tells a story — of hands, earth, and imagination. Our work blends design and craft into décor that feels truly alive.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why Handmade Matters Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center font-headline text-4xl font-bold text-foreground">
              Why Handmade Matters
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FadeIn delay="delay-0">
              <Card className="h-full text-center border-0 bg-transparent shadow-none">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Leaf />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">Sustainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Crafted in small batches to minimize waste and honor our materials.</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-200">
               <Card className="h-full text-center border-0 bg-transparent shadow-none">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Users />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">Local Craftsmanship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Supporting local artisans and preserving traditional craft techniques.</p>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay="delay-400">
               <Card className="h-full text-center border-0 bg-transparent shadow-none">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Wind />
                  </div>
                  <CardTitle className="pt-4 font-headline text-2xl">Natural Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Using responsibly sourced clay and non-toxic glazes for pieces that are safe and beautiful.</p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Featured Collection */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <FadeIn direction="left">
              <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-xl">
                {featuredCollectionImage && (
                   <Image
                    src={featuredCollectionImage.imageUrl}
                    alt={featuredCollectionImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={featuredCollectionImage.imageHint}
                  />
                )}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <h3 className="font-headline text-sm uppercase tracking-widest text-muted-foreground">Featured Collection</h3>
              <h2 className="mt-2 font-headline text-4xl font-bold text-foreground">The Checkered Collection</h2>
              <p className="mt-4 text-muted-foreground">Classic patterns, reimagined in modern, functional forms.</p>
              <Button asChild variant="link" className="p-0 text-base">
                <Link href="#">Explore the Collection <ArrowRight /></Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
            <FadeIn>
                <h2 className="font-headline text-3xl md:text-4xl font-bold">
                    Bring warmth home — Explore our latest pieces.
                </h2>
                <Button asChild size="lg" variant="secondary" className="mt-6">
                    <Link href="/collections">
                        Shop All Collections
                    </Link>
                </Button>
            </FadeIn>
        </div>
      </section>
    </div>
  );
}
