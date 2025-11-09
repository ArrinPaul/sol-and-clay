
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Sign Up - Sol & Clay',
  description: 'Create a new account to start shopping and collaborating with Sol & Clay.',
};

export default function SignUpPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'signup-bg');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block relative">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover dark:brightness-[0.3]"
          />
        )}
      </div>
      <div className="flex items-center justify-center py-12">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-background shadow-lg border border-border rounded-lg",
              headerTitle: "font-headline text-2xl font-bold",
              formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              socialButtonsBlockButton: "border border-border hover:bg-accent",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-input border-border text-foreground",
              footerActionLink: "text-primary hover:text-primary/90",
            }
          }}
          redirectUrl="/"
          signInUrl="/login"
          forceRedirectUrl="/"
        />
      </div>
    </div>
  );
}
