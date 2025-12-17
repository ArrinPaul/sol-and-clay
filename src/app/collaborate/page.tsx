
import { CollaborateForm } from '@/components/collaborate-form';
import { FadeIn } from '@/components/utils/fade-in';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Collaborate with Sol & Clay',
  description:
    'We collaborate with studios that share our love for material and meaning.',
};

const benefits = [
  'Increased visibility and reach to a design-focused audience.',
  'Shared storytelling to highlight your craft and process.',
  'An additional, reliable source of income.',
  'A safe space for creative experimentation and growth.',
];

const howItWorks = [
  {
    title: 'Design & Direction',
    description:
      'All collections are designed and directed by Sol & Clay to ensure brand cohesion.',
  },
  {
    title: 'Production',
    description:
      'Your studio handles the production, bringing our shared vision to life.',
  },
  {
    title: 'Co-Branding',
    description:
      'Every collaboration is co-credited, celebrating the partnership between maker and brand.',
  },
  {
    title: 'Revenue Sharing',
    description:
      'We believe in fair and flexible partnerships that benefit everyone involved.',
  },
];

export default function CollaboratePage() {
  return (
    <div>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="max-w-4xl">
              <h1 className="font-headline text-5xl md:text-6xl font-normal text-foreground mb-4">
                Collaborate With Us
              </h1>
              <p className="text-lg text-muted-foreground">
                We partner with artisans who share our passion for quality craftsmanship and thoughtful design.
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
                <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-3">
                  How It Works
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our partnership model is designed to be fair, transparent, and mutually beneficial.
                </p>
              </div>
              <div className="space-y-6">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4 p-5 border border-border bg-background hover:border-primary/50 transition-all">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-medium text-foreground mb-6">
                  Benefits
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay="delay-400">
              <div className="sticky top-24">
                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <span className="inline-block mb-2 text-sm font-semibold tracking-wider uppercase text-primary">Apply Now</span>
                    <CardTitle className="font-headline text-3xl">
                      Join as a Maker
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-8 text-muted-foreground leading-relaxed">
                      Tell us about your work. Our team will review your
                      submission to see if we&apos;re a good fit for collaboration.
                    </p>
                    <CollaborateForm />
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

    