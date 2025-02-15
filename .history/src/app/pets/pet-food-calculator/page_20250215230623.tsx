'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import ShareButtons from '@/components/ShareButtons'

export default function PetFoodCalculator() {
  // ... existing state and functions ...

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Pet Food Calculator</h1>
          <ShareButtons 
            title="Pet Food Calculator - CalculatorOf.com"
            description="Calculate the right amount of food for your pet with this free online calculator. Get personalized feeding recommendations."
          />
        </div>

        {/* ... rest of your calculator ... */}
      </main>
    </div>
  )
} 