
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, ShoppingBag, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { useAuth } from '@/firebase/hooks/use-auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { collection } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const navLinks = [
  { href: '/collections', label: 'Collections' },
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user, loading } = useAuth();
  const firestore = useFirestore();

  const cartItemsRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'cartItems')
        : null,
    [user, firestore]
  );
  const { data: cartItems } = useCollection(cartItemsRef);

  const cartItemCount = cartItems?.length ?? 0;
  const userInitial = user?.email?.charAt(0).toUpperCase() ?? '?';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Button key={link.href} variant="ghost" asChild className={cn(isMobile && 'w-full justify-start hover:bg-primary/10')}>
        <Link
          href={link.href}
          className={cn(
            'text-sm font-medium transition-all duration-200 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full',
            isMobile && 'w-full justify-start after:content-none text-base'
          )}
        >
          {link.label}
        </Link>
      </Button>
    ));

  const renderAuthAndCart = () => (
    <>
      {loading ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar>
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onClick={async () => {
                try {
                  await signOut(auth);
                } catch (error) {
                  console.error('Sign out error:', error);
                }
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <User className="h-5 w-5" />
            <span className="sr-only">Login</span>
          </Link>
        </Button>
      )}

      <Button variant="ghost" size="icon" asChild className="relative text-black hover:text-brown-primary transition-colors">
        <Link href="/cart">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brown-primary text-xs font-bold text-beige-primary shadow-brown">
              {cartItemCount}
            </span>
          )}
        </Link>
      </Button>
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled ? 'bg-beige-primary/98 backdrop-blur-md shadow-luxury border-brown-primary/20' : 'bg-beige-primary/80 backdrop-blur-sm border-transparent',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black hover:text-brown-primary transition-colors tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {renderAuthAndCart()}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-transparent">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-background">
                <div className="flex flex-col h-full pt-12">
                  <nav className="flex flex-col space-y-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-3xl font-headline font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
