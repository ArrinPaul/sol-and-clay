import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/utils/fade-in';
import { collections } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Collections - Sol & Clay',
  description:
    'Every Sol & Clay collection begins with a story — a fusion of design and craft. Explore our evolving series, each one inspired by texture, pattern, and emotion.',
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-beige via-white to-accent-beige">
          <div className="container-luxury">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-brand-brown font-medium tracking-wider uppercase text-sm mb-4 md:mb-6">
                  Explore Our Work
                </p>
                <h1 className="font-headline text-6xl md:text-7xl lg:text-7xl font-bold text-dark-brown mb-6">
                  Collections
                </h1>
                <p className="text-lg md:text-xl text-brand-brown max-w-2xl mx-auto leading-relaxed">
                  Every collection begins with a story — a fusion of design and craft. Explore our curated series, each one inspired by texture, pattern, and emotion.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
  
        {/* Collections Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {collections.map((collection, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === collection.imageId
            );
            return (
              <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
            <Link
              href={`/collections/${collection.slug}`}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-accent-beige mb-0 card-luxury rounded-t-lg">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="flex items-center gap-2 text-brand-beige font-medium">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </span>
                </div>
              </div>
              <div className="space-y-3 card-luxury p-6 rounded-b-lg bg-accent-beige">
                <h2 className="font-headline text-2xl font-semibold text-dark-brown group-hover:text-brand-brown transition-colors">
              {collection.title}
                </h2>
                <p className="text-brand-brown leading-relaxed line-clamp-2">
              {collection.description}
                </p>
              </div>
            </Link>
              </FadeIn>
            );
          })}
            </div>
          </div>
        </section>


      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-accent-beige text-dark-brown">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-brown">
                Looking for Something Custom?
              </h2>
              <p className="text-brand-brown text-lg md:text-xl mb-8 leading-relaxed">
                Our artisans can create bespoke pieces tailored to your vision. Get in touch to discuss your custom order.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-dark-brown bg-brand-beige hover:bg-brand-beige/90 transition-colors font-medium text-lg px-6 py-3 rounded-lg border-2 border-dark-brown">
                Contact Us <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
