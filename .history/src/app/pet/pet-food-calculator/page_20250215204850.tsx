'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { PetFoodInputs, PetFoodResults } from '@/types/calculator'
import { calculatePetFood } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function PetFoodCalculator() {
  const [inputs, setInputs] = useState({
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
    const parsedInputs = {
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
        <h1 className="text-4xl font-bold text-center mb-8">Pet Food Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="flex flex-col space-y-4">
              {/* Pet Type Selection */}
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, petType: 'dog'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.petType === 'dog' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Dog
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, petType: 'cat'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.petType === 'cat' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Cat
                </button>
              </div>

              {/* Unit Selection */}
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, unit: 'metric'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.unit === 'metric' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, unit: 'imperial'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.unit === 'imperial' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Imperial
                </button>
              </div>

              {/* Weight Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Weight ({inputs.unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder={`weight in ${inputs.unit === 'metric' ? 'kilograms' : 'pounds'}`}
                />
              </div>

              {/* Age Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Age
                </label>
                <input
                  type="number"
                  value={inputs.age}
                  onChange={(e) => setInputs({...inputs, age: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="age in years"
                />
              </div>

              {/* Activity Level Selection */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Activity Level
                </label>
                <select
                  value={inputs.activityLevel}
                  onChange={(e) => setInputs({...inputs, activityLevel: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                >
                  <option value="low">Low Activity</option>
                  <option value="moderate">Moderate Activity</option>
                  <option value="high">High Activity</option>
                </select>
              </div>

              {/* Food Type Selection */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Food Type
                </label>
                <select
                  value={inputs.foodType}
                  onChange={(e) => setInputs({...inputs, foodType: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                >
                  <option value="dry">Dry Food</option>
                  <option value="wet">Wet Food</option>
                </select>
              </div>
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