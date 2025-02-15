'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production and if service worker is supported
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Use a timeout to defer registration
      const timer = setTimeout(() => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered successfully')
            
            // Check registration status
            if (registration.active) {
              console.log('Service Worker is active')
            }
            
            registration.addEventListener('statechange', (e) => {
              if (e.target && 'state' in e.target) {
                console.log('Service Worker state changed:', (e.target as ServiceWorker).state)
              }
            })
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error)
          })
      }, 1000) // Delay registration by 1 second

      return () => clearTimeout(timer)
    }
  }, [])

  return null
} 