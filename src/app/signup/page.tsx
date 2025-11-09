
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'Sign Up - Sol & Clay',
  description: 'Create a new account to start shopping and collaborating with Sol & Clay.',
};

export default async function SignUpPage({
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

  const bgImage = PlaceHolderImages.find((img) => img.id === 'signup-bg');
  const redirectUrl = params.redirect_url ? decodeURIComponent(params.redirect_url) : '/';

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
      <div className="flex items-center justify-center py-12 px-4">
        <SignUp 
          appearance={{
            baseTheme: "light",
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "bg-background shadow-2xl border-2 border-border rounded-xl",
              headerTitle: "font-headline text-3xl font-bold text-primary",
              headerSubtitle: "text-secondary-foreground",
              socialButtonsBlockButton: "border-2 border-border bg-secondary/50 hover:bg-secondary text-foreground transition-all",
              socialButtonsBlockButtonText: "text-foreground font-semibold",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground font-semibold",
              formFieldLabel: "text-foreground font-semibold",
              formFieldInput: "bg-secondary/30 border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary rounded-lg",
              formButtonPrimary: "bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all rounded-lg",
              footerActionLink: "text-primary hover:text-primary/80 font-semibold",
              footerActionText: "text-muted-foreground",
              identifierInputField: "bg-secondary/30 border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary",
            },
            variables: {
              colorPrimary: "#332219",
              colorBackground: "#F8F4F0",
              colorInputBackground: "#F8F4F0",
              colorInputBorder: "#E5E0DB",
              colorInputText: "#332219",
              colorText: "#332219",
              colorTextSecondary: "#5A3E36",
              colorDanger: "#dc2626",
              colorSuccess: "#16a34a",
              colorWarning: "#d97706",
              colorShimmer: "#F7C7C7",
              fontFamily: "Inter, sans-serif",
            }
          }}
          signInUrl="/login"
          afterSignUpUrl={redirectUrl}
        />
      </div>
    </div>
  );
}
