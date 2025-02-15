import { NextResponse } from 'next/server'

interface InstallTrackingData {
  platform: 'windows' | 'ios' | 'android';
  status: 'attempted' | 'successful' | 'failed';
  email?: string;
  timestamp: string;
  userAgent: string;
  screenSize: string;
  language: string;
  referrer: string;
  timeZone: string;
  error?: string;
  timeSpent?: number;
  previousVisits?: number;
}

export async function POST(request: Request) {
  try {
    const data: InstallTrackingData = await request.json()
    
    // Log to console for development
    console.log('Installation tracked:', data)
    
    // Here you could:
    // 1. Save to a database
    // await prisma.installationTrack.create({ data })
    
    // 2. Send to email service (if email provided)
    if (data.email) {
      // await sendWelcomeEmail(data.email, data.platform)
    }
    
    // 3. Send to analytics service
    // await sendToAnalytics(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking installation:', error)
    return NextResponse.json(
      { error: 'Failed to track installation' },
      { status: 500 }
    )
  }
} 