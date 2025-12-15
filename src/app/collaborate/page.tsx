
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
      <section className="relative bg-gradient-to-b from-accent/10 via-background to-background py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDEzOSwxMTEsOTIsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn direction="down">
            <span className="inline-block mb-4 rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm text-sm font-semibold tracking-wide text-primary">
              Partnership Opportunities
            </span>
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Collaborate With Us
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              We collaborate with studios that share our love for material and
              meaning. If you are an artisan who values soulful, modern design,
              we would love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn>
              <div>
                <span className="inline-block mb-4 text-sm font-semibold tracking-wider uppercase text-primary">How It Works</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                  The Partnership Model
                </h2>
              </div>
              <div className="mt-10 space-y-6">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-5 p-6 rounded-xl border-2 border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/30 text-primary font-bold text-lg shadow-md">
                      <span>{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <h3 className="font-headline text-3xl font-bold text-foreground mb-8">
                  Benefits for Studios
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mt-0.5">
                        <Check className="h-4 w-4" />
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

    