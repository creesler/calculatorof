'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { PercentageInputs, PercentageResults } from '@/types/calculator'
import { calculatePercentage } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function PercentageCalculator() {
  const [inputs, setInputs] = useState<PercentageInputs>({
    calculationType: 'percentage',
    value1: 0,
    value2: 0
  })
  
  const [results, setResults] = useState<PercentageResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const calculatedResults = calculatePercentage(inputs)
    setResults(calculatedResults)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Percentage Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Calculation Type
                <select
                  value={inputs.calculationType}
                  onChange={(e) => setInputs({...inputs, calculationType: e.target.value as 'percentage' | 'value' | 'total'})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="percentage">What is the percentage?</option>
                  <option value="value">What is the value?</option>
                  <option value="total">What is the total?</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {inputs.calculationType === 'percentage' ? 'Value' : 
                 inputs.calculationType === 'value' ? 'Percentage' : 'Value'}
                <input
                  type="number"
                  value={inputs.value1 || ''}
                  onChange={(e) => setInputs({...inputs, value1: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {inputs.calculationType === 'percentage' ? 'Total' : 
                 inputs.calculationType === 'value' ? 'Total' : 'Percentage'}
                <input
                  type="number"
                  value={inputs.value2 || ''}
                  onChange={(e) => setInputs({...inputs, value2: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
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