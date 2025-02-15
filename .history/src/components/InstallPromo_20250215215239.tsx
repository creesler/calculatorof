'use client'

import { FaWindows, FaApple, FaAndroid } from 'react-icons/fa'

export default function InstallPromo() {
  return (
    <div className="text-center mb-8">
      <p className="text-gray-600 mb-4 text-lg">
        No need to open browser and type or search us.
        <br />
        Easily install our app in any of your device
      </p>
      <div className="flex justify-center gap-8 text-gray-600">
        <FaWindows className="h-10 w-10 hover:text-blue-600 transition-colors" />
        <FaApple className="h-10 w-10 hover:text-black transition-colors" />
        <FaAndroid className="h-10 w-10 hover:text-green-600 transition-colors" />
      </div>
    </div>
  )
} 