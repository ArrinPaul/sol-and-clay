'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { LogOut, ShoppingBag, Package, User as UserIcon, Mail, Settings, Truck, MapPin, CreditCard, Heart, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-secondary/30 border-b border-border py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-2">
                Welcome back, {user?.email?.split('@')[0] || 'Artisan'}
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar - Account Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-2 border-border shadow-lg">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="font-headline text-2xl flex items-center gap-2 text-primary">
                  <UserIcon className="h-6 w-6" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold font-headline">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      {user?.email}
                    </p>
                    <p className="text-sm text-muted-foreground">Sol & Clay Member</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium text-foreground break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <Button onClick={handleSignOut} variant="destructive" className="w-full" size="lg">
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-border">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="font-headline text-xl text-primary">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start text-left">
                  <Link href="/">
                    <Package className="mr-3 h-5 w-5" />
                    Home
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start text-left">
                  <Link href="/collections">
                    <ShoppingBag className="mr-3 h-5 w-5" />
                    Collections
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start text-left">
                  <Link href="/collaborate">
                    <Package className="mr-3 h-5 w-5" />
                    Collaborate
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start text-left">
                  <Link href="/contact">
                    <Mail className="mr-3 h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Order History */}
            <Card className="border-2 border-border shadow-lg">
              <CardHeader className="bg-secondary/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-2xl flex items-center gap-2 text-primary">
                    <Package className="h-6 w-6" />
                    Account Settings
                  </CardTitle>
                </div>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                    <Settings className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
                    Account Settings
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your account is active and ready to use. You can update your profile information anytime.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/collections">
                      Browse Collections
                    </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

            {/* Track Order */}
            <Card className="border-2 border-border">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="font-headline text-2xl flex items-center gap-2 text-primary">
                  <Truck className="h-6 w-6" />
                  Track Your Order
                </CardTitle>
                <CardDescription>Enter your order number to check shipping status</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-accent/10 rounded-lg p-6 text-center">
                  <Truck className="h-10 w-10 mx-auto text-primary mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Order tracking will be available once you complete a purchase.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/shipping">
                        <MapPin className="mr-2 h-4 w-4" />
                        Shipping Info
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Support
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Details / Preferences */}
            <Card className="border-2 border-border">
              <CardHeader className="bg-secondary/20">
                <CardTitle className="font-headline text-2xl flex items-center gap-2 text-primary">
                  <Settings className="h-6 w-6" />
                  Account Preferences
                </CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 border-2 border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Shipping Address</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage your delivery addresses
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Add Address
                    </Button>
                  </div>

                  <div className="p-4 border-2 border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Payment Methods</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage saved payment methods
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Add Payment
                    </Button>
                  </div>

                  <div className="p-4 border-2 border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Saved Items</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      View your wishlist items
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Wishlist
                    </Button>
                  </div>

                  <div className="p-4 border-2 border-border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">Contact Info</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Update your contact details
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
