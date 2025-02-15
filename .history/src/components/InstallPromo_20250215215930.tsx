'use client'

import { FaWindows, FaApple, FaAndroid } from 'react-icons/fa'
import { useState, useEffect } from 'react'

// Track installation attempts and successes
const trackInstall = async (
  platform: 'windows' | 'ios' | 'android',
  status: 'attempted' | 'successful' | 'failed',
  error?: string
) => {
  try {
    // You can replace this with your actual analytics endpoint
    const response = await fetch('/api/track-install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform,
        status,
        error,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    });
    
    console.log(`Installation ${status} on ${platform}`);
  } catch (error) {
    console.error('Error tracking installation:', error);
  }
};

export default function InstallPromo() {
  const [platform, setPlatform] = useState<'windows' | 'ios' | 'android' | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    // Check platform
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

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async (targetPlatform: 'windows' | 'ios' | 'android') => {
    // Track attempt
    trackInstall(targetPlatform, 'attempted');

    if (platform !== targetPlatform) {
      setAlertMessage(
        targetPlatform === 'ios' ? 'Please use an iOS device with Safari browser' :
        targetPlatform === 'android' ? 'Please use an Android device' :
        'Please use a Windows device'
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      // Track failed attempt due to wrong platform
      trackInstall(targetPlatform, 'failed', 'Wrong platform');
      return;
    }

    if (targetPlatform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install');
      // Track iOS instruction shown
      trackInstall('ios', 'attempted', 'Instructions shown');
    } else if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          // Track successful installation
          trackInstall(targetPlatform, 'successful');
        } else {
          // Track declined installation
          trackInstall(targetPlatform, 'failed', 'User declined');
        }
      } catch (error) {
        console.error('Error showing install prompt:', error);
        // Track error
        trackInstall(targetPlatform, 'failed', error.message);
      }
    }
  };

  return (
    <div className="text-center mb-8 relative">
      <p className="text-gray-600 mb-4 text-lg">
        No need to open browser and type or search us.
        <br />
        Easily install our app in any of your device
      </p>
      <div className="flex justify-center gap-8 text-gray-600">
        <button 
          onClick={() => handleInstall('windows')}
          className="focus:outline-none"
        >
          <FaWindows className="h-10 w-10 hover:text-blue-600 transition-colors" />
        </button>
        <button 
          onClick={() => handleInstall('ios')}
          className="focus:outline-none"
        >
          <FaApple className="h-10 w-10 hover:text-black transition-colors" />
        </button>
        <button 
          onClick={() => handleInstall('android')}
          className="focus:outline-none"
        >
          <FaAndroid className="h-10 w-10 hover:text-green-600 transition-colors" />
        </button>
      </div>

      {/* Alert Message */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {alertMessage}
        </div>
      )}
    </div>
  )
} 