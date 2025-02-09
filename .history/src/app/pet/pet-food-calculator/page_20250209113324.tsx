'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { PetFoodInputs, PetFoodResults } from '@/types/calculator'
import { calculatePetFood } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function PetFoodCalculator() {
  const [inputs, setInputs] = useState<PetFoodInputs>({
    petType: 'dog',
    weight: 0,
    age: 0,
    activityLevel: 'moderate',
    unit: 'metric',
    foodType: 'dry'
  })
  
  const [results, setResults] = useState<PetFoodResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const calculatedResults = calculatePetFood(inputs)
    setResults(calculatedResults)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Pet Food Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pet Type
                <select
                  value={inputs.petType}
                  onChange={(e) => setInputs({...inputs, petType: e.target.value as 'dog' | 'cat'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit System
                <select
                  value={inputs.unit}
                  onChange={(e) => setInputs({...inputs, unit: e.target.value as 'metric' | 'imperial'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="metric">Metric (kg)</option>
                  <option value="imperial">Imperial (lb)</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight ({inputs.unit === 'metric' ? 'kg' : 'lb'})
                <input
                  type="number"
                  value={inputs.weight || ''}
                  onChange={(e) => setInputs({...inputs, weight: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age (years)
                <input
                  type="number"
                  value={inputs.age || ''}
                  onChange={(e) => setInputs({...inputs, age: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Activity Level
                <select
                  value={inputs.activityLevel}
                  onChange={(e) => setInputs({...inputs, activityLevel: e.target.value as 'low' | 'moderate' | 'high'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">Low (senior/inactive)</option>
                  <option value="moderate">Moderate (adult/typical)</option>
                  <option value="high">High (puppy/very active)</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Food Type
                <select
                  value={inputs.foodType}
                  onChange={(e) => setInputs({...inputs, foodType: e.target.value as 'dry' | 'wet'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="dry">Dry Food</option>
                  <option value="wet">Wet Food</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Portions
            </button>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Daily Feeding Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Daily Calories</h3>
                  <p className="text-2xl font-bold text-blue-600">{results.dailyCalories} kcal</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Food Amount</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {results.foodAmount} {inputs.foodType === 'dry' ? 'cups' : 'oz'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Feeding Schedule</h3>
                <p className="text-gray-600">
                  Feed {results.mealsPerDay} times per day, {results.amountPerMeal} 
                  {inputs.foodType === 'dry' ? ' cups' : ' oz'} per meal
                </p>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Pet Food Portion Guide</h2>
          <p>
            Proper portion control is essential for your pet's health. This calculator helps determine the 
            right amount of food based on your pet's weight, age, activity level, and the type of food you're using.
          </p>

          <div className="my-8">
            <Image
              src="/images/petfoodcalculator.jpg"
              alt="Pet food portion guide showing feeding recommendations for dogs and cats"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h3>Feeding Tips</h3>
          <ul>
            <li>Always transition to new food gradually</li>
            <li>Maintain consistent feeding times</li>
            <li>Adjust portions based on your pet's health and weight goals</li>
            <li>Consider treats in daily calorie calculations</li>
            <li>Fresh water should always be available</li>
          </ul>
        </article>
      </main>
    </div>
  )
} 