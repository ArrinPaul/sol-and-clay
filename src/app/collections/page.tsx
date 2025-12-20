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
      <section className="pt-32 pb-16 bg-gradient-to-br from-beige-light via-cream to-beige-warm">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-gold-luxury font-medium tracking-wider uppercase text-sm mb-6">
                Explore Our Work
              </p>
              <h1 className="font-headline text-6xl md:text-7xl font-bold text-brown-darkest mb-6">
                Collections
              </h1>
              <p className="text-xl text-brown-dark max-w-2xl leading-relaxed">
                Every collection begins with a story — a fusion of design and craft. Explore our curated series, each one inspired by texture, pattern, and emotion.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-24 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {collections.map((collection, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === collection.imageId
              );
              return (
                <FadeIn key={collection.id} delay={`delay-${index * 100}`}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block card-luxury"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige-warm mb-6">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-darkest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="flex items-center gap-2 text-cream font-medium">
                          Explore Collection <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h2 className="font-headline text-2xl font-semibold text-brown-darkest group-hover:text-gold-luxury transition-colors">
                        {collection.title}
                      </h2>
                      <p className="text-brown-dark leading-relaxed line-clamp-2">
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
      <section className="py-24 bg-brown-darkest text-cream">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                Looking for Something Custom?
              </h2>
              <p className="text-beige-warm text-xl mb-8 leading-relaxed">
                Our artisans can create bespoke pieces tailored to your vision. Get in touch to discuss your custom order.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-gold-luxury hover:text-gold-light transition-colors font-medium text-lg">
                Contact Us <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
