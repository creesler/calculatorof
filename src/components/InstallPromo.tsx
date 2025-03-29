'use client'

import { FaWindows, FaApple, FaAndroid } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

// Separate tracking logic
const trackInstallation = (
  platform: 'windows' | 'ios' | 'android',
  status: 'attempted' | 'successful' | 'failed',
  error?: string
) => {
  if (typeof window === 'undefined') return

  try {
    const deviceInfo = {
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      platform: navigator.platform,
      vendor: navigator.vendor,
      browserName: navigator.userAgent.includes('Chrome') ? 'Chrome' :
                  navigator.userAgent.includes('Firefox') ? 'Firefox' :
                  navigator.userAgent.includes('Safari') ? 'Safari' :
                  navigator.userAgent.includes('Edge') ? 'Edge' : 'Unknown',
      browserVersion: navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/)?.[2] || 'Unknown'
    }

    const sessionStart = sessionStorage.getItem('sessionStart')
    const sessionDuration = sessionStart 
      ? Math.floor((Date.now() - parseInt(sessionStart)) / 1000)
      : 0

    const visits = parseInt(localStorage.getItem('visitCount') || '0')
    localStorage.setItem('visitCount', (visits + 1).toString())

    trackEvent('app_installation', {
      platform,
      status,
      error,
      deviceInfo,
      sessionDuration,
      previousVisits: visits
    })
  } catch (error) {
    console.error('Error tracking installation:', error)
  }
}

export default function InstallPromo() {
  const [platform, setPlatform] = useState<'windows' | 'ios' | 'android' | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Initialize session storage
    if (typeof window !== 'undefined' && !sessionStorage.getItem('sessionStart')) {
      sessionStorage.setItem('sessionStart', Date.now().toString())
    }

    // Detect platform
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent
      if (/iPad|iPhone|iPod/.test(userAgent) && 
          /WebKit/.test(userAgent) && 
          !/(CriOS|FxiOS|OPiOS|mercury)/.test(userAgent)) {
        setPlatform('ios')
      } else if (/Android/.test(userAgent)) {
        setPlatform('android')
      } else if (/Windows/.test(userAgent)) {
        setPlatform('windows')
      }
    }

    // Handle install prompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
  }, [])

  const handleInstall = async (targetPlatform: 'windows' | 'ios' | 'android') => {
    if (platform !== targetPlatform) {
      const message = targetPlatform === 'ios' 
        ? 'Please use an iOS device with Safari browser'
        : targetPlatform === 'android' 
        ? 'Please use an Android device'
        : 'Please use a Windows device'
      
      setAlertMessage(message)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    if (targetPlatform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install')
    } else if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
          setDeferredPrompt(null)
        }
      } catch (err) {
        console.error('Error showing install prompt:', err)
      }
    }
  }

  return (
    <div className="text-center mb-8 relative">
      <p className="text-gray-600 mb-4 text-lg">
        No need to open browser and type or search us.
        <br />
        Easily install our app in any of your device
      </p>
      <div className="flex justify-center gap-8 text-gray-600">
        <button 
          onClick={() => handleInstall('windows')}
          className="focus:outline-none"
        >
          <FaWindows className="h-10 w-10 hover:text-blue-600 transition-colors" />
        </button>
        <button 
          onClick={() => handleInstall('ios')}
          className="focus:outline-none"
        >
          <FaApple className="h-10 w-10 hover:text-black transition-colors" />
        </button>
        <button 
          onClick={() => handleInstall('android')}
          className="focus:outline-none"
        >
          <FaAndroid className="h-10 w-10 hover:text-green-600 transition-colors" />
        </button>
      </div>

      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {alertMessage}
        </div>
      )}
    </div>
  )
} 