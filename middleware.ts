import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname and hostname
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';

  // Always allow access to the login page to prevent redirect loops
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if the request is for protected routes (admin or protected API routes)
  if (pathname.startsWith('/admin') || pathname === '/api/create-calculator') {
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    
    // If not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated) {
      // Construct login URL using the same protocol and host as the request
      const protocol = request.nextUrl.protocol;
      const loginUrl = new URL('/admin/login', `${protocol}//${hostname}`);
      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow all other routes to pass through
  return NextResponse.next();
}

// Define specific paths that need middleware processing
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/create-calculator'
  ]
}; 