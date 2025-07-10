import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Always allow access to the login page to prevent redirect loops
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if the request is for protected routes (admin or protected API routes)
  if (pathname.startsWith('/admin') || pathname === '/api/create-calculator') {
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    
    // If not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
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