'use client'

import Link from 'next/link'
import { FaArrowUp, FaHome, FaAndroid, FaApple, FaWindows } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [platform, setPlatform] = useState<'ios' | 'android' | 'windows' | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Simple platform detection
    const userAgent = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/Android/.test(userAgent)) {
      setPlatform('android');
    } else if (/Windows/.test(userAgent)) {
      setPlatform('windows');
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Store the event for later use
      setDeferredPrompt(e);
      // Show install button
      if (/Android/.test(navigator.userAgent)) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the prompt
      await deferredPrompt.prompt();
      // Wait for user choice
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const getInstallIcon = () => {
    switch (platform) {
      case 'ios': return <FaApple className="h-6 w-6" />;
      case 'android': return <FaAndroid className="h-6 w-6" />;
      case 'windows': return <FaWindows className="h-6 w-6" />;
      default: return null;
    }
  };

  return (
    <>
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

        {(platform && deferredPrompt) && (
          <button
            onClick={handleInstall}
            className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
            aria-label="Install app"
          >
            {getInstallIcon()}
          </button>
        )}
      </div>
    </>
  );
} 