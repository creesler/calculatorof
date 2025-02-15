'use client'

import { FaWindows, FaApple, FaAndroid } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

// Helper functions for browser detection
function getBrowserName() {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

function getBrowserVersion() {
  const userAgent = navigator.userAgent
  const match = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/)
  return match ? match[2] : 'Unknown'
}

export default function InstallPromo() {
  const [platform, setPlatform] = useState<'windows' | 'ios' | 'android' | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('sessionStart')) {
      sessionStorage.setItem('sessionStart', Date.now().toString())
    }
  }, [])

  const trackInstall = async (
    platform: 'windows' | 'ios' | 'android',
    status: 'attempted' | 'successful' | 'failed',
    error?: string
  ) => {
    try {
      // Get detailed device information
      const deviceInfo = {
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        platform: navigator.platform,
        vendor: navigator.vendor,
        browserName: getBrowserName(),
        browserVersion: getBrowserVersion()
      }

      // Calculate session duration
      const sessionStart = sessionStorage.getItem('sessionStart')
      const sessionDuration = sessionStart 
        ? Math.floor((Date.now() - parseInt(sessionStart)) / 1000)
        : 0

      // Track previous visits
      const visits = parseInt(localStorage.getItem('visitCount') || '0')
      localStorage.setItem('visitCount', (visits + 1).toString())

      // Track in GA4
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

  useEffect(() => {
    // Check platform
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent) && 
        /WebKit/.test(userAgent) && 
        !/(CriOS|FxiOS|OPiOS|mercury)/.test(userAgent)) {
      setPlatform('ios');
    } else if (/Android/.test(userAgent)) {
      setPlatform('android');
    } else if (/Windows/.test(userAgent)) {
      setPlatform('windows');
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async (targetPlatform: 'windows' | 'ios' | 'android') => {
    // Track attempt
    trackInstall(targetPlatform, 'attempted');

    if (platform !== targetPlatform) {
      setAlertMessage(
        targetPlatform === 'ios' ? 'Please use an iOS device with Safari browser' :
        targetPlatform === 'android' ? 'Please use an Android device' :
        'Please use a Windows device'
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      // Track failed attempt due to wrong platform
      trackInstall(targetPlatform, 'failed', 'Wrong platform');
      return;
    }

    if (targetPlatform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install');
      // Track iOS instruction shown
      trackInstall('ios', 'attempted', 'Instructions shown');
    } else if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          // Track successful installation
          trackInstall(targetPlatform, 'successful');
        } else {
          // Track declined installation
          trackInstall(targetPlatform, 'failed', 'User declined');
        }
      } catch (error) {
        console.error('Error showing install prompt:', error);
        // Track error
        trackInstall(targetPlatform, 'failed', error.message);
      }
    }
  };

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

      {/* Alert Message */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {alertMessage}
        </div>
      )}
    </div>
  )
} 