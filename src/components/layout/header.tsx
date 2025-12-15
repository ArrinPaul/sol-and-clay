
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, ShoppingBag, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useUser, SignOutButton } from '@clerk/nextjs';
import {
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
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

  const { user, isLoaded } = useUser();
  const firestore = useFirestore();

  const cartItemsRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.id, 'cartItems')
        : null,
    [user, firestore]
  );
  const { data: cartItems } = useCollection(cartItemsRef);

  const cartItemCount = cartItems?.length ?? 0;
  const userInitial = user?.firstName?.charAt(0).toUpperCase() ?? user?.lastName?.charAt(0).toUpperCase() ?? '?';

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
      {!isLoaded ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src={user.imageUrl ?? ''}
                  alt={user.fullName ?? ''}
                />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.fullName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.primaryEmailAddress?.emailAddress}
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
            <SignOutButton redirectUrl="/login">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </SignOutButton>
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

      <Button variant="ghost" size="icon" asChild className="relative hover:bg-primary/10 transition-colors">
        <Link href="/cart">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md animate-pulse">
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
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm' : 'border-b border-transparent bg-background/50 backdrop-blur-sm',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container mx-auto flex h-18 items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-4">
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-background/95 backdrop-blur-md">
                <div className="p-6">
                    <Link href="/" className="mb-8 flex items-center">
                    <Logo />
                    </Link>
                    <nav className="flex flex-col space-y-3 mb-4">
                    {renderNavLinks(true)}
                    </nav>
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex gap-2">
                        {renderAuthAndCart()}
                      </div>
                    </div>
                </div>
                </SheetContent>
            </Sheet>
            </div>
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
        </div>


        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-1">
          <nav className="flex items-center space-x-1">
            {renderNavLinks()}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-2">
            {renderAuthAndCart()}
        </div>
      </div>
    </header>
  );
}
