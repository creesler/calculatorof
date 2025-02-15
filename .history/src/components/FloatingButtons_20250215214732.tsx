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
    console.log('Current userAgent:', userAgent);
    
    if (/iPad|iPhone|iPod/.test(userAgent) && 
        /WebKit/.test(userAgent) && 
        !/(CriOS|FxiOS|OPiOS|mercury)/.test(userAgent)) {
      console.log('Platform detected: iOS Safari');
      setPlatform('ios');
    } else if (/Android/.test(userAgent)) {
      console.log('Platform detected: Android');
      setPlatform('android');
    } else if (/Windows/.test(userAgent)) {
      console.log('Platform detected: Windows');
      setPlatform('windows');
      // Show prompt immediately for Windows
      setShowInstallPrompt(true);
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('Install prompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt immediately when it's available
      setShowInstallPrompt(true);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleInstall = async () => {
    console.log('Handle install clicked');
    if (platform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install')
    } else if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install prompt outcome:', outcome);
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      } catch (error) {
        console.error('Error showing install prompt:', error);
      }
    }
    setShowInstallPrompt(false);
  }

  const handleInstallClick = () => {
    console.log('Install icon clicked');
    console.log('Current platform:', platform);
    console.log('Has deferred prompt:', !!deferredPrompt);
    setShowInstallPrompt(true);
  };

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
      {/* Install Prompt */}
      {platform && (platform === 'ios' || deferredPrompt) && showInstallPrompt && (
        <div className="fixed bottom-10 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:w-96 border border-gray-200">
          {/* Close button */}
          <button
            onClick={() => setShowInstallPrompt(false)}
            className="absolute -top-2 -right-2 bg-gray-100 text-gray-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close install prompt"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Install Calculator Suite</h3>
              <p className="text-gray-600 text-sm mt-1">
                Install our app for quick access to all calculators
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-4"
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
            onClick={handleInstallClick}
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