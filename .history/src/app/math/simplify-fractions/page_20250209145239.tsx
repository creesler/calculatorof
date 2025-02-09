'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function simplifyFraction(num: number, den: number): { num: number, den: number } {
  if (den === 0) return { num: 0, den: 1 }
  const divisor = gcd(num, den)
  return {
    num: num / divisor,
    den: den / divisor
  }
}

export default function SimplifyFractionCalculator() {
  const [inputs, setInputs] = useState({
    num: 0,
    den: 1
  })
  
  const [result, setResult] = useState<{num: number, den: number} | null>(null)

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault()
    setResult(simplifyFraction(inputs.num, inputs.den))
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Simplify Fractions Calculator</h1>
        
        {/* Main Calculator */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              {/* Input Fraction */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={inputs.num}
                  onChange={(e) => setInputs({...inputs, num: Number(e.target.value)})}
                  className="w-20 p-2 border rounded text-center"
                  placeholder="0"
                />
                <div className="my-1 border-t border-black w-20"></div>
                <input
                  type="number"
                  value={inputs.den}
                  onChange={(e) => setInputs({...inputs, den: Number(e.target.value)})}
                  className="w-20 p-2 border rounded text-center"
                  placeholder="1"
                />
              </div>

              {/* Equals Sign */}
              <div className="text-2xl font-bold">=</div>

              {/* Result */}
              {result && (
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-600">{result.num}</span>
                  <div className="my-1 border-t border-black w-20"></div>
                  <span className="text-2xl font-bold text-blue-600">{result.den}</span>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simplify
              </button>
            </div>
          </form>

          {/* Result Details */}
          {result && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Decimal:</span>{' '}
                  <span className="text-green-600 font-bold">
                    {(result.num / result.den).toFixed(3)}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Percentage:</span>{' '}
                  <span className="text-orange-600 font-bold">
                    {((result.num / result.den) * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="max-w-2xl mx-auto mt-8">
          <details className="bg-white rounded-lg shadow-lg">
            <summary className="p-6 text-lg font-semibold cursor-pointer hover:bg-gray-50">
              How to Simplify Fractions
            </summary>
            <div className="px-6 pb-6">
              <div className="prose max-w-none">
                <p>
                  Simplifying a fraction means reducing it to its lowest terms by dividing both the numerator 
                  and denominator by their greatest common divisor (GCD).
                </p>

                <h3>Example Calculation</h3>
                <Image
                  src="/images/simplify-fraction.webp"
                  alt="Fraction simplification example: Shows how 8/12 simplifies to 2/3 by dividing both numbers by their GCD of 4. Perfect for students learning fraction reduction and teachers explaining fraction simplification. #fractions #math #education"
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg mb-4"
                  priority
                />
                <p className="text-sm text-gray-600 mb-6">
                  Example: Simplifying 8/12 to 2/3 by dividing both numbers by their GCD of 4.
                </p>

                <h3>Steps to Simplify</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Find the greatest common divisor (GCD) of the numerator and denominator</li>
                  <li>Divide both the numerator and denominator by the GCD</li>
                  <li>The resulting fraction is in its simplest form</li>
                </ol>

                <div className="bg-gray-50 p-4 rounded-lg my-4">
                  <p className="font-semibold mb-2">Example:</p>
                  <p className="text-gray-700">
                    For fraction 8/12:<br />
                    1. GCD of 8 and 12 is 4<br />
                    2. 8 ÷ 4 = 2 (new numerator)<br />
                    3. 12 ÷ 4 = 3 (new denominator)<br />
                    4. Simplified fraction is 2/3
                  </p>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Features List */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Automatically finds the greatest common divisor (GCD)</li>
            <li>✓ Reduces fractions to lowest terms</li>
            <li>✓ View results in multiple formats:
              <ul className="pl-6 mt-2 space-y-1">
                <li>• Simplified fraction</li>
                <li>• Decimal representation</li>
                <li>• Percentage equivalent</li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
} 