import { authMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
const isPublicRoute = createRouteMatcher(['/login(.*)', '/signup(.*)', '/']);
 
export default authMiddleware({
  publicRoutes: (req) => isPublicRoute(req),
  afterAuth(auth, req) {
    if (auth.userId && isPublicRoute(req)) {
      const url = new URL(req.nextUrl.origin);
      url.pathname = '/';
      return Response.redirect(url);
    }
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
