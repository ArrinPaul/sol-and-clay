'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import styles from './login.module.css';

function LoginContent() {
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState('/');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const redirect = params.get('redirect_url');
    if (redirect) {
      try {
        setRedirectUrl(decodeURIComponent(redirect));
      } catch {
        setRedirectUrl('/');
      }
    }
  }, [searchParams]);

  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-bg');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
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
            priority={false}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
