'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { CalorieInputs, CalorieResults } from '@/types/calculator'
import { calculateCalories } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function CalorieCalculator() {
  const [inputs, setInputs] = useState<CalorieInputs>({
    age: 0,
    gender: 'male',
    weight: 0,
    height: 0,
    activityLevel: 'moderate',
    unit: 'metric'
  })
  
  const [results, setResults] = useState<CalorieResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const calculatedResults = calculateCalories(inputs)
    setResults(calculatedResults)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Calorie Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit System
                <select
                  value={inputs.unit}
                  onChange={(e) => setInputs({...inputs, unit: e.target.value as 'metric' | 'imperial'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="metric">Metric (kg/cm)</option>
                  <option value="imperial">Imperial (lb/in)</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
                <select
                  value={inputs.gender}
                  onChange={(e) => setInputs({...inputs, gender: e.target.value as 'male' | 'female'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
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
                Height ({inputs.unit === 'metric' ? 'cm' : 'in'})
                <input
                  type="number"
                  value={inputs.height || ''}
                  onChange={(e) => setInputs({...inputs, height: Number(e.target.value)})}
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
                  onChange={(e) => setInputs({...inputs, activityLevel: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (exercise 1-3 times/week)</option>
                  <option value="moderate">Moderate (exercise 4-5 times/week)</option>
                  <option value="active">Active (daily exercise or intense exercise 3-4 times/week)</option>
                  <option value="veryActive">Very Active (intense exercise 6-7 times/week)</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Calories
            </button>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Your Daily Calorie Needs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Maintain Weight</h3>
                  <p className="text-2xl font-bold text-blue-600">{results.maintain} calories</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Weight Loss</h3>
                  <p className="text-2xl font-bold text-green-600">{results.weightLoss} calories</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Weight Gain</h3>
                  <p className="text-2xl font-bold text-purple-600">{results.weightGain} calories</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Understanding Daily Calorie Needs</h2>
          <p>
            Your daily calorie needs depend on various factors including age, gender, height, weight, and activity level. 
            This calculator uses the Mifflin-St Jeor equation to estimate your basal metabolic rate (BMR) and then 
            adjusts it based on your activity level.
          </p>

          <div className="my-8">
            <Image
              src="/images/caloriecalculator.jpg"
              alt="Calorie needs diagram showing factors affecting daily caloric requirements"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="my-8">
            <Image
              src="/images/calorie-formula.jpg"
              alt="Calorie Formula: BMR calculation using Mifflin-St Jeor equation"
              width={600}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>

          <h3>Activity Level Multipliers</h3>
          <ul>
            <li>Sedentary: x 1.2</li>
            <li>Light Exercise: x 1.375</li>
            <li>Moderate Exercise: x 1.55</li>
            <li>Active: x 1.725</li>
            <li>Very Active: x 1.9</li>
          </ul>
        </article>
      </main>
    </div>
  )
} 