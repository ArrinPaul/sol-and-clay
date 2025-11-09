import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

export const metadata = {
  title: 'My Profile - Sol & Clay',
  description: 'Manage your Sol & Clay profile and account settings.',
};

export default async function ProfilePage() {
  const { userId } = await auth();

  // Redirect to login if not authenticated
  if (!userId) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">My Account</CardTitle>
            <CardDescription>Manage your Sol & Clay account and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-secondary/30 p-4">
              <h3 className="font-headline text-lg font-semibold text-foreground mb-3">
                Account Details
              </h3>
              <p className="text-muted-foreground mb-4">
                You're successfully logged in to your Sol & Clay account.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-lg font-semibold text-foreground">Quick Links</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/cart">View My Cart</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/collections">Browse Collections</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/collaborate">Collaborate With Us</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <SignOutButton redirectUrl="/">
                <Button variant="destructive" className="w-full" size="lg">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
