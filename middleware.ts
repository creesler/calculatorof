import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Prevent redirect loops by checking if we're already on the login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/create-calculator')) {
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      // Add the original URL as a redirect parameter
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/create-calculator']
}; 