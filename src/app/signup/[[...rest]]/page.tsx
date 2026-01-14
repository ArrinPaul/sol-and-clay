'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <SignUp 
        signInUrl="/login"
        unsafeMetadata={{
          firstName: '',
          lastName: '',
        }}
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-xl',
            formButtonPrimary: 'bg-[#8B7355] hover:bg-[#6d5744]',
          },
        }}
      />
    </div>
  );
}
