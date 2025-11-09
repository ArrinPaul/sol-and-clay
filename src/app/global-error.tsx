'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: FC<GlobalErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Critical Error</h1>
            <p className="mb-6 text-muted-foreground">
              The application encountered a critical error. Please refresh the page or contact support if the problem persists.
            </p>
            {process.env.NODE_ENV === 'development' && error.message && (
              <pre className="mb-6 overflow-auto rounded-lg bg-secondary p-4 text-left text-sm">
                {error.message}
              </pre>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
