
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/collections', label: 'Collections' },
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavLinks = () => (
    navLinks.map((link) => (
      <Button key={link.href} variant="ghost" asChild>
        <Link href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
          {link.label}
        </Link>
      </Button>
    ))
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b bg-background/80 backdrop-blur-sm' : 'border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center justify-center">
            <Logo />
          </Link>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="p-4">
                 <Link href="/" className="mb-8 flex items-center justify-center">
                   <Logo />
                 </Link>
                <nav className="flex flex-col space-y-3">
                  {renderNavLinks()}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centered logo on mobile */}
        <div className="flex flex-1 items-center justify-center md:hidden">
            <Link href="/" className="flex items-center justify-center">
                <Logo />
            </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-2 md:flex flex-1">
          {renderNavLinks()}
        </nav>

        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
             <Link href="/login">
               <User className="h-5 w-5" />
               <span className="sr-only">Login</span>
             </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
             <Link href="/cart">
               <ShoppingBag className="h-5 w-5" />
               <span className="sr-only">Cart</span>
             </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
