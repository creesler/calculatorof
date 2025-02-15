'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { PetFoodInputs, PetFoodResults } from '@/types/calculator'
import { calculatePetFood } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import ShareButtons from '@/components/ShareButtons'

export default function PetFoodCalculator() {
  const [inputs, setInputs] = useState<{
    petType: 'dog' | 'cat';
    weight: string;
    age: string;
    activityLevel: 'low' | 'moderate' | 'high';
    unit: 'metric' | 'imperial';
    foodType: 'dry' | 'wet';
  }>({
    petType: 'dog',
    weight: '',
    age: '',
    activityLevel: 'moderate',
    unit: 'metric',
    foodType: 'dry'
  })
  
  const [results, setResults] = useState<PetFoodResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Parse string inputs to numbers
    const parsedInputs: PetFoodInputs = {
      petType: inputs.petType,
      weight: parseFloat(inputs.weight) || 0,
      age: parseFloat(inputs.age) || 0,
      activityLevel: inputs.activityLevel,
      unit: inputs.unit,
      foodType: inputs.foodType
    }

    // Only calculate if we have valid numbers
    if (parsedInputs.weight && parsedInputs.age) {
      const calculatedResults = calculatePetFood(parsedInputs)
      setResults(calculatedResults)
    } else {
      setResults(null)
    }
  }

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

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            {/* ... keep all your existing form code ... */}
          </form>

          {/* ... keep all your existing results code ... */}
        </div>

        {/* ... keep all your existing article code ... */}
      </main>
    </div>
  )
} 