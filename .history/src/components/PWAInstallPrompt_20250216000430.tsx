'use client'

import { useEffect, useState } from 'react'
import { FaDownload, FaTimes } from 'react-icons/fa'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
    if (isAppInstalled) {
      console.log('App is already installed')
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
      // Show floating button after 5 seconds if popup is dismissed
      setTimeout(() => {
        setShowFloatingButton(true)
      }, 5000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    
    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false)
      setShowFloatingButton(false)
      setDeferredPrompt(null)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response: ${outcome}`)
      
      if (outcome === 'accepted') {
        setShowInstallButton(false)
        setShowFloatingButton(false)
        setDeferredPrompt(null)
      }
    } catch (err) {
      console.error('Error installing PWA:', err)
    }
  }

  if (!showInstallButton && !showFloatingButton) return null

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