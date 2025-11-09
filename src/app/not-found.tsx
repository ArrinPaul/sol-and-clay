import type { Metadata } from 'next';
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Sol & Clay',
  description: 'The page you are looking for does not exist.',
};

const NotFound: FC = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 font-headline text-8xl font-bold text-primary">
          404
        </h1>
        <h2 className="mb-2 font-headline text-3xl font-bold">
          Page Not Found
        </h2>
        <p className="mb-8 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
