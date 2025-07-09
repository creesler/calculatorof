import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const isWWW = hostname.startsWith('www.');
  const isHTTPS = request.headers.get('x-forwarded-proto') === 'https';

  // Handle www to non-www and HTTP to HTTPS redirects
  if (isWWW || !isHTTPS) {
    const newHostname = isWWW ? hostname.replace('www.', '') : hostname;
    return NextResponse.redirect(
      `https://${newHostname}${url.pathname}${url.search}`,
      { status: 301 }
    );
  }

  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/create-calculator')) {
    
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    
    // If not authenticated and not trying to authenticate
    if (!isAuthenticated && request.nextUrl.pathname !== '/admin/login') {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    '/admin/:path*',
    '/api/create-calculator'
  ]
}; 