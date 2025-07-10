import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Only handle admin routes
  if (!pathname.startsWith('/admin') && pathname !== '/api/create-calculator') {
    return NextResponse.next();
  }

  // Always allow access to the login page to prevent redirect loops
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
  if (!isAuthenticated) {
    // Redirect to login while preserving the original path
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define specific paths that need middleware processing
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/create-calculator'
  ]
}; 