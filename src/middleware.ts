import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/login(.*)',
  '/signup(.*)',
  '/forgot-password(.*)',
  '/',
  '/about',
  '/contact',
  '/faq',
  '/collections(.*)',
  '/products(.*)',
  '/shipping',
  '/api/webhooks/(.*)',
]);

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/cart',
  '/checkout(.*)',
  '/collaborate',
  '/admin(.*)',
  '/profile',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const { pathname, search } = request.nextUrl;

  // If accessing a protected route without authentication
  if (isProtectedRoute(request) && !userId) {
    // Store the original URL (with query params) to redirect back after login
    const fullPath = pathname + search;
    const signInUrl = new URL('/login', request.url);
    signInUrl.searchParams.set('redirect_url', fullPath);
    return NextResponse.redirect(signInUrl);
  }

  // No need to call auth.protect() here - we already checked userId above
  // This prevents double authentication checks
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
