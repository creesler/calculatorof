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

interface MixedNumberInputs {
  whole1: number
  num1: number
  den1: number
  whole2: number
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

  const [mixedInputs, setMixedInputs] = useState<MixedNumberInputs>({
    whole1: 0,
    num1: 0,
    den1: 1,
    whole2: 0,
    num2: 0,
    den2: 1,
    operation: 'add'
  })
  
  const [mixedResult, setMixedResult] = useState<{
    whole: number,
    num: number,
    den: number
  } | null>(null)

  const [simplifyResult, setSimplifyResult] = useState<{num: number, den: number} | null>(null)

  const [decimalInput, setDecimalInput] = useState('')
  const [fractionResult, setFractionResult] = useState({ numerator: 0, denominator: 1 })

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

  const handleMixedCalculate = (e: FormEvent) => {
    e.preventDefault()
    
    // Convert mixed numbers to improper fractions
    const num1 = mixedInputs.whole1 * mixedInputs.den1 + mixedInputs.num1
    const num2 = mixedInputs.whole2 * mixedInputs.den2 + mixedInputs.num2
    
    let resultNum: number, resultDen: number

    switch (mixedInputs.operation) {
      case 'add':
        resultNum = num1 * mixedInputs.den2 + num2 * mixedInputs.den1
        resultDen = mixedInputs.den1 * mixedInputs.den2
        break
      case 'subtract':
        resultNum = num1 * mixedInputs.den2 - num2 * mixedInputs.den1
        resultDen = mixedInputs.den1 * mixedInputs.den2
        break
      case 'multiply':
        resultNum = num1 * num2
        resultDen = mixedInputs.den1 * mixedInputs.den2
        break
      case 'divide':
        resultNum = num1 * mixedInputs.den2
        resultDen = mixedInputs.den1 * num2
        break
      default:
        return
    }

    // Convert improper fraction to mixed number
    const simplified = simplifyFraction(resultNum, resultDen)
    const whole = Math.floor(Math.abs(simplified.num) / simplified.den)
    const remainder = Math.abs(simplified.num) % simplified.den
    const sign = simplified.num < 0 ? -1 : 1

    setMixedResult({
      whole: sign * whole,
      num: remainder,
      den: simplified.den
    })
  }

  const convertDecimalToFraction = () => {
    const decimal = parseFloat(decimalInput)
    if (isNaN(decimal)) {
      setFractionResult({ numerator: 0, denominator: 1 })
      return
    }

    let numerator = decimal.toString().split('.')[1]
    let denominator = 1
    let whole = Math.floor(decimal)
    let remainder = Math.round((decimal - whole) * 100)

    if (numerator) {
      denominator = Math.pow(10, numerator.length)
      numerator = parseInt(numerator)
    } else {
      numerator = 0
    }

    if (remainder === 0) {
      setFractionResult({ numerator, denominator })
      return
    }

    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b)
    }

    const commonDivisor = gcd(numerator, denominator)
    numerator /= commonDivisor
    denominator /= commonDivisor

    setFractionResult({ numerator, denominator })
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Fraction Calculator</h1>
        
        {/* Main Fraction Calculator */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              {/* First Fraction */}
              <div className="flex flex-col items-center">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Numerator
                </label>
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
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 shadow-sm">
                  Denominator
                </label>
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
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Numerator
                </label>
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
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 shadow-sm">
                  Denominator
                </label>
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

        {/* Details Dropdown */}
        <div className="max-w-2xl mx-auto mt-8">
          <details className="bg-white rounded-lg shadow-lg">
            <summary className="p-6 text-lg font-semibold cursor-pointer hover:bg-gray-50">
              More Details About Fraction Operations
            </summary>
            <div className="px-6 pb-6">
              <div className="prose max-w-none">
                <p>
                  Enter your fractions in the input fields above. The top number is the numerator, 
                  and the bottom number is the denominator. Select your desired operation and click calculate.
                </p>

                <h3>Example Calculation</h3>
                <Image
                  src="/images/fractioncalculator.webp"
                  alt="Free online fraction calculator perfect for students and teachers: Example shows adding 3/4 + 1/2 = 5/4, with instant conversion to decimal (1.250), mixed number (1 1/4), and percentage (125.0%). Ideal for checking math homework, teaching fractions, and understanding fraction conversions."
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg mb-4"
                  priority
                />
                <p className="text-sm text-gray-600 mb-6">
                  Example: Adding fractions 3/4 + 1/2 = 5/4, showing simplified result with decimal, mixed number, and percentage equivalents.
                </p>

                <h3>Available Operations</h3>
                <ul>
                  <li>Addition (+)</li>
                  <li>Subtraction (−)</li>
                  <li>Multiplication (×)</li>
                  <li>Division (÷)</li>
                </ul>

                <h3>Fraction Operations Formulas</h3>
                <Image
                  src="/images/fraction-formula.webp"
                  alt="Essential fraction calculator formulas for students and teachers: Learn how to add fractions (a/b + c/d = (ad+bc)/bd), subtract fractions (a/b - c/d = (ad-bc)/bd), multiply fractions (a/b × c/d = ac/bd), and divide fractions (a/b ÷ c/d = ad/bc). Perfect for math homework and classroom teaching."
                  width={800}
                  height={200}
                  className="rounded-lg shadow-md my-4"
                  priority
                />
                <div className="text-sm text-gray-600">
                  <p>Where:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>a, c = numerators</li>
                    <li>b, d = denominators</li>
                    <li>All denominators must be non-zero</li>
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Mixed Numbers Calculator */}
        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Mixed Numbers Calculator</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleMixedCalculate} className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                {/* First Mixed Number */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                      Whole
                    </label>
                    <input
                      type="number"
                      value={mixedInputs.whole1}
                      onChange={(e) => setMixedInputs({...mixedInputs, whole1: Number(e.target.value)})}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                      Numerator
                    </label>
                    <input
                      type="number"
                      value={mixedInputs.num1}
                      onChange={(e) => setMixedInputs({...mixedInputs, num1: Number(e.target.value)})}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="0"
                    />
                    <div className="my-1 border-t border-black w-16"></div>
                    <input
                      type="number"
                      value={mixedInputs.den1}
                      onChange={(e) => setMixedInputs({...mixedInputs, den1: Number(e.target.value)})}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="1"
                    />
                    <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 shadow-sm">
                      Denominator
                    </label>
                  </div>
                </div>

                {/* Operation Selector - Vertical */}
                <div className="flex flex-col gap-2 mx-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="operation"
                      value="add"
                      checked={mixedInputs.operation === 'add'}
                      onChange={(e) => setMixedInputs({...mixedInputs, operation: e.target.value as MixedNumberInputs['operation']})}
                      className="hidden"
                    />
                    <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                      ${mixedInputs.operation === 'add' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                      +
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="operation"
                      value="subtract"
                      checked={mixedInputs.operation === 'subtract'}
                      onChange={(e) => setMixedInputs({...mixedInputs, operation: e.target.value as MixedNumberInputs['operation']})}
                      className="hidden"
                    />
                    <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                      ${mixedInputs.operation === 'subtract' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                      -
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="operation"
                      value="multiply"
                      checked={mixedInputs.operation === 'multiply'}
                      onChange={(e) => setMixedInputs({...mixedInputs, operation: e.target.value as MixedNumberInputs['operation']})}
                      className="hidden"
                    />
                    <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                      ${mixedInputs.operation === 'multiply' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                      ×
                    </span>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="operation"
                      value="divide"
                      checked={mixedInputs.operation === 'divide'}
                      onChange={(e) => setMixedInputs({...mixedInputs, operation: e.target.value as MixedNumberInputs['operation']})}
                      className="hidden"
                    />
                    <span className={`w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 
                      ${mixedInputs.operation === 'divide' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                      ÷
                    </span>
                  </label>
                </div>

                {/* Second Mixed Number */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                      Whole
                    </label>
                    <input
                      type="number"
                      value={mixedInputs.whole2}
                      onChange={(e) => setMixedInputs({...mixedInputs, whole2: Number(e.target.value)})}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                      Numerator
                    </label>
                    <input
                      type="number"
                      value={mixedInputs.num2}
                      onChange={(e) => setMixedInputs({...mixedInputs, num2: Number(e.target.value)})}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="0"
                    />
                    <div className="my-1 border-t border-black w-16"></div>
                    <input
                      type="number"
                      value={mixedInputs.den2}
                      onChange={(e) => setMixedInputs({...mixedInputs, den2: Number(e.target.value)})}
                      className="w-16 p-2 border rounded text-center"
                      placeholder="1"
                    />
                    <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 shadow-sm">
                      Denominator
                    </label>
                  </div>
                </div>

                {/* Equals Sign */}
                <div className="text-2xl font-bold">=</div>

                {/* Mixed Number Result */}
                {mixedResult && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {mixedResult.whole !== 0 && mixedResult.whole}
                      </span>
                      {(mixedResult.num !== 0 || mixedResult.whole === 0) && (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-blue-600">{mixedResult.num}</span>
                          <div className="my-1 border-t border-black w-16"></div>
                          <span className="text-2xl font-bold text-blue-600">{mixedResult.den}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Decimal:</span>{' '}
                        <span className="text-green-600 font-bold">
                          {((mixedResult.whole * mixedResult.den + mixedResult.num) / mixedResult.den).toFixed(3)}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Improper Fraction:</span>{' '}
                        <span className="text-purple-600 font-bold">
                          {mixedResult.whole * mixedResult.den + mixedResult.num}
                          <span className="inline-flex flex-col items-center mx-1">
                            <div className="border-t border-black w-4"></div>
                            <span>{mixedResult.den}</span>
                          </span>
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Percentage:</span>{' '}
                        <span className="text-orange-600 font-bold">
                          {((mixedResult.whole * mixedResult.den + mixedResult.num) / mixedResult.den * 100).toFixed(1)}%
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

          {/* Mixed Numbers Details Dropdown */}
          <div className="mt-4">
            <details className="bg-white rounded-lg shadow-lg">
              <summary className="p-6 text-lg font-semibold cursor-pointer hover:bg-gray-50">
                More Details About Mixed Numbers Operations
              </summary>
              <div className="px-6 pb-6">
                <div className="prose max-w-none">
                  <p>
                    A mixed number consists of a whole number and a proper fraction. For example, 1¾ is a mixed number 
                    where 1 is the whole number and ¾ is the fraction part.
                  </p>

                  {/* Mixed Numbers Formula */}
                  <h3>Converting Between Mixed Numbers and Improper Fractions</h3>
                  <Image
                    src="/images/mixednumbers-formula.webp"
                    alt="Essential mixed numbers conversion formulas for math students and teachers: Learn step-by-step how to convert mixed numbers (a b/c) to improper fractions ((a×c+b)/c) and back (⌊a÷b⌋ remainder/b). Perfect for algebra, pre-calculus, and standardized test prep #mathematics #fractions #education"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg mb-4"
                    priority
                  />
                  <p className="text-sm text-gray-600 mb-6">
                    Step-by-step formulas for converting between mixed numbers and improper fractions, with clear variable explanations.
                  </p>

                  {/* Mixed Numbers Example */}
                  <h3>Example Calculation</h3>
                  <Image
                    src="/images/mixednumbers-result.webp"
                    alt="Interactive mixed numbers calculator showing 2¾ + 1½ = 4¼, with instant conversions to decimal (4.250), improper fraction (17/4), and percentage (425.0%). Ideal for homework help, classroom teaching, and self-study. Features automatic simplification and multiple formats #mathtools #fractioncalculator #education"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg mb-4"
                    priority
                  />
                  <p className="text-sm text-gray-600 mb-6">
                    Example: Adding mixed numbers 2¾ + 1½ = 4¼, demonstrating automatic conversion and multiple result formats.
                  </p>

                  <h3>How It Works</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Convert mixed numbers to improper fractions:
                      <ul className="list-disc pl-5 mt-1">
                        <li>Multiply whole number by denominator</li>
                        <li>Add numerator</li>
                        <li>Keep the same denominator</li>
                      </ul>
                    </li>
                    <li>Perform the selected operation</li>
                    <li>Convert result back to mixed number:
                      <ul className="list-disc pl-5 mt-1">
                        <li>Divide numerator by denominator</li>
                        <li>Whole number is the quotient</li>
                        <li>Remainder becomes the new numerator</li>
                      </ul>
                    </li>
                    <li>Simplify the fraction part if needed</li>
                  </ol>

                  <h3>Conversion Formulas</h3>
                  <div className="bg-gray-50 p-4 rounded-lg my-4">
                    <p className="font-semibold mb-2">Mixed to Improper:</p>
                    <p className="text-gray-700">
                      For mixed number a b/c:<br />
                      Improper fraction = (a × c + b)/c
                    </p>
                    <p className="font-semibold mt-4 mb-2">Improper to Mixed:</p>
                    <p className="text-gray-700">
                      For improper fraction a/b:<br />
                      Whole number = floor(a ÷ b)<br />
                      Fraction part = remainder/b
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Simplify Fractions Calculator */}
        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Simplify Fractions Calculator</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={(e) => {
              e.preventDefault()
              const wholeNum = Number((e.currentTarget.elements.namedItem('simplifyWhole') as HTMLInputElement).value) || 0
              const num = Number((e.currentTarget.elements.namedItem('simplifyNum') as HTMLInputElement).value)
              const den = Number((e.currentTarget.elements.namedItem('simplifyDen') as HTMLInputElement).value)
              const improperNum = wholeNum * den + num
              const simplified = simplifyFraction(improperNum, den)
              setSimplifyResult(simplified)
            }} className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                {/* Whole Number */}
                <div className="flex flex-col items-center">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Whole Number
                  </label>
                  <input
                    type="number"
                    name="simplifyWhole"
                    className="w-20 p-2 border rounded text-center"
                    placeholder="2"
                  />
                </div>

                {/* Fraction Part */}
                <div className="flex flex-col items-center">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Numerator
                  </label>
                  <input
                    type="number"
                    name="simplifyNum"
                    className="w-20 p-2 border rounded text-center"
                    placeholder="21"
                  />
                  <div className="my-1 border-t border-black w-20"></div>
                  <input
                    type="number"
                    name="simplifyDen"
                    className="w-20 p-2 border rounded text-center"
                    placeholder="98"
                  />
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 shadow-sm">
                    Denominator
                  </label>
                </div>

                {/* Equals Sign */}
                <div className="text-2xl font-bold">=</div>

                {/* Result */}
                {simplifyResult && (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-blue-600">{simplifyResult.num}</span>
                    <div className="my-1 border-t border-black w-20"></div>
                    <span className="text-2xl font-bold text-blue-600">{simplifyResult.den}</span>
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

              {/* Additional Results */}
              {simplifyResult && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Decimal:</span>{' '}
                      <span className="text-green-600 font-bold">
                        {(simplifyResult.num / simplifyResult.den).toFixed(6)}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Percentage:</span>{' '}
                      <span className="text-orange-600 font-bold">
                        {((simplifyResult.num / simplifyResult.den) * 100).toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Simplify Details Dropdown */}
          <div className="mt-4">
            <details className="bg-white rounded-lg shadow-lg">
              <summary className="p-6 text-lg font-semibold cursor-pointer hover:bg-gray-50">
                More Details About Fraction Simplification
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
                    alt="Fraction simplification example showing 24/36 simplified to 2/3 using step-by-step GCD method. Perfect for learning fraction reduction and finding equivalent fractions. Includes decimal and percentage conversions for comprehensive understanding #fractions #math #education"
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg mb-4"
                    priority
                  />
                  <p className="text-sm text-gray-600 mb-6">
                    Example: Simplifying 24/36 to 2/3 by dividing both numbers by their GCD of 12.
                  </p>

                  <h3>How It Works</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Find the GCD of the numerator and denominator</li>
                    <li>Divide both numbers by the GCD</li>
                    <li>The resulting fraction is in its simplest form</li>
                  </ol>

                  <div className="bg-gray-50 p-4 rounded-lg my-4">
                    <p className="font-semibold mb-2">Example Steps:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Original fraction: 24/36</li>
                      <li>GCD of 24 and 36 is 12</li>
                      <li>24 ÷ 12 = 2 (new numerator)</li>
                      <li>36 ÷ 12 = 3 (new denominator)</li>
                      <li>Simplified fraction: 2/3</li>
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Decimal to Fraction Calculator */}
        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Decimal to Fraction Calculator</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="calculator-grid">
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Decimal Number
                  </label>
                  <input 
                    type="number" 
                    placeholder="Enter decimal"
                    value={decimalInput}
                    onChange={(e) => setDecimalInput(e.target.value)}
                    className="w-32 p-2 border rounded text-center"
                    step="any"
                  />
                </div>

                {/* Equals Sign */}
                <div className="text-2xl font-bold">=</div>

                {/* Result */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">{fractionResult.numerator}</span>
                    <div className="my-1 border-t border-black w-20"></div>
                    <span className="text-2xl font-bold text-blue-600">{fractionResult.denominator}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Mixed Number:</span>{' '}
                      <span className="text-purple-600 font-bold">
                        {Math.floor(fractionResult.numerator / fractionResult.denominator)}
                        {fractionResult.numerator % fractionResult.denominator !== 0 && (
                          <>
                            {' '}
                            <span className="inline-flex flex-col items-center mx-1">
                              <span>{fractionResult.numerator % fractionResult.denominator}</span>
                              <div className="border-t border-black w-4"></div>
                              <span>{fractionResult.denominator}</span>
                            </span>
                          </>
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Percentage:</span>{' '}
                      <span className="text-orange-600 font-bold">
                        {((fractionResult.numerator / fractionResult.denominator) * 100).toFixed(1)}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={convertDecimalToFraction}
                  className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Convert
                </button>
              </div>
            </div>
          </div>

          {/* Decimal to Fraction Details Dropdown */}
          <div className="mt-4">
            <details className="bg-white rounded-lg shadow-lg">
              <summary className="p-6 text-lg font-semibold cursor-pointer hover:bg-gray-50">
                More Details About Decimal to Fraction Conversion
              </summary>
              <div className="px-6 pb-6">
                <div className="prose max-w-none">
                  <p>
                    This calculator converts any decimal number into its equivalent fraction in simplified form. 
                    It handles both terminating and repeating decimals.
                  </p>

                  <h3>How It Works</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Enter any decimal number (e.g., 0.75)</li>
                    <li>The calculator converts it to a fraction (e.g., 3/4)</li>
                    <li>The result is automatically simplified</li>
                    <li>View the result as a fraction, mixed number, and percentage</li>
                  </ol>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Features List */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Perform basic fraction operations (add, subtract, multiply, divide)</li>
            <li>✓ Automatic fraction simplification</li>
            <li>✓ View results in multiple formats:
              <ul className="pl-6 mt-2 space-y-1">
                <li>• Simplified fraction</li>
                <li>• Decimal representation</li>
                <li>• Mixed number format</li>
                <li>• Percentage equivalent</li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
} 