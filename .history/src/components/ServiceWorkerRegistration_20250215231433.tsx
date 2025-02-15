'use client'

import { useEffect, useRef } from 'react'

export default function ServiceWorkerRegistration() {
  const hasRegistered = useRef(false)

  useEffect(() => {
    if (hasRegistered.current) return;
    hasRegistered.current = true;

    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')
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
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      } else {
        console.log('Service Worker is not supported')
      }
    }

    registerServiceWorker()
  }, [])

  return null
} 