
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
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="mb-16">
            <h1 className="font-headline text-5xl md:text-6xl font-normal text-foreground mb-4">
              Collections
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our curated selection of handcrafted home décor pieces.
            </p>
          </div>
        </FadeIn>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {collections.map((collection, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === collection.imageId
            );
            return (
              <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted mb-4">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                      {collection.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
