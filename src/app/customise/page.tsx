import { CustomiseForm } from '@/components/customise-form';
import { FadeIn } from '@/components/utils/fade-in';
import { FileText, Clock, Handshake } from 'lucide-react';

export const metadata = {
  title: 'Custom Orders - Sol & Clay',
  description:
    'Request a custom ceramic piece made in collaboration with our partner studios.',
};

export default function CustomisePage() {
  return (
    <div className="min-h-screen">
      <section className="pt-40 pb-20 bg-gradient-to-br from-brand-beige via-white to-accent-beige">
        <div className="container-luxury">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-brand-brown font-medium tracking-widest uppercase text-sm mb-6 md:mb-8 letter-spacing-2">
                Bespoke Collections
              </p>
              <h1 className="font-headline text-6xl md:text-7xl lg:text-7xl font-bold text-dark-brown mb-8 leading-tight">
                Custom Orders
              </h1>
              <p className="text-lg md:text-xl text-brand-brown max-w-2xl mx-auto leading-relaxed mb-2">
                Looking for a customised ceramic piece?
              </p>
              <div className="h-1 w-24 bg-brand-brown mx-auto mt-8"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Information Section */}
            <FadeIn>
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-5xl font-bold text-dark-brown mb-8">
                    How Custom Orders Work
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-brown text-lg mb-1">Tell Us Your Vision</h3>
                        <p className="text-brand-brown leading-relaxed">
                          Share your custom piece idea, including design preferences, materials, and intended use.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-brown text-lg mb-1">Review & Timeline</h3>
                        <p className="text-brand-brown leading-relaxed">
                          We review your request and provide feasibility feedback along with production timelines.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 p-6 bg-brand-beige border border-brand-brown/20 hover:shadow-luxury transition-all duration-300 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-brown text-brand-beige flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Handshake className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-brown text-lg mb-1">Collaboration</h3>
                        <p className="text-brand-brown leading-relaxed">
                          Work directly with our artisans to bring your vision to life with the finest craftsmanship.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form Section */}
            <FadeIn delay="delay-200">
              <div className="bg-brand-beige p-10 border border-brand-brown/20">
                <h2 className="font-headline text-3xl font-bold text-dark-brown mb-8">
                  Request a Custom Piece
                </h2>
                <p className="mb-8 text-brand-brown leading-relaxed">
                  Tell us what you&apos;re looking for and we&apos;ll explore what&apos;s possible.
                </p>
                <CustomiseForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
    
