'use client'

import Link from 'next/link'
import { FaArrowUp, FaHome, FaAndroid, FaApple, FaWindows } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [platform, setPlatform] = useState<'ios' | 'android' | 'windows' | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Check platform
    const userAgent = navigator.userAgent;
    
    if (/iPad|iPhone|iPod/.test(userAgent) && 
        /WebKit/.test(userAgent) && 
        !/(CriOS|FxiOS|OPiOS|mercury)/.test(userAgent)) {
      console.log('Platform: iOS Safari');
      setPlatform('ios');
    } else if (/Android/.test(userAgent)) {
      console.log('Platform: Android');
      setPlatform('android');
    } else if (/Windows/.test(userAgent)) {
      console.log('Platform: Windows');
      setPlatform('windows');
    }

    // Listen for install prompt (works on Android and Windows)
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('Install prompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleInstall = async () => {
    if (platform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install')
    } else if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    }
    setShowInstallPrompt(false)
  }

  const getInstallIcon = () => {
    switch (platform) {
      case 'ios':
        return <FaApple className="h-6 w-6" />;
      case 'android':
        return <FaAndroid className="h-6 w-6" />;
      case 'windows':
        return <FaWindows className="h-6 w-6" />;
      default:
        return null;
    }
  }

  return (
    <>
      {/* Install Prompt at Top Left */}
      {platform && (platform === 'ios' || deferredPrompt) && showInstallPrompt && (
        <div className="fixed top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-50 w-80 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Install Calculator Suite</h3>
              <p className="text-gray-600 text-sm mt-1">
                Install our app for quick access to all calculators
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <button
          onClick={scrollToTop}
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

        {/* Install Icon Button */}
        {platform && (platform === 'ios' || deferredPrompt) && (
          <button
            onClick={() => setShowInstallPrompt(true)}
            className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
            aria-label="Install app"
          >
            {getInstallIcon()}
          </button>
        )}
      </div>
    </>
  )
} 