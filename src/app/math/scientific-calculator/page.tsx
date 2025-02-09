'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { ScientificInputs, ScientificResults } from '@/types/calculator'
import { calculateScientific } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

export default function ScientificCalculator() {
  const [inputs, setInputs] = useState<ScientificInputs>({
    expression: ''
  })
  
  const [results, setResults] = useState<ScientificResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const calculatedResults = calculateScientific(inputs)
    setResults(calculatedResults)
  }

  const handleButtonClick = (value: string) => {
    setInputs(prev => ({
      expression: prev.expression + value
    }))
  }

  const handleClear = () => {
    setInputs({ expression: '' })
    setResults(null)
  }

  const handleBackspace = () => {
    setInputs(prev => ({
      expression: prev.expression.slice(0, -1)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Scientific Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <input
                type="text"
                value={inputs.expression}
                onChange={(e) => setInputs({ expression: e.target.value })}
                className="w-full text-2xl p-4 border rounded-lg font-mono"
                placeholder="Enter expression..."
                readOnly
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Numbers */}
              {[7,8,9,4,5,6,1,2,3,0,'.','='].map((num) => (
                <button
                  key={num}
                  type={num === '=' ? 'submit' : 'button'}
                  onClick={() => num !== '=' && handleButtonClick(num.toString())}
                  className="p-4 text-xl font-semibold bg-gray-100 rounded hover:bg-gray-200"
                >
                  {num}
                </button>
              ))}

              {/* Operations */}
              {['+','-','*','/','(',')'].map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => handleButtonClick(op)}
                  className="p-4 text-xl font-semibold bg-blue-100 rounded hover:bg-blue-200"
                >
                  {op}
                </button>
              ))}

              {/* Functions */}
              {['sin','cos','tan','log','ln','√'].map((func) => (
                <button
                  key={func}
                  type="button"
                  onClick={() => handleButtonClick(func + '(')}
                  className="p-4 text-lg font-semibold bg-purple-100 rounded hover:bg-purple-200"
                >
                  {func}
                </button>
              ))}

              {/* Clear and Backspace */}
              <button
                type="button"
                onClick={handleClear}
                className="p-4 text-xl font-semibold bg-red-100 rounded hover:bg-red-200"
              >
                C
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="p-4 text-xl font-semibold bg-yellow-100 rounded hover:bg-yellow-200"
              >
                ⌫
              </button>
            </div>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-3xl font-mono font-bold text-blue-600">
                  {results.result}
                </p>
                {results.error && (
                  <p className="text-red-500 mt-2">{results.error}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Scientific Calculator Features</h2>
          <p>
            This calculator supports advanced mathematical operations including trigonometric functions, 
            logarithms, exponentials, and more. Perfect for complex calculations and mathematical analysis.
          </p>

          <div className="my-8">
            <Image
              src="/images/scientificcalculator.jpg"
              alt="Scientific calculator functions and operations guide"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h3>Available Functions</h3>
          <ul>
            <li>Basic arithmetic operations (+, -, *, /)</li>
            <li>Trigonometric functions (sin, cos, tan)</li>
            <li>Logarithmic functions (log, ln)</li>
            <li>Square root and exponents</li>
            <li>Parentheses for operation precedence</li>
          </ul>
        </article>
      </main>
    </div>
  )
} 