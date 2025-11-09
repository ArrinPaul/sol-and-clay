
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'Login - Sol & Clay',
  description: 'Sign in to your Sol & Clay account to access your cart and collaborate with us.',
};

export default async function LoginPage() {
  const { userId } = await auth();
  
  // If user is already logged in, redirect to home
  if (userId) {
    redirect('/');
  }

  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-bg');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <SignIn 
          appearance={{
            baseTheme: "light",
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "bg-white shadow-2xl border-2 border-orange-200 rounded-xl",
              headerTitle: "font-headline text-3xl font-bold text-amber-900",
              headerSubtitle: "text-amber-700",
              socialButtonsBlockButton: "border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-all",
              socialButtonsBlockButtonText: "text-amber-900 font-semibold",
              dividerLine: "bg-amber-200",
              dividerText: "text-amber-700 font-semibold",
              formFieldLabel: "text-amber-900 font-semibold",
              formFieldInput: "bg-orange-50 border-2 border-orange-200 text-amber-900 placeholder-amber-600 focus:border-amber-600 focus:ring-amber-500 rounded-lg",
              formButtonPrimary: "bg-amber-900 text-white font-bold shadow-lg hover:bg-amber-800 hover:shadow-lg transition-all rounded-lg",
              footerActionLink: "text-amber-700 hover:text-amber-900 font-semibold",
              footerActionText: "text-amber-600",
              identifierInputField: "bg-orange-50 border-2 border-orange-200 text-amber-900 placeholder-amber-600 focus:border-amber-600",
            },
            variables: {
              colorPrimary: "#5a3e36",
              colorBackground: "#f8f4f0",
              colorInputBackground: "#fff7ed",
              colorInputBorder: "#fed7aa",
              colorInputText: "#332219",
              colorText: "#5a3e36",
              colorTextSecondary: "#92400e",
              colorDanger: "#dc2626",
              colorSuccess: "#16a34a",
              colorWarning: "#d97706",
              colorShimmer: "#fbbf24",
              fontFamily: "ui-rounded, sans-serif",
            }
          }}
          signUpUrl="/signup"
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
