import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let response = NextResponse.next();

  // Handle canonical URL redirects
  if (
    url.protocol === 'http:' || // Redirect HTTP to HTTPS
    url.host.startsWith('www.') // Redirect www to non-www
  ) {
    const newUrl = new URL(url.pathname + url.search, `https://calculatorof.com`);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Check if the request is for admin routes
  if (url.pathname.startsWith('/admin') || 
      url.pathname.startsWith('/api/create-calculator')) {
    
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true';
    
    // If not authenticated and not trying to authenticate
    if (!isAuthenticated && url.pathname !== '/admin/login') {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/admin/:path*',
    '/api/create-calculator'
  ]
}; 