'use client'

import { FaWindows, FaApple, FaAndroid } from 'react-icons/fa'

export default function InstallPromo() {
  return (
    <div className="text-center mb-8">
      <p className="text-gray-600 mb-3">
        No need to open browser and type or search us.
        <br />
        Easily install our app in any of your device
      </p>
      <div className="flex justify-center gap-4 text-gray-500">
        <FaWindows className="h-6 w-6" />
        <FaApple className="h-6 w-6" />
        <FaAndroid className="h-6 w-6" />
      </div>
    </div>
  )
} 