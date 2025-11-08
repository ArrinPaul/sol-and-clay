import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Artisanal home décor that brings warmth, soul, and modern elegance into your space.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-headline text-sm font-semibold tracking-wider text-foreground">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/collections" className="text-sm text-muted-foreground hover:text-primary">Collections</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/collaborate" className="text-sm text-muted-foreground hover:text-primary">Collaborate</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-headline text-sm font-semibold tracking-wider text-foreground">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-headline text-sm font-semibold tracking-wider text-foreground">Join our newsletter</h3>
            <p className="mt-2 text-sm text-muted-foreground">Receive updates on new collections and special offers.</p>
            <form className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Your email address" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Sol & Clay. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
