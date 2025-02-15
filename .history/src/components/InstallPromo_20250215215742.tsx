'use client'

import { FaWindows, FaApple, FaAndroid } from 'react-icons/fa'
import { useState, useEffect } from 'react'

// Enhanced tracking function
const trackInstall = async (
  platform: 'windows' | 'ios' | 'android',
  status: 'attempted' | 'successful' | 'failed',
  email?: string,
  additionalData?: {
    error?: string;
    screenSize?: string;
    language?: string;
    timeSpent?: number;
    previousVisits?: number;
  }
) => {
  try {
    const response = await fetch('/api/track-install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform,
        status,
        email,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        referrer: document.referrer,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...additionalData,
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
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [startTime] = useState(Date.now())

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await handleInstall(platform!, email);
      setShowEmailForm(false);
    }
  };

  const handleInstallClick = (targetPlatform: 'windows' | 'ios' | 'android') => {
    // Show email form before installation
    if (platform === targetPlatform) {
      setShowEmailForm(true);
    } else {
      handleInstall(targetPlatform);
    }
  };

  const handleInstall = async (targetPlatform: 'windows' | 'ios' | 'android', userEmail?: string) => {
    const timeSpent = (Date.now() - startTime) / 1000; // Time spent in seconds
    const previousVisits = parseInt(localStorage.getItem('visitCount') || '0');
    localStorage.setItem('visitCount', (previousVisits + 1).toString());

    // Track attempt with enhanced data
    trackInstall(targetPlatform, 'attempted', userEmail, {
      timeSpent,
      previousVisits,
    });

    if (platform !== targetPlatform) {
      setAlertMessage(
        targetPlatform === 'ios' ? 'Please use an iOS device with Safari browser' :
        targetPlatform === 'android' ? 'Please use an Android device' :
        'Please use a Windows device'
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      trackInstall(targetPlatform, 'failed', userEmail, {
        error: 'Wrong platform',
        timeSpent,
        previousVisits,
      });
      return;
    }

    if (targetPlatform === 'ios') {
      alert('Tap the share button and then "Add to Home Screen" to install');
      trackInstall('ios', 'attempted', userEmail, {
        error: 'Instructions shown',
        timeSpent,
        previousVisits,
      });
    } else if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          trackInstall(targetPlatform, 'successful', userEmail, {
            timeSpent,
            previousVisits,
          });
        } else {
          trackInstall(targetPlatform, 'failed', userEmail, {
            error: 'User declined',
            timeSpent,
            previousVisits,
          });
        }
      } catch (error) {
        console.error('Error showing install prompt:', error);
        trackInstall(targetPlatform, 'failed', userEmail, {
          error: error.message,
          timeSpent,
          previousVisits,
        });
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
          onClick={() => handleInstallClick('windows')}
          className="focus:outline-none"
        >
          <FaWindows className="h-10 w-10 hover:text-blue-600 transition-colors" />
        </button>
        <button 
          onClick={() => handleInstallClick('ios')}
          className="focus:outline-none"
        >
          <FaApple className="h-10 w-10 hover:text-black transition-colors" />
        </button>
        <button 
          onClick={() => handleInstallClick('android')}
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

      {/* Email Collection Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Stay Updated!</h3>
            <p className="text-gray-600 mb-4">
              Enter your email to receive updates and installation instructions.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Installation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailForm(false);
                    handleInstall(platform!);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 