'use client'

import { useEffect, useState } from 'react'
import { FaDownload, FaTimes } from 'react-icons/fa'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
    if (isAppInstalled) return

    // Check if device/browser supports installation
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    
    // Device-specific checks
    const canInstall = (
      isIOS && isSafari || // iOS device using Safari
      /android/i.test(navigator.userAgent) || // Android device
      'serviceWorker' in navigator // Modern browser that supports PWA
    ) && !isInStandaloneMode // Not already installed

    setIsInstallable(canInstall)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
      if (canInstall) {
        // Show floating button immediately for iOS/Safari
        if (isIOS && isSafari) {
          setShowFloatingButton(true)
        } else {
          // Show floating button after popup is dismissed for others
          setTimeout(() => {
            setShowFloatingButton(true)
          }, 5000)
        }
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    
    // Handle iOS "Add to Home Screen" case
    if (isIOS && isSafari && !isInStandaloneMode) {
      setShowFloatingButton(true)
    }

    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false)
      setShowFloatingButton(false)
      setDeferredPrompt(null)
      setIsInstallable(false)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    // Handle iOS Safari case
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    
    if (isIOS && isSafari) {
      alert('Tap the share button at the bottom of the screen, then tap "Add to Home Screen"')
      return
    }

    if (!deferredPrompt) return

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setShowInstallButton(false)
        setShowFloatingButton(false)
        setDeferredPrompt(null)
      }
    } catch (err) {
      console.error('Error installing PWA:', err)
    }
  }

  if (!isInstallable || (!showInstallButton && !showFloatingButton)) return null

  return (
    <>
      {/* Main Install Popup */}
      {showInstallButton && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-50 w-[90%] max-w-md border border-gray-200 animate-slide-down">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <FaDownload className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Install Calculator Suite</h3>
                <p className="text-gray-600 text-sm">
                  Install our app for quick access to all calculators
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInstallButton(false)}
              className="text-gray-400 hover:text-gray-600 p-1 -mt-1 -mr-1"
              aria-label="Close"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleInstall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Install Now
            </button>
          </div>
        </div>
      )}

      {/* Floating Install Button */}
      {showFloatingButton && !showInstallButton && (
        <button
          onClick={handleInstall}
          className="fixed bottom-24 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 animate-bounce"
          aria-label="Install app"
        >
          <FaDownload className="h-6 w-6" />
        </button>
      )}
    </>
  )
} 