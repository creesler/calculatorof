'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('SW registered:', registration.scope))
        .catch((error) => console.log('SW registration failed:', error));
    }
  }, [])

  return null
} 