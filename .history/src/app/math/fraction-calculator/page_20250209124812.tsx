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
    let num: number, den: number

    switch (inputs.operation) {
      case 'add':
        num = inputs.num1 * inputs.den2 + inputs.num2 * inputs.den1
        den = inputs.den1 * inputs.den2
        break
      case 'subtract':
        num = inputs.num1 * inputs.den2 - inputs.num2 * inputs.den1
        den = inputs.den1 * inputs.den2
        break
      case 'multiply':
        num = inputs.num1 * inputs.num2
        den = inputs.den1 * inputs.den2
        break
      case 'divide':
        num = inputs.num1 * inputs.den2
        den = inputs.den1 * inputs.num2
        break
      default:
        return
    }

    setResult(simplifyFraction(num, den))
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Fraction Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              {/* First Fraction */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={inputs.num1}
                  onChange={(e) => setInputs({...inputs, num1: Number(e.target.value)})}
                  className="w-20 p-2 border rounded text-center"
                  placeholder="0"
                />
                <div className="my-1 border-t border-black w-20"></div>
                <input
                  type="number"
                  value={inputs.den1}
                  onChange={(e) => setInputs({...inputs, den1: Number(e.target.value)})}
                  className="w-20 p-2 border rounded text-center"
                  placeholder="1"
                />
              </div>

              {/* Operation Selector - Vertical */}
              <div className="flex flex-col gap-2 mx-2">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="operation"
                    value="add"
                    checked={inputs.operation === 'add'}
                    onChange={(e) => setInputs({...inputs, operation: e.target.value as FractionInputs['operation']})}
                    className="hidden"
                  />
                  <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                    ${inputs.operation === 'add' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                    +
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="operation"
                    value="subtract"
                    checked={inputs.operation === 'subtract'}
                    onChange={(e) => setInputs({...inputs, operation: e.target.value as FractionInputs['operation']})}
                    className="hidden"
                  />
                  <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                    ${inputs.operation === 'subtract' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                    -
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="operation"
                    value="multiply"
                    checked={inputs.operation === 'multiply'}
                    onChange={(e) => setInputs({...inputs, operation: e.target.value as FractionInputs['operation']})}
                    className="hidden"
                  />
                  <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                    ${inputs.operation === 'multiply' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                    ×
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="operation"
                    value="divide"
                    checked={inputs.operation === 'divide'}
                    onChange={(e) => setInputs({...inputs, operation: e.target.value as FractionInputs['operation']})}
                    className="hidden"
                  />
                  <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                    ${inputs.operation === 'divide' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                    ÷
                  </span>
                </label>
              </div>

              {/* Second Fraction */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={inputs.num2}
                  onChange={(e) => setInputs({...inputs, num2: Number(e.target.value)})}
                  className="w-20 p-2 border rounded text-center"
                  placeholder="0"
                />
                <div className="my-1 border-t border-black w-20"></div>
                <input
                  type="number"
                  value={inputs.den2}
                  onChange={(e) => setInputs({...inputs, den2: Number(e.target.value)})}
                  className="w-20 p-2 border rounded text-center"
                  placeholder="1"
                />
              </div>

              {/* Equals Sign */}
              <div className="text-2xl font-bold">=</div>

              {/* Result with Details */}
              {result && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">{result.num}</span>
                    <div className="my-1 border-t border-black w-20"></div>
                    <span className="text-2xl font-bold text-blue-600">{result.den}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Decimal:</span>{' '}
                      <span className="text-green-600 font-bold">
                        {(result.num / result.den).toFixed(3)}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Mixed Number:</span>{' '}
                      <span className="text-purple-600 font-bold">
                        {Math.floor(result.num / result.den)}
                        {result.num % result.den !== 0 && (
                          <>
                            {' '}
                            <span className="inline-flex flex-col items-center mx-1">
                              <span>{result.num % result.den}</span>
                              <div className="border-t border-black w-4"></div>
                              <span>{result.den}</span>
                            </span>
                          </>
                        )}
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>

        {/* Add Formula Section */}
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Fraction Operations Formulas</h2>
          <Image
            src="/images/fraction-formula.webp"
            alt="Essential fraction calculator formulas for students and teachers: Learn how to add fractions (a/b + c/d = (ad+bc)/bd), subtract fractions (a/b - c/d = (ad-bc)/bd), multiply fractions (a/b × c/d = ac/bd), and divide fractions (a/b ÷ c/d = ad/bc). Perfect for math homework and classroom teaching."
            width={800}
            height={200}
            className="rounded-lg shadow-md"
            priority
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>Where:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>a, c = numerators</li>
              <li>b, d = denominators</li>
              <li>All denominators must be non-zero</li>
            </ul>
          </div>
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

          <h3>Screenshot Example</h3>
          <div className="my-8">
            <Image
              src="/images/fractioncalculator.webp"
              alt="Free online fraction calculator perfect for students and teachers: Example shows adding 3/4 + 1/2 = 5/4, with instant conversion to decimal (1.250), mixed number (1 1/4), and percentage (125.0%). Ideal for checking math homework, teaching fractions, and understanding fraction conversions."
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
            <p className="text-sm text-gray-600 mt-2">
              Example: Adding fractions 3/4 + 1/2 = 5/4, showing simplified result with decimal, mixed number, and percentage equivalents.
            </p>
          </div>

          <h3>Features</h3>
          <ul>
            <li>Perform basic fraction operations (add, subtract, multiply, divide)</li>
            <li>Automatic fraction simplification</li>
            <li>View results in multiple formats:
              <ul>
                <li>Simplified fraction</li>
                <li>Decimal representation</li>
                <li>Mixed number format</li>
                <li>Percentage equivalent</li>
              </ul>
            </li>
          </ul>
        </article>
      </main>
    </div>
  )
} 