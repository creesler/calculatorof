import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
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
  matcher: ['/admin/:path*', '/api/create-calculator']
}; 