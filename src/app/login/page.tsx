
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'Login - Sol & Clay',
  description: 'Sign in to your Sol & Clay account to access your cart and collaborate with us.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const { userId } = await auth();
  const params = await searchParams;
  
  // If user is already logged in, redirect to home
  if (userId) {
    redirect('/');
  }

  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-bg');
  const redirectUrl = params.redirect_url ? decodeURIComponent(params.redirect_url) : '/';

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <style>{`
            .clerk-container {
              background: hsl(var(--background));
              border: 2px solid hsl(var(--border));
              border-radius: 0.75rem;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }
            .clerk-element__title {
              font-family: "Cormorant Garamond", serif;
              color: hsl(var(--primary));
              font-size: 1.875rem;
              font-weight: bold;
            }
            .clerk-element__subtitle {
              color: hsl(var(--secondary-foreground));
            }
            .clerk-element__label {
              color: hsl(var(--foreground));
              font-weight: 600;
            }
            .clerk-element__input,
            .clerk-element__textarea {
              background-color: hsl(var(--secondary)) / 0.3;
              border: 2px solid hsl(var(--border));
              color: hsl(var(--foreground));
              border-radius: 0.5rem;
            }
            .clerk-element__input::placeholder,
            .clerk-element__textarea::placeholder {
              color: hsl(var(--muted-foreground));
            }
            .clerk-element__button--primary {
              background-color: hsl(var(--primary));
              color: hsl(var(--primary-foreground));
              font-weight: bold;
              border-radius: 0.5rem;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .clerk-element__button--primary:hover {
              background-color: hsl(var(--primary) / 0.9);
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
            }
            .clerk-element__button--secondary {
              border: 2px solid hsl(var(--border));
              background-color: hsl(var(--secondary)) / 0.5;
              color: hsl(var(--foreground));
              border-radius: 0.5rem;
            }
            .clerk-element__button--secondary:hover {
              background-color: hsl(var(--secondary));
            }
            .clerk-element__link {
              color: hsl(var(--primary));
              font-weight: 600;
            }
            .clerk-element__link:hover {
              color: hsl(var(--primary) / 0.8);
            }
            .clerk-element__divider {
              background-color: hsl(var(--border));
            }
            .clerk-element__divider__text {
              color: hsl(var(--muted-foreground));
              font-weight: 600;
            }
          `}</style>
          <SignIn
            signUpUrl="/signup"
            afterSignInUrl={redirectUrl}
          />
        </div>
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
