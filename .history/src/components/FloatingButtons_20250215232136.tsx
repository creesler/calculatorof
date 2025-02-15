'use client'

import Link from 'next/link'
import { FaArrowUp, FaHome, FaAndroid, FaApple, FaWindows } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function FloatingButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [platform, setPlatform] = useState<'ios' | 'android' | 'windows' | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const hasCheckedPWA = useRef(false)

  useEffect(() => {
    if (hasCheckedPWA.current) return;
    hasCheckedPWA.current = true;

    const initializePWA = async () => {
      try {
        const userAgent = navigator.userAgent;
        
        if (/iPad|iPhone|iPod/.test(userAgent) && 
            /WebKit/.test(userAgent) && 
            !/(CriOS|FxiOS|OPiOS|mercury)/.test(userAgent)) {
          setPlatform('ios');
        } else if (/Android/.test(userAgent)) {
          setPlatform('android');
        } else if (/Windows/.test(userAgent)) {
          setPlatform('windows');
        }

        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setShowInstallPrompt(true);
        });

        window.addEventListener('appinstalled', () => {
          setDeferredPrompt(null);
        });

      } catch (error) {
        console.error('PWA initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializePWA();
  }, []);

  const handleInstall = async () => {
    if (platform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install');
    } else if (deferredPrompt && platform) {
      try {
        trackInstall(platform, 'attempted');
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          trackInstall(platform, 'successful');
          setDeferredPrompt(null);
        } else {
          trackInstall(platform, 'failed', 'User declined');
        }
      } catch (error) {
        console.error('Error showing install prompt:', error);
        if (platform) {
          trackInstall(platform, 'failed', error instanceof Error ? error.message : 'Unknown error');
        }
      }
    }
    setShowInstallPrompt(false);
  };

  const handleInstallClick = () => {
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
  };

  const trackInstall = async (
    platform: 'windows' | 'ios' | 'android',
    status: 'attempted' | 'successful' | 'failed',
    error?: string
  ) => {
    try {
      const deviceInfo = {
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        platform: navigator.platform,
        vendor: navigator.vendor
      };

      const sessionStart = sessionStorage.getItem('sessionStart');
      const sessionDuration = sessionStart 
        ? Math.floor((Date.now() - parseInt(sessionStart)) / 1000)
        : 0;

      const visits = parseInt(localStorage.getItem('visitCount') || '0');

      trackEvent('app_installation', {
        platform,
        status,
        error,
        device_info: deviceInfo,
        session_duration: sessionDuration,
        previous_visits: visits
      });
    } catch (error) {
      console.error('Error tracking installation:', error);
    }
  };

  return (
    <>
      {showInstallPrompt && isInitialized && (
        <div className="fixed top-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:w-96 border border-gray-200 slide-in">
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

        {platform && isInitialized && (
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
  );
} 