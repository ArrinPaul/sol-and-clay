
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections } from '@/lib/data';

export const metadata = {
  title: 'Our Collections - Sol & Clay',
  description:
    'Every Sol & Clay collection begins with a story — a fusion of design and craft. Explore our evolving series, each one inspired by texture, pattern, and emotion.',
};

export default function CollectionsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <FadeIn direction="down">
            <div className="text-center">
              <span className="inline-block mb-4 rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm text-sm font-semibold tracking-wide text-primary">
                Explore
              </span>
              <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                The Collections
              </h1>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg md:text-xl text-muted-foreground leading-relaxed">
              Every Sol & Clay collection begins with a story — a fusion of design
              and craft. Explore our evolving series, each one inspired by
              texture, pattern, and emotion.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === collection.imageId
              );
              return (
                <FadeIn key={collection.id} delay={`delay-${(index + 1) * 200}`}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block h-full"
                  >
                    <Card className="h-full flex flex-col overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 group-hover:border-primary group-hover:shadow-2xl group-hover:-translate-y-2">
                      <div className="relative h-96 w-full overflow-hidden">
                        {image && (
                          <>
                            <Image
                              src={image.imageUrl}
                              alt={image.description}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              data-ai-hint={image.imageHint}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                                View Collection
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow p-8">
                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                          {collection.title}
                        </CardTitle>
                        <p className="mt-3 text-muted-foreground flex-grow leading-relaxed">
                          {collection.description}
                        </p>
                        <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Explore pieces</span>
                          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background to-accent/10 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
              Can't find what you're looking for?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We collaborate with artisans to create custom pieces. Let's discuss your vision.
            </p>
            <div className="mt-8">
              <Link href="/collaborate">
                <button className="px-8 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Start a Collaboration
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
