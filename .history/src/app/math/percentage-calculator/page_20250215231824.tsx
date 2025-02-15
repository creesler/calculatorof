'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { PercentageInputs, PercentageResults } from '@/types/calculator'
import { calculatePercentage } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import ShareButtons from '@/components/ShareButtons'

export default function PercentageCalculator() {
  const [inputs, setInputs] = useState<{
    calculationType: 'percentage' | 'value' | 'total';
    value1: string;
    value2: string;
  }>({
    calculationType: 'percentage',
    value1: '',
    value2: ''
  })
  
  const [results, setResults] = useState<PercentageResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Parse string inputs to numbers with proper typing
    const parsedInputs: PercentageInputs = {
      calculationType: inputs.calculationType,
      value1: parseFloat(inputs.value1) || 0,
      value2: parseFloat(inputs.value2) || 0
    }

    // Only calculate if we have valid numbers
    if (parsedInputs.value1 && parsedInputs.value2) {
      const calculatedResults = calculatePercentage(parsedInputs)
      setResults(calculatedResults)
    } else {
      setResults(null)
    }
  }

  const getPlaceholders = () => {
    switch (inputs.calculationType) {
      case 'percentage':
        return {
          value1: 'value to find percentage of',
          value2: 'total value'
        }
      case 'value':
        return {
          value1: 'percentage',
          value2: 'total value'
        }
      case 'total':
        return {
          value1: 'value',
          value2: 'percentage'
        }
      default:
        return {
          value1: 'first value',
          value2: 'second value'
        }
    }
  }

  const getLabels = () => {
    switch (inputs.calculationType) {
      case 'percentage':
        return {
          value1: 'Value',
          value2: 'Total'
        }
      case 'value':
        return {
          value1: 'Percentage',
          value2: 'Total'
        }
      case 'total':
        return {
          value1: 'Value',
          value2: 'Percentage'
        }
      default:
        return {
          value1: 'First Value',
          value2: 'Second Value'
        }
    }
  }

  const placeholders = getPlaceholders()
  const labels = getLabels()

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
          <ShareButtons 
            title="Percentage Calculator - CalculatorOf.com"
            description="Calculate percentages easily with this free online calculator. Perfect for discounts, tips, and more."
          />
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="flex flex-col space-y-4">
              {/* Calculation Type Selection */}
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setInputs({
                    ...inputs, 
                    calculationType: 'percentage' as const
                  })}
                  className={`px-4 py-2 rounded-full ${
                    inputs.calculationType === 'percentage' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  What is X% of Y
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({
                    ...inputs, 
                    calculationType: 'value' as const
                  })}
                  className={`px-4 py-2 rounded-full ${
                    inputs.calculationType === 'value' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  X is what % of Y
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({
                    ...inputs, 
                    calculationType: 'total' as const
                  })}
                  className={`px-4 py-2 rounded-full ${
                    inputs.calculationType === 'total' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  X is Y% of what
                </button>
              </div>

              {/* First Value Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  {labels.value1}
                </label>
                <input
                  type="number"
                  value={inputs.value1}
                  onChange={(e) => setInputs({...inputs, value1: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder={placeholders.value1}
                />
              </div>

              {/* Second Value Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  {labels.value2}
                </label>
                <input
                  type="number"
                  value={inputs.value2}
                  onChange={(e) => setInputs({...inputs, value2: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder={placeholders.value2}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Result</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{results.result}</p>
                <p className="text-gray-600 mt-2">{results.explanation}</p>
                <p className="text-sm text-gray-500 mt-1">Formula: {results.formula}</p>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Understanding Percentages</h2>
          <p>
            A percentage represents a part of a whole, where the whole is 100. This calculator helps you 
            find percentages, values, and totals using simple calculations.
          </p>

          <div className="my-8">
            <Image
              src="/images/percentagecalculator.jpg"
              alt="Percentage calculation examples and formulas"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h3>Common Percentage Calculations</h3>
          <ul>
            <li>Finding a percentage of a number</li>
            <li>Calculating percentage increase or decrease</li>
            <li>Converting fractions to percentages</li>
            <li>Finding the original value from a percentage</li>
          </ul>
        </article>
      </main>
    </div>
  )
} 