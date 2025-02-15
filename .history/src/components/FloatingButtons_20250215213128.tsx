'use client'

import Link from 'next/link'
import { FaArrowUp, FaHome, FaAndroid, FaApple } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if it's iOS Safari
    const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                       /WebKit/.test(navigator.userAgent) &&
                       !/(CriOS|FxiOS|OPiOS|mercury)/.test(navigator.userAgent);
    
    console.log('Is iOS Safari:', isIOSSafari);
    setIsIOS(isIOSSafari);

    // Listen for install prompt on Android
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
    if (isIOS) {
      // For iOS, we can only show a hint to use "Add to Home Screen"
      alert('Tap the share button and then "Add to Home Screen" to install')
    } else if (deferredPrompt) {
      // For Android, trigger the native install prompt
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    }
  }

  return (
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

      {/* Always show on iOS Safari, show on Android when installable */}
      {(isIOS || deferredPrompt) && (
        <button
          onClick={handleInstall}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          aria-label="Install app"
        >
          {isIOS ? <FaApple className="h-6 w-6" /> : <FaAndroid className="h-6 w-6" />}
        </button>
      )}
    </div>
  )
} 