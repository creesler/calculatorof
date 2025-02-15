import { GoogleAnalytics } from '@analytics/google-analytics4'

// Replace with your GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export const analytics = new GoogleAnalytics({
  measurementId: GA_MEASUREMENT_ID,
})

// Helper function for tracking events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  analytics.track(eventName, params)
} 