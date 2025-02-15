'use client'

import { useEffect, useState } from 'react'
import { FaDownload, FaTimes, FaWindows, FaApple, FaAndroid } from 'react-icons/fa'

type Platform = 'windows' | 'ios' | 'android'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [platform, setPlatform] = useState<Platform | null>(null)

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase()
    if (/windows/.test(userAgent)) {
      setPlatform('windows')
    } else if (/ipad|iphone|ipod/.test(userAgent) && !window.MSStream) {
      setPlatform('ios')
    } else if (/android/.test(userAgent)) {
      setPlatform('android')
    }

    // Check if already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
    if (isAppInstalled) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    
    // For iOS Safari
    if (platform === 'ios') {
      setShowInstallButton(true)
    }

    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false)
      setDeferredPrompt(null)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [platform])

  const handleInstall = async () => {
    if (platform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install')
      return
    }

    if (!deferredPrompt) return

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowInstallButton(false)
        setDeferredPrompt(null)
      }
    } catch (err) {
      console.error('Error installing PWA:', err)
    }
  }

  if (!platform || !showInstallButton) return null

  const getIcon = () => {
    switch (platform) {
      case 'windows':
        return <FaWindows className="h-6 w-6" />
      case 'ios':
        return <FaApple className="h-6 w-6" />
      case 'android':
        return <FaAndroid className="h-6 w-6" />
      default:
        return <FaDownload className="h-6 w-6" />
    }
  }

  const getButtonColor = () => {
    switch (platform) {
      case 'windows':
        return 'text-blue-600 hover:bg-blue-50'
      case 'ios':
        return 'text-black hover:bg-gray-50'
      case 'android':
        return 'text-green-600 hover:bg-green-50'
      default:
        return 'text-blue-600 hover:bg-blue-50'
    }
  }

  return (
    <>
      {/* Main Install Popup - Now in top right */}
      {showInstallButton && (
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
      )}
    </>
  )
} 