
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, User, ShoppingBag, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  useUser,
  useAuth,
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/collections', label: 'Collections' },
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const cartItemsRef = useMemoFirebase(
    () =>
      user && firestore
        ? collection(firestore, 'users', user.uid, 'cartItems')
        : null,
    [user, firestore]
  );
  const { data: cartItems } = useCollection(cartItemsRef);

  const cartItemCount = cartItems?.length ?? 0;
  const userInitial = user?.displayName?.charAt(0).toUpperCase() ?? '?';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Button key={link.href} variant="ghost" asChild>
        <Link
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isMobile && 'w-full justify-start'
          )}
        >
          {link.label}
        </Link>
      </Button>
    ));

  const renderAuthAndCart = (isMobile = false) => (
    <>
      {isUserLoading ? (
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
                  src={user.photoURL ?? ''}
                  alt={user.displayName ?? ''}
                />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
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

      <Button variant="ghost" size="icon" asChild className="relative">
        <Link href="/cart">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
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
        isScrolled
          ? 'border-b bg-background/80 backdrop-blur-sm'
          : 'border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex-1 md:flex-none">
          <Link href="/" className="flex items-center justify-center md:justify-start">
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {renderNavLinks()}
          </nav>
          <div className="flex items-center justify-end space-x-2">
            {renderAuthAndCart()}
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-end">
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
                <div className="flex items-center justify-center mb-4 gap-2">
                  {renderAuthAndCart(true)}
                </div>
                <nav className="flex flex-col space-y-3">
                  {renderNavLinks(true)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
