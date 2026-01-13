'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useUser, UserButton } from '@clerk/nextjs';

const navLinks = [
  { href: '/collections', label: 'Collections' },
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/customise', label: 'Customise' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isSignedIn, user } = useUser();

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

  const renderAuthAndCart = () => (
    <>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <User className="h-5 w-5" />
            <span className="sr-only">Login</span>
          </Link>
        </Button>
      )}

      <Button variant="ghost" size="icon" asChild className="relative text-black hover:text-brand-brown transition-colors">
        <Link href="/cart">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
        </Link>
      </Button>
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled ? 'bg-brand-beige/98 backdrop-blur-md shadow-luxury border-brand-brown/20' : 'bg-brand-beige/80 backdrop-blur-sm border-transparent',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container-luxury flex h-16 items-center justify-between">
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
              className="text-sm font-medium text-black hover:text-brand-brown transition-colors tracking-wide uppercase"
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
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-3xl font-headline font-bold text-dark-brown hover:text-dark-brown transition-colors"
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
