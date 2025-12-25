
import { CollaborateForm } from '@/components/collaborate-form';
import { FadeIn } from '@/components/utils/fade-in';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Collaborate with Sol & Clay',
  description:
    'We collaborate with studios that share our love for material and meaning.',
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
            </FadeIn>

            <FadeIn delay="delay-400">
              <div className="sticky top-24">
                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="pb-6">
                    <span className="inline-block mb-2 text-sm font-semibold tracking-wider uppercase text-primary">Apply Now</span>
                    <CardTitle className="font-headline text-3xl">
                      Are you a ceramic maker or studio?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-8 text-muted-foreground leading-relaxed">
                      If you&apos;re interested in collaborating on a future collection, we&apos;d love to hear from you.
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

    