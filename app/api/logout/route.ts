import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const headersList = headers();
  const hostname = headersList.get('host') || '';
  const response = NextResponse.json({ success: true });
  
  // Cookie options that match the auth route
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 0, // Expire immediately
    path: '/',
    // Only set domain for the main domain, not for preview URLs
    ...(hostname === 'calculatorof.com' ? { domain: '.calculatorof.com' } : {})
  };

  // Clear the authentication cookie
  response.cookies.set('admin_authenticated', '', cookieOptions);
  
  return response;
} 