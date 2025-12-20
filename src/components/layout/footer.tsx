import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Instagram } from 'lucide-react';

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.05-.96-.01-2.12.22-3.18l1.57-6.64s-.4-.8-.4-1.98c0-1.86 1.08-3.24 2.42-3.24 1.14 0 1.69.86 1.69 1.88 0 1.15-.73 2.86-1.11 4.45-.31 1.32.66 2.4 1.96 2.4 2.35 0 3.93-3.02 3.93-6.59 0-2.72-1.83-4.76-5.15-4.76-3.76 0-6.07 2.8-6.07 5.92 0 1.08.32 1.84.82 2.42.23.27.26.38.18.69-.06.23-.2.8-.26 1.02-.08.32-.34.44-.63.32-1.75-.71-2.56-2.62-2.56-4.76 0-3.54 2.98-7.8 8.88-7.8 4.74 0 7.86 3.44 7.86 7.15 0 4.91-2.73 8.59-6.75 8.59-1.36 0-2.63-.73-3.07-1.56l-.89 3.51c-.28 1.11-.86 2.18-1.41 3 1.26.38 2.6.58 3.99.58A12 12 0 1 0 12 0z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-brown-darkest text-cream border-t border-gold-luxury/20">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="md:col-span-2 space-y-6">
            <Logo className="text-cream text-3xl" />
            <p className="text-beige-warm max-w-md leading-relaxed">
              Where craft meets elegance. Discover handcrafted ceramics that transform everyday moments into mindful rituals. Each piece tells a story of artistry, heritage, and timeless design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gold-luxury mb-6 uppercase tracking-wider">
              Explore
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link href="/collections" className="text-sm text-beige-warm hover:text-gold-luxury transition-colors">
                Collections
              </Link>
              <Link href="/about" className="text-sm text-beige-warm hover:text-gold-luxury transition-colors">
                Our Story
              </Link>
              <Link href="/collaborate" className="text-sm text-beige-warm hover:text-gold-luxury transition-colors">
                Collaborate
              </Link>
              <Link href="/contact" className="text-sm text-beige-warm hover:text-gold-luxury transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gold-luxury mb-6 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-4 mb-6">
              <Link
                href="#"
                className="text-beige-warm hover:text-gold-luxury transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href="#"
                className="text-beige-warm hover:text-gold-luxury transition-colors group"
                aria-label="Pinterest"
              >
                <PinterestIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            <Link href="/contact" className="inline-block text-sm text-beige-warm hover:text-gold-luxury transition-colors">
              hello@solandclay.com
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold-luxury/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-beige-warm">
              © {new Date().getFullYear()} Sol & Clay. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/shipping" className="text-sm text-beige-warm hover:text-gold-luxury transition-colors">
                Shipping Policy
              </Link>
              <Link href="/faq" className="text-sm text-beige-warm hover:text-gold-luxury transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
