
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
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <FadeIn direction="down">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Collaborate With Us
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              We collaborate with studios that share our love for material and
              meaning. If you are an artisan who values soulful, modern design,
              we would love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="font-headline text-4xl font-bold text-foreground">
                The Partnership Model
              </h2>
              <div className="mt-8 space-y-8">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mt-12 font-headline text-3xl font-bold text-foreground">
                Benefits for Studios
              </h3>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay="delay-400">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    Join as a Maker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-muted-foreground">
                    Tell us about your work. Our team will review your
                    submission to see if we're a good fit.
                  </p>
                  <CollaborateForm />
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

    