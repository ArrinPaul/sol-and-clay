
import { CustomiseForm } from '@/components/customise-form';
import { FadeIn } from '@/components/utils/fade-in';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Custom Orders - Sol & Clay',
  description:
    'Request a custom ceramic piece made in collaboration with our partner studios.',
};

export default function CustomisePage() {
  return (
    <div>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl">
              <h1 className="font-headline text-5xl md:text-6xl font-normal text-foreground mb-4">
                Custom Orders
              </h1>
              <p className="text-lg text-muted-foreground">
                Looking for a customised ceramic piece?
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-6">
                  How Custom Orders Work
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We work with our partner studios to explore custom requests based on feasibility and timelines.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Custom orders are reviewed on a case-by-case basis and depend on studio availability.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay="delay-400">
              <div className="sticky top-24">
                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <span className="inline-block mb-2 text-sm font-semibold tracking-wider uppercase text-primary">Request Custom Piece</span>
                    <CardTitle className="font-headline text-3xl">
                      Request a custom piece
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-8 text-muted-foreground leading-relaxed">
                      Tell us what you&apos;re looking for and we&apos;ll explore what&apos;s possible.
                    </p>
                    <CustomiseForm />
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
    
