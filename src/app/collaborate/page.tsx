import { CollaborateForm } from '@/components/collaborate-form';
import { FadeIn } from '@/components/utils/fade-in';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Collaborate with Sol & Clay | Premium Ceramic Partnerships',
  description:
    'Partner with Sol & Clay. We collaborate with exceptional studios that share our passion for craftsmanship, quality materials, and meaningful design.',
};

const howItWorks = [
  {
    title: 'Ideation',
    description:
      'Sol & Clay identifies a product idea or theme based on consumer interest and design direction.',
  },
  {
    title: 'Studio Collaboration',
    description:
      'We work closely with a selected studio to shape the collection — balancing our concept with the studio\'s craft style.',
  },
  {
    title: 'Bringing It to Life',
    description:
      'The studio produces the collection, while Sol & Clay handles photography, storytelling, and launch.',
  },
];

export default function CollaboratePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-brand-beige via-white to-accent-beige">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-brand-brown font-medium tracking-widest uppercase text-sm mb-6 md:mb-8 letter-spacing-2">
    
              </p>
              <h1 className="font-headline text-6xl md:text-7xl lg:text-7xl font-bold text-dark-brown mb-8 leading-tight">
                Collaborate<br />With Us
              </h1>
              <p className="text-lg md:text-xl text-brand-brown max-w-2xl mx-auto leading-relaxed mb-2">
                We partner with artisans who share our passion for quality craftsmanship and thoughtful design.
              </p>
              <div className="h-1 w-24 bg-brand-brown mx-auto mt-8"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-luxury">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div>
                <p className="text-brand-brown font-medium tracking-wider uppercase text-sm mb-4">
                  The Process
                </p>
                <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-dark-brown mb-4">
                  How It Works
                </h2>
                <p className="text-brand-brown text-base md:text-lg mb-8">
                  Our partnership model is designed to be fair, transparent, and mutually beneficial.
                </p>
              </div>
              <div className="space-y-6">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-brand-brown text-brand-beige font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-brown mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-brand-brown leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay="delay-400">
              <div className="sticky top-24">
                <div className="bg-brand-beige border border-brand-brown/20 p-8 md:p-10">
                  <p className="text-brand-brown font-medium tracking-wider uppercase text-sm mb-4">
                    Apply Now
                  </p>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-dark-brown mb-4">
                    Are you a ceramic maker or studio?
                  </h3>
                  <p className="mb-8 text-xs md:text-sm text-brand-brown leading-relaxed">
                    If you&apos;re interested in collaborating on a future collection, we&apos;d love to hear from you.
                  </p>
                  <CollaborateForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-accent-beige text-dark-brown">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark-brown">
                Have Questions?
              </h2>
              <p className="text-brand-brown text-base md:text-lg mb-8 leading-relaxed">
                We&apos;d love to hear from you. Reach out to discuss partnership opportunities.
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


