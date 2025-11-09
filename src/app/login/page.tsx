
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
            baseTheme: "dark",
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-amber-600/30 rounded-xl",
              headerTitle: "font-headline text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent",
              headerSubtitle: "text-amber-200/70",
              socialButtonsBlockButton: "border-2 border-amber-600/40 bg-slate-700/50 hover:bg-amber-600/20 hover:border-amber-500 text-white transition-all",
              socialButtonsBlockButtonText: "text-white font-semibold",
              dividerLine: "bg-amber-600/20",
              dividerText: "text-amber-300/80 font-semibold",
              formFieldLabel: "text-amber-200 font-semibold",
              formFieldInput: "bg-slate-700/60 border-2 border-amber-600/30 text-white placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500 rounded-lg",
              formButtonPrimary: "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg hover:shadow-amber-500/50 hover:from-amber-400 hover:to-amber-500 transition-all rounded-lg",
              footerActionLink: "text-amber-400 hover:text-amber-300 font-semibold",
              footerActionText: "text-slate-300",
              identifierInputField: "bg-slate-700/60 border-2 border-amber-600/30 text-white placeholder-slate-400 focus:border-amber-500",
            },
            variables: {
              colorPrimary: "#f59e0b",
              colorBackground: "#1e293b",
              colorInputBackground: "#334155",
              colorInputBorder: "#b45309",
              colorInputText: "#ffffff",
              colorText: "#fbbf24",
              colorTextSecondary: "#cbd5e1",
              colorDanger: "#ef4444",
              colorSuccess: "#10b981",
              colorWarning: "#f59e0b",
              colorShimmer: "#f59e0b",
              fontFamily: "ui-rounded, sans-serif",
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
