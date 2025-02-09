'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { BMIInputs, BMIResults } from '@/types/calculator'
import { calculateBMI } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function BMICalculator() {
  const [inputs, setInputs] = useState<BMIInputs>({
    weight: 0,
    height: 0,
    unit: 'metric'
  })
  
  const [results, setResults] = useState<BMIResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const calculatedResults = calculateBMI(inputs)
    setResults(calculatedResults)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">BMI Calculator</h1>
        
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate BMI
            </button>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Your Results</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium">BMI</h3>
                <p className="text-2xl font-bold text-blue-600">{results.bmi}</p>
                <p className="text-lg text-gray-600">{results.category}</p>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Understanding BMI</h2>
          <p>
            Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if your weight 
            is healthy. The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
          </p>

          <div className="my-8">
            <Image
              src="/images/bmicalculator.jpg"
              alt="BMI Categories Chart showing underweight, normal, overweight, and obese ranges"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="my-8">
            <Image
              src="/images/bmi-formula.jpg"
              alt="BMI Formula: BMI = weight(kg) / height²(m)"
              width={600}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>

          <h3>BMI Categories</h3>
          <ul>
            <li>Underweight = less than 18.5</li>
            <li>Normal weight = 18.5 to 24.9</li>
            <li>Overweight = 25 to 29.9</li>
            <li>Obesity = BMI of 30 or greater</li>
          </ul>
        </article>
      </main>
    </div>
  )
} 