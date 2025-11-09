
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Login - Sol & Clay',
  description: 'Sign in to your Sol & Clay account to access your cart and collaborate with us.',
};

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-bg');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <SignIn 
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
          signUpUrl="/signup"
          forceRedirectUrl="/"
        />
      </div>
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
    </div>
  );
}
