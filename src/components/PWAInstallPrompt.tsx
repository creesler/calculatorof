'use client'

import { useEffect, useState, useCallback } from 'react'
import { FaDownload, FaTimes, FaWindows, FaApple, FaAndroid } from 'react-icons/fa'

type Platform = 'windows' | 'ios' | 'android'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [platform, setPlatform] = useState<Platform | null>(null)

  // Detect platform once on mount
  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      console.log('User Agent:', userAgent)
      
      if (/windows/.test(userAgent)) {
        console.log('Windows platform detected')
        return 'windows' as Platform
      } else if (/ipad|iphone|ipod/.test(userAgent)) {
        console.log('iOS platform detected')
        return 'ios' as Platform
      } else if (/android/.test(userAgent)) {
        console.log('Android platform detected')
        return 'android' as Platform
      }
      return null
    }

    const detectedPlatform = detectPlatform()
    setPlatform(detectedPlatform)
    
    // For iOS, show install button immediately
    if (detectedPlatform === 'ios') {
      console.log('Setting showInstallButton true for iOS')
      setShowInstallButton(true)
    }
  }, [])

  // Handle beforeinstallprompt event
  useEffect(() => {
    if (!platform || typeof window === 'undefined') return // Wait for platform detection and ensure we're in browser

    console.log('Setting up beforeinstallprompt handler for platform:', platform)

    // Check if already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
    console.log('Is app installed?', isAppInstalled)
    if (isAppInstalled) {
      console.log('App is already installed, not showing prompt')
      return
    }

    // Verify PWA requirements
    const checkPWARequirements = () => {
      const manifest = document.querySelector('link[rel="manifest"]')
      console.log('Manifest present:', !!manifest)
      
      const hasServiceWorker = 'serviceWorker' in navigator
      console.log('Service Worker supported:', hasServiceWorker)

      // Check for required icons using current origin
      const icons = ['icon-192x192.png', 'icon-512x512.png'].map(icon => 
        `${window.location.origin}/icons/${icon}`
      )
      icons.forEach(icon => {
        fetch(icon)
          .then(response => {
            console.log(`Icon ${icon} status:`, response.status)
          })
          .catch(error => {
            console.error(`Failed to fetch icon ${icon}:`, error)
          })
      })

      return manifest && hasServiceWorker
    }

    const meetsRequirements = checkPWARequirements()
    console.log('Meets PWA requirements:', meetsRequirements)

    const handler = (e: Event) => {
      console.log('beforeinstallprompt event captured')
      e.preventDefault()
      
      setDeferredPrompt(e)
      console.log('Deferred prompt stored')

      if (platform === 'android') {
        console.log('Showing install button for Android')
        setShowInstallButton(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    console.log('beforeinstallprompt listener added')

    // Clean up
    return () => {
      console.log('Cleaning up beforeinstallprompt listener')
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [platform]) // Only re-run when platform changes

  const handleInstall = async () => {
    console.log('Install button clicked', { platform, hasDeferredPrompt: !!deferredPrompt })

    if (platform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install')
      return
    }

    if (!deferredPrompt) {
      console.log('No installation prompt available')
      if (platform === 'android') {
        // Check PWA requirements again
        const manifest = document.querySelector('link[rel="manifest"]')
        const hasServiceWorker = 'serviceWorker' in navigator

        let message = 'Installation is not available right now.\n\nTroubleshooting:\n'
        if (!manifest) message += '- Web Manifest is missing\n'
        if (!hasServiceWorker) message += '- Service Worker is not supported\n'
        message += '\nPlease try:\n1. Refreshing the page\n2. Clearing site data\n3. Checking your internet connection'
        
        alert(message)
      }
      return
    }

    try {
      console.log('Triggering install prompt')
      await deferredPrompt.prompt()
      
      console.log('Awaiting user choice')
      const { outcome } = await deferredPrompt.userChoice
      
      console.log('Installation outcome:', outcome)
      if (outcome === 'accepted') {
        setShowInstallButton(false)
        setDeferredPrompt(null)
        
        // Track successful installation
        try {
          await fetch('/api/track-install', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform })
          })
          console.log('Installation tracked successfully')
        } catch (error) {
          console.error('Failed to track installation:', error)
        }
      } else {
        console.log('User declined installation')
      }
    } catch (err) {
      console.error('Error installing PWA:', err)
      alert('There was an error installing the app. Please try:\n1. Refreshing the page\n2. Clearing site data\n3. Checking your internet connection')
    }
  }

  // Early return if conditions aren't met
  if (!platform || !showInstallButton) {
    console.log('Not showing install button', { platform, showInstallButton })
    return null
  }

  console.log('Rendering install button for platform:', platform)

  return (
    <>
      {/* Main Install Popup */}
      <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 w-[90%] max-w-sm border border-gray-200 animate-slide-down">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {platform === 'windows' && <FaWindows className="h-6 w-6 text-blue-600" />}
            {platform === 'ios' && <FaApple className="h-6 w-6 text-black" />}
            {platform === 'android' && <FaAndroid className="h-6 w-6 text-green-600" />}
            <div>
              <h3 className="text-lg font-semibold">
                {platform === 'ios' ? 'Add to Home Screen' : 'Install App'}
              </h3>
              <p className="text-gray-600 text-sm">
                Quick access to all calculators
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              console.log('Close button clicked')
              setShowInstallButton(false)
            }}
            className="text-gray-400 hover:text-gray-600 p-1 -mt-1 -mr-1"
            aria-label="Close"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleInstall}
            className={`px-4 py-2 rounded-lg ${
              platform === 'windows' ? 'bg-blue-600 hover:bg-blue-700' :
              platform === 'ios' ? 'bg-black hover:bg-gray-800' :
              'bg-green-600 hover:bg-green-700'
            } text-white transition-colors`}
          >
            {platform === 'ios' ? 'Add to Home Screen' : 'Install App'}
          </button>
        </div>
      </div>
    </>
  )
}