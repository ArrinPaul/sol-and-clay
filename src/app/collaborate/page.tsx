import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CollaborateForm } from '@/components/collaborate-form';
import { FadeIn } from '@/components/utils/fade-in';

export const metadata = {
  title: 'Collaborate with Sol & Clay',
  description: 'Join our community of artisans and makers. We welcome collaborations with artists who share our passion for handcrafted quality and soulful design.',
};

export default function CollaboratePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'collaborate-hero');

  return (
    <div>
      <section className="relative h-[60vh] min-h-[400px] w-full bg-secondary/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <FadeIn direction="down">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Join as a Maker
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay="delay-200">
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              We believe in the power of collaboration to create beautiful, meaningful objects. If you are an artisan who shares our passion for handcrafted quality and soulful design, we invite you to connect with us.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
             <FadeIn>
                <h2 className="text-center font-headline text-4xl font-bold text-foreground">
                  Collaboration Request
                </h2>
                <p className="mx-auto mt-2 text-center text-muted-foreground">
                    Tell us about your work. Our team, with the help of our AI assistant, will review your submission to ensure it aligns with the Sol & Clay aesthetic.
                </p>
            </FadeIn>
            <FadeIn className="mt-12">
                <CollaborateForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
