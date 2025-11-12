'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <SignUp signInUrl="/login" />
      </div>
    </div>
  );
}
