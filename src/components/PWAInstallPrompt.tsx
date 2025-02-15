'use client'

import { useEffect, useState } from 'react'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
    if (isAppInstalled) {
      console.log('App is already installed')
      return
    }

    const handler = (e: Event) => {
      console.log('beforeinstallprompt fired')
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install button
      setShowInstallButton(true)
    }

    // Check if PWA criteria are met
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported')
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log('Service Worker registration:', registration)
      })
    }

    // Check if manifest is loaded
    const manifestLink = document.querySelector('link[rel="manifest"]')
    console.log('Manifest link found:', manifestLink !== null)

    window.addEventListener('beforeinstallprompt', handler)
    
    // Log when app is installed
    window.addEventListener('appinstalled', (e) => {
      console.log('PWA was installed')
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No deferred prompt available')
      return
    }

    console.log('Showing install prompt')
    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)

    // Clear the deferredPrompt variable
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:w-96 border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Install Calculator Suite</h3>
          <p className="text-gray-600 text-sm mt-1">
            Install our app for quick access to all calculators
          </p>
        </div>
        <button
          onClick={handleInstallClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Install
        </button>
      </div>
    </div>
  )
} 