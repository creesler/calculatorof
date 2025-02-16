'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    const registerServiceWorker = async () => {
      try {
        // Unregister any existing service workers first
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log('Existing Service Worker unregistered');
        }

        // Register the new service worker with the current origin
        const swUrl = `${window.location.origin}/sw.js`;
        const registration = await navigator.serviceWorker.register(swUrl, {
          scope: '/'
        });
        console.log('Service Worker registered successfully:', registration);

        // Force update the service worker
        if (registration.active) {
          registration.active.postMessage({ type: 'SKIP_WAITING' });
        }
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    // Register immediately without waiting
    registerServiceWorker();
  }, []);

  return null;
}