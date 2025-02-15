import { NextResponse } from 'next/server'

interface InstallationData {
  platform: 'windows' | 'ios' | 'android'
  status: 'attempted' | 'successful' | 'failed'
  error?: string
  timestamp: string
  userAgent: string
  deviceInfo: {
    screenSize: string
    language: string
    platform: string
    vendor: string
    browserName: string
    browserVersion: string
  }
  referrer: string
  previousVisits: number
  sessionDuration: number
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Log to console for development
    console.log('Installation tracked:', {
      ...data,
      timestamp: new Date(data.timestamp).toLocaleString(),
      trackingId: Math.random().toString(36).substring(7)
    })
    
    // Here you could send to multiple analytics services
    await Promise.all([
      // Track page view duration
      trackSessionDuration(data.sessionDuration),
      // Track user return rate
      trackReturnRate(data.previousVisits),
      // Track device compatibility
      trackDeviceCompatibility(data.deviceInfo),
      // Track installation funnel
      trackInstallationFunnel(data)
    ])

    return NextResponse.json({ 
      success: true,
      trackingId: Math.random().toString(36).substring(7)
    })
  } catch (err) {
    console.error('Error tracking installation:', err)
    return NextResponse.json(
      { 
        error: 'Failed to track installation',
        details: err instanceof Error ? err.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

// Analytics helper functions
async function trackSessionDuration(duration: number) {
  // Track how long users spend on site before installing
  console.log(`Session duration before install: ${duration}s`)
}

async function trackReturnRate(visits: number) {
  // Track if users install on first visit or return later
  console.log(`User visits before install: ${visits}`)
}

async function trackDeviceCompatibility(deviceInfo: InstallationData['deviceInfo']) {
  // Track which devices/browsers are most compatible
  console.log('Device compatibility:', deviceInfo)
}

async function trackInstallationFunnel(data: InstallationData) {
  // Track the full installation funnel
  console.log('Installation funnel:', {
    stage1_clicked: true,
    stage2_promptShown: data.status !== 'failed',
    stage3_accepted: data.status === 'successful',
    platform: data.platform,
    errorType: data.error || 'none'
  })
} 