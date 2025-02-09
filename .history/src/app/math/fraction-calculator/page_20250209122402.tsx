'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

interface FractionInputs {
  num1: number
  den1: number
  num2: number
  den2: number
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
}

export default function FractionCalculator() {
  const [inputs, setInputs] = useState<FractionInputs>({
    num1: 0,
    den1: 1,
    num2: 0,
    den2: 1,
    operation: 'add'
  })
  
  const [result, setResult] = useState<{num: number, den: number} | null>(null)

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault()
    // Calculation logic will be implemented in utils/calculations.ts
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Fraction Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-8">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* First Fraction */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={inputs.num1}
                  onChange={(e) => setInputs({...inputs, num1: Number(e.target.value)})}
                  className="w-24 p-2 border rounded text-center"
                  placeholder="0"
                />
                <div className="my-1 border-t border-black w-24"></div>
                <input
                  type="number"
                  value={inputs.den1}
                  onChange={(e) => setInputs({...inputs, den1: Number(e.target.value)})}
                  className="w-24 p-2 border rounded text-center"
                  placeholder="1"
                />
              </div>

              {/* Operation Selector */}
              <div className="flex justify-center">
                <select
                  value={inputs.operation}
                  onChange={(e) => setInputs({...inputs, operation: e.target.value as FractionInputs['operation']})}
                  className="p-2 border rounded"
                >
                  <option value="add">+</option>
                  <option value="subtract">−</option>
                  <option value="multiply">×</option>
                  <option value="divide">÷</option>
                </select>
              </div>

              {/* Second Fraction */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={inputs.num2}
                  onChange={(e) => setInputs({...inputs, num2: Number(e.target.value)})}
                  className="w-24 p-2 border rounded text-center"
                  placeholder="0"
                />
                <div className="my-1 border-t border-black w-24"></div>
                <input
                  type="number"
                  value={inputs.den2}
                  onChange={(e) => setInputs({...inputs, den2: Number(e.target.value)})}
                  className="w-24 p-2 border rounded text-center"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Calculate
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              <div className="flex flex-col items-center">
                <span>{result.num}</span>
                <div className="my-1 border-t border-black w-24"></div>
                <span>{result.den}</span>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>How to Use the Fraction Calculator</h2>
          <p>
            Enter your fractions in the input fields above. The top number is the numerator, 
            and the bottom number is the denominator. Select your desired operation and click calculate.
          </p>

          <h3>Available Operations</h3>
          <ul>
            <li>Addition (+)</li>
            <li>Subtraction (−)</li>
            <li>Multiplication (×)</li>
            <li>Division (÷)</li>
          </ul>
        </article>
      </main>
    </div>
  )
} 