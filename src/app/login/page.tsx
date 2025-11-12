'use client';

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <SignIn signUpUrl="/signup" />
      </div>
    </div>
  );
}
