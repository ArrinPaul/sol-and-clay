
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="container mx-auto px-4 py-12">
      <FadeIn direction="down">
        <h1 className="text-center font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          The Collections
        </h1>
      </FadeIn>
      <FadeIn direction="up" delay="delay-200">
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          Every Sol & Clay collection begins with a story — a fusion of design
          and craft. Explore our evolving series, each one inspired by
          texture, pattern, and emotion.
        </p>
      </FadeIn>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <Card className="h-full flex flex-col overflow-hidden border-2 transition-all duration-300 group-hover:border-primary group-hover:shadow-xl">
                  <div className="relative h-96 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <CardTitle className="font-headline text-2xl">
                      {collection.title}
                    </CardTitle>
                    <p className="mt-2 text-muted-foreground flex-grow">
                      {collection.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
