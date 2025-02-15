'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowUp, FaHome, FaWindows, FaApple, FaAndroid } from 'react-icons/fa'

export default function FloatingButtons() {
  const [platform, setPlatform] = useState<'windows' | 'ios' | 'android' | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

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

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

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
        setDeferredPrompt(null)
      }
    } catch (err) {
      console.error('Error installing PWA:', err)
    }
  }

  const getInstallButton = () => {
    if (!platform) return null

    const iconProps = {
      className: "h-6 w-6",
      onClick: handleInstall,
      role: "button",
      tabIndex: 0,
      "aria-label": "Install app"
    }

    switch (platform) {
      case 'windows':
        return (
          <button
            className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            {...iconProps}
          >
            <FaWindows />
          </button>
        )
      case 'ios':
        return (
          <button
            className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            {...iconProps}
          >
            <FaApple />
          </button>
        )
      case 'android':
        return (
          <button
            className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:bg-green-50 transition-colors"
            {...iconProps}
          >
            <FaAndroid />
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Go to top"
      >
        <FaArrowUp className="h-6 w-6" />
      </button>
      
      <Link 
        href="/"
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Go to home"
      >
        <FaHome className="h-6 w-6" />
      </Link>

      {getInstallButton()}
    </div>
  )
} 