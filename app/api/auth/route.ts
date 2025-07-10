import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true });
      
      // Get the request URL to determine the domain
      const requestUrl = new URL(request.url);
      const domain = requestUrl.hostname;
      
      // Set domain only for production domain, not for preview URLs
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 60 * 60 * 24, // 24 hours
        // Only set domain for the main domain, not for preview URLs
        ...(domain === 'calculatorof.com' ? { domain: '.calculatorof.com' } : {})
      };

      response.cookies.set('admin_authenticated', 'true', cookieOptions);
      return response;
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 