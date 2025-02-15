'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { BMIInputs, BMIResults } from '@/types/calculator'
import { calculateBMI } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import ShareButtons from '@/components/ShareButtons'

interface ScreenshotExample {
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
  results: {
    bmi: number;
    category: string;
    healthyWeightRange: {
      min: number;
      max: number;
    };
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  weight: 70,
  height: 170,
  unit: 'metric',
  results: {
    bmi: 24.2,
    category: 'Normal weight',
    healthyWeightRange: {
      min: 53.6,
      max: 72.2
    }
  }
});

export default function BMICalculator() {
  const [inputs, setInputs] = useState<{
    weight: string;
    height: string;
    unit: 'metric' | 'imperial';
  }>({
    weight: '',
    height: '',
    unit: 'metric'
  })
  
  const [results, setResults] = useState<BMIResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Parse string inputs to numbers
    const parsedInputs: BMIInputs = {
      weight: parseFloat(inputs.weight) || 0,
      height: parseFloat(inputs.height) || 0,
      unit: inputs.unit
    }

    // Only calculate if we have valid numbers
    if (parsedInputs.weight && parsedInputs.height) {
      const calculatedResults = calculateBMI(parsedInputs)
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
          <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
          <ShareButtons 
            title="BMI Calculator - CalculatorOf.com"
            description="Calculate your Body Mass Index (BMI) with this free online calculator. Get instant health insights and recommendations."
          />
        </div>
        
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