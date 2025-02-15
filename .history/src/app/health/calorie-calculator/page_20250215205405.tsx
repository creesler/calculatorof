'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { CalorieInputs, CalorieResults } from '@/types/calculator'
import { calculateCalories } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function CalorieCalculator() {
  const [inputs, setInputs] = useState<{
    age: string;
    gender: 'male' | 'female';
    weight: string;
    height: string;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
    unit: 'metric' | 'imperial';
    goal: 'lose' | 'maintain' | 'gain';
  }>({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    unit: 'metric',
    goal: 'maintain'
  })
  
  const [results, setResults] = useState<CalorieResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Parse string inputs to numbers
    const parsedInputs: CalorieInputs = {
      age: parseInt(inputs.age) || 0,
      gender: inputs.gender,
      weight: parseFloat(inputs.weight) || 0,
      height: parseFloat(inputs.height) || 0,
      activityLevel: inputs.activityLevel,
      unit: inputs.unit,
      goal: inputs.goal
    }

    // Only calculate if we have valid numbers
    if (parsedInputs.age && parsedInputs.weight && parsedInputs.height) {
      const calculatedResults = calculateCalories(parsedInputs)
      setResults(calculatedResults)
    } else {
      setResults(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Calorie Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="flex flex-col space-y-4">
              {/* Unit Selection */}
              <div className="flex justify-center space-x-4 mb-4">
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

              {/* Gender Selection */}
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, gender: 'male'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.gender === 'male' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, gender: 'female'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.gender === 'female' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Female
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

              {/* Height Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Height ({inputs.unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={inputs.height}
                  onChange={(e) => setInputs({...inputs, height: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder={`height in ${inputs.unit === 'metric' ? 'centimeters' : 'inches'}`}
                />
              </div>

              {/* Activity Level Selection */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Activity Level
                </label>
                <select
                  value={inputs.activityLevel}
                  onChange={(e) => setInputs({...inputs, activityLevel: e.target.value as 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'})}
                  className="w-full p-2 border rounded text-center"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Exercise</option>
                  <option value="moderate">Moderate Exercise</option>
                  <option value="active">Active</option>
                  <option value="veryActive">Very Active</option>
                </select>
              </div>

              {/* Goal Selection */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Goal
                </label>
                <select
                  value={inputs.goal}
                  onChange={(e) => setInputs({...inputs, goal: e.target.value as 'lose' | 'maintain' | 'gain'})}
                  className="w-full p-2 border rounded text-center"
                >
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>
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
                  <h3 className="text-lg font-medium">Daily Calories</h3>
                  <p className="text-2xl font-bold text-blue-600">{results.dailyCalories} calories</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">BMR</h3>
                  <p className="text-2xl font-bold text-green-600">{results.bmr} calories</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Weekly Goal</h3>
                  <p className="text-2xl font-bold text-purple-600">{results.weeklyGoal} calories</p>
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