'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import ShareButtons from '@/components/ShareButtons'

interface FractionInputs {
  num1: string
  den1: string
  num2: string
  den2: string
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
}

interface MixedNumberInputs {
  whole1: string
  num1: string
  den1: string
  whole2: string
  num2: string
  den2: string
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
    num1: '',
    den1: '',
    num2: '',
    den2: '',
    operation: 'add'
  })
  
  const [result, setResult] = useState<{num: number, den: number} | null>(null)

  const [mixedInputs, setMixedInputs] = useState<MixedNumberInputs>({
    whole1: '',
    num1: '',
    den1: '',
    whole2: '',
    num2: '',
    den2: '',
    operation: 'add'
  })
  
  const [mixedResult, setMixedResult] = useState<{
    whole: number,
    num: number,
    den: number
  } | null>(null)

  const [simplifyResult, setSimplifyResult] = useState<{num: number, den: number} | null>(null)

  const [decimalInput, setDecimalInput] = useState('')
  const [fractionResult, setFractionResult] = useState<{ numerator: number, denominator: number } | null>(null)

  const [fractionInput, setFractionInput] = useState({
    numerator: '',
    denominator: ''
  })

  const [decimalResult, setDecimalResult] = useState<number | null>(null)

  const [bigFractionInput, setBigFractionInput] = useState({
    num1: '',
    den1: '',
    num2: '',
    den2: '',
    operation: 'add'
  })

  const [bigFractionResult, setBigFractionResult] = useState<{ numerator: string, denominator: string } | null>(null)

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault()
    
    // Convert strings to numbers
    const num1 = parseInt(inputs.num1) || 0
    const den1 = parseInt(inputs.den1) || 1
    const num2 = parseInt(inputs.num2) || 0
    const den2 = parseInt(inputs.den2) || 1

    let num: number, den: number

    switch (inputs.operation) {
      case 'add':
        num = num1 * den2 + num2 * den1
        den = den1 * den2
        break
      case 'subtract':
        num = num1 * den2 - num2 * den1
        den = den1 * den2
        break
      case 'multiply':
        num = num1 * num2
        den = den1 * den2
        break
      case 'divide':
        num = num1 * den2
        den = den1 * num2
        break
      default:
        return
    }

    setResult(simplifyFraction(num, den))
  }

  const handleMixedCalculate = (e: FormEvent) => {
    e.preventDefault()
    
    // Convert mixed numbers to improper fractions
    const num1 = parseInt(mixedInputs.whole1) * parseInt(mixedInputs.den1) + parseInt(mixedInputs.num1)
    const num2 = parseInt(mixedInputs.whole2) * parseInt(mixedInputs.den2) + parseInt(mixedInputs.num2)
    
    let resultNum: number, resultDen: number

    switch (mixedInputs.operation) {
      case 'add':
        resultNum = num1 * parseInt(mixedInputs.den2) + num2 * parseInt(mixedInputs.den1)
        resultDen = parseInt(mixedInputs.den1) * parseInt(mixedInputs.den2)
        break
      case 'subtract':
        resultNum = num1 * parseInt(mixedInputs.den2) - num2 * parseInt(mixedInputs.den1)
        resultDen = parseInt(mixedInputs.den1) * parseInt(mixedInputs.den2)
        break
      case 'multiply':
        resultNum = num1 * parseInt(mixedInputs.num2)
        resultDen = parseInt(mixedInputs.den1) * parseInt(mixedInputs.den2)
        break
      case 'divide':
        resultNum = num1 * parseInt(mixedInputs.den2)
        resultDen = parseInt(mixedInputs.den1) * parseInt(mixedInputs.num2)
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

  const handleBigFractionCalculate = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!bigFractionInput.num1 || !bigFractionInput.den1 || 
        !bigFractionInput.num2 || !bigFractionInput.den2) {
      setBigFractionResult(null);
      return;
    }

    // Convert strings to BigInts for large number calculations
    try {
      const num1 = BigInt(bigFractionInput.num1);
      const den1 = BigInt(bigFractionInput.den1);
      const num2 = BigInt(bigFractionInput.num2);
      const den2 = BigInt(bigFractionInput.den2);

      // Check for division by zero
      if (den1 === BigInt(0) || den2 === BigInt(0) || 
          (bigFractionInput.operation === 'divide' && num2 === BigInt(0))) {
        setBigFractionResult(null);
        return;
      }

      let resultNum: bigint, resultDen: bigint;

      // Perform the selected operation
      switch (bigFractionInput.operation) {
        case 'add':
          resultNum = num1 * den2 + num2 * den1;
          resultDen = den1 * den2;
          break;
        case 'subtract':
          resultNum = num1 * den2 - num2 * den1;
          resultDen = den1 * den2;
          break;
        case 'multiply':
          resultNum = num1 * num2;
          resultDen = den1 * den2;
          break;
        case 'divide':
          resultNum = num1 * den2;
          resultDen = den1 * num2;
          break;
        default:
          return;
      }

      // Simplify the fraction using GCD
      const gcd = (a: bigint, b: bigint): bigint => {
        a = a < BigInt(0) ? -a : a;
        b = b < BigInt(0) ? -b : b;
        while (b) {
          [a, b] = [b, a % b];
        }
        return a;
      };

      const divisor = gcd(resultNum, resultDen);
      resultNum = resultNum / divisor;
      resultDen = resultDen / divisor;

      // Ensure denominator is positive
      if (resultDen < BigInt(0)) {
        resultNum = -resultNum;
        resultDen = -resultDen;
      }

      setBigFractionResult({
        numerator: resultNum.toString(),
        denominator: resultDen.toString()
      });
    } catch (error) {
      console.error('Error in calculation:', error);
      setBigFractionResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Fraction Calculator</h1>
          <ShareButtons 
            title="Fraction Calculator - CalculatorOf.com"
            description="Calculate with fractions easily using this free online calculator. Add, subtract, multiply, and divide fractions with step-by-step solutions."
          />
        </div>
        
        {/* Main Fraction Calculator */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:px-4">
              {/* First Fraction */}
              <div className="flex flex-col items-center w-full sm:w-auto">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  First Fraction
                </label>
                <input 
                  type="number"
                  value={inputs.num1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^-?\d*$/.test(value)) {
                      setInputs({...inputs, num1: value === '' ? '0' : value})
                    }
                  }}
                  className="w-32 p-2 border rounded text-center"
                  placeholder="numerator"
                />
                <div className="my-1 border-t border-black w-20"></div>
                <input
                  type="number"
                  value={inputs.den1}
                  onChange={(e) => setInputs({...inputs, den1: e.target.value})}
                  className="w-32 p-2 border rounded text-center"
                  placeholder="denominator"
                />
              </div>

              {/* Operation Buttons - Same style for all calculators */}
              <div className="flex sm:flex-col justify-center gap-2 w-full sm:w-auto">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="operation"
                    value="add"
                    checked={inputs.operation === 'add'}
                    onChange={(e) => setInputs({...inputs, operation: e.target.value as FractionInputs['operation']})}
                    className="hidden"
                  />
                  <span className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full border-2 
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
                  <span className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full border-2 
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
                  <span className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full border-2 
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
                  <span className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full border-2 
                    ${inputs.operation === 'divide' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}>
                    ÷
                  </span>
                </label>
              </div>

              {/* Second Fraction */}
              <div className="flex flex-col items-center w-full sm:w-auto">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Second Fraction
                </label>
                <input
                  type="number"
                  value={inputs.num2}
                  onChange={(e) => setInputs({...inputs, num2: e.target.value})}
                  className="w-32 p-2 border rounded text-center"
                  placeholder="numerator"
                />
                <div className="my-1 border-t border-black w-20"></div>
                <input
                  type="number"
                  value={inputs.den2}
                  onChange={(e) => setInputs({...inputs, den2: e.target.value})}
                  className="w-32 p-2 border rounded text-center"
                  placeholder="denominator"
                />
              </div>

              {/* Result Section */}
              <div className="w-full sm:w-48 p-2 text-center">
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
            </div>

            <div className="flex justify-center mt-4">
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
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <form className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:px-4">
                {/* First Mixed Number */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    First Mixed Number
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      placeholder="whole number"
                      value={mixedInputs.whole1}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^-?\d*$/.test(value)) {
                          setMixedInputs({...mixedInputs, whole1: value === '' ? '0' : value})
                        }
                      }}
                      className="w-20 p-2 border rounded text-center"
                    />
                    <div className="flex flex-col">
                      <input 
                        type="number"
                        placeholder="numerator"
                        value={mixedInputs.num1}
                        onChange={(e) => setMixedInputs({...mixedInputs, num1: e.target.value})}
                        className="w-20 p-2 border rounded text-center"
                      />
                      <div className="my-1 border-t border-black w-full"></div>
                      <input 
                        type="number"
                        placeholder="denominator"
                        value={mixedInputs.den1}
                        onChange={(e) => setMixedInputs({...mixedInputs, den1: e.target.value})}
                        className="w-20 p-2 border rounded text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Operation */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Operation
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => setMixedInputs({...mixedInputs, operation: 'add'})}
                      className={`px-4 py-2 rounded ${
                        mixedInputs.operation === 'add' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setMixedInputs({...mixedInputs, operation: 'subtract'})}
                      className={`px-4 py-2 rounded ${
                        mixedInputs.operation === 'subtract' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      onClick={() => setMixedInputs({...mixedInputs, operation: 'multiply'})}
                      className={`px-4 py-2 rounded ${
                        mixedInputs.operation === 'multiply' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ×
                    </button>
                    <button
                      type="button"
                      onClick={() => setMixedInputs({...mixedInputs, operation: 'divide'})}
                      className={`px-4 py-2 rounded ${
                        mixedInputs.operation === 'divide' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ÷
                    </button>
                  </div>
                </div>

                {/* Second Mixed Number */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Second Mixed Number
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      placeholder="whole number"
                      value={mixedInputs.whole2}
                      onChange={(e) => setMixedInputs({...mixedInputs, whole2: e.target.value})}
                      className="w-20 p-2 border rounded text-center"
                    />
                    <div className="flex flex-col">
                      <input 
                        type="number"
                        placeholder="numerator"
                        value={mixedInputs.num2}
                        onChange={(e) => setMixedInputs({...mixedInputs, num2: e.target.value})}
                        className="w-20 p-2 border rounded text-center"
                      />
                      <div className="my-1 border-t border-black w-full"></div>
                      <input 
                        type="number"
                        placeholder="denominator"
                        value={mixedInputs.den2}
                        onChange={(e) => setMixedInputs({...mixedInputs, den2: e.target.value})}
                        className="w-20 p-2 border rounded text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="w-full sm:w-48 p-2 text-center">
                  {mixedResult && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center mb-4">
                        <p className="font-semibold text-gray-700 mb-2">Mixed Number:</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-600">
                            {mixedResult.whole}
                          </span>
                          {mixedResult.num !== 0 && (
                            <div className="flex flex-col items-center">
                              <span className="text-xl font-bold text-blue-600">
                                {mixedResult.num}
                              </span>
                              <div className="my-1 border-t border-black w-8"></div>
                              <span className="text-xl font-bold text-blue-600">
                                {mixedResult.den}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold">Improper Fraction:</span>{' '}
                          <span className="text-purple-600 font-bold">
                            {mixedResult.whole * mixedResult.den + mixedResult.num}/{mixedResult.den}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold">Decimal:</span>{' '}
                          <span className="text-green-600 font-bold">
                            {((mixedResult.whole * mixedResult.den + mixedResult.num) / mixedResult.den).toFixed(6)}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold">Percentage:</span>{' '}
                          <span className="text-orange-600 font-bold">
                            {(((mixedResult.whole * mixedResult.den + mixedResult.num) / mixedResult.den) * 100).toFixed(2)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleMixedCalculate}
                  type="button"
                  className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Calculate
                </button>
              </div>
            </form>
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
                    placeholder="Enter whole number"
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
                    placeholder="Enter numerator"
                  />
                  <div className="my-1 border-t border-black w-20"></div>
                  <input
                    type="number"
                    name="simplifyDen"
                    className="w-20 p-2 border rounded text-center"
                    placeholder="Enter denominator"
                  />
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mt-2 shadow-sm">
                    Denominator
                  </label>
                </div>

                {/* Equals Sign */}
                <div className="text-2xl font-bold">=</div>

                {/* Result */}
                {simplifyResult && (
                  <div className="w-full sm:w-48 p-2 text-center">
                    {simplifyResult && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col items-center mb-4">
                          <p className="font-semibold text-gray-700 mb-2">Simplified Fraction:</p>
                          <span className="text-xl font-bold text-blue-600">{simplifyResult.num}</span>
                          <div className="my-1 border-t border-black w-20"></div>
                          <span className="text-xl font-bold text-blue-600">{simplifyResult.den}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>
                            <span className="font-semibold">Mixed Number:</span>{' '}
                            <span className="text-purple-600 font-bold">
                              {Math.floor(Math.abs(simplifyResult.num) / simplifyResult.den)}
                              {simplifyResult.num % simplifyResult.den !== 0 && (
                                <>
                                  {' '}
                                  <span className="inline-flex flex-col items-center mx-1">
                                    <span>{Math.abs(simplifyResult.num) % simplifyResult.den}</span>
                                    <div className="border-t border-black w-4"></div>
                                    <span>{simplifyResult.den}</span>
                                  </span>
                                </>
                              )}
                            </span>
                          </p>
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
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Input Section */}
              <div className="flex flex-col items-center w-full sm:w-auto">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Decimal Number
                </label>
                <input 
                  type="number"
                  step="any"
                  placeholder="Enter decimal"
                  value={decimalInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                      setDecimalInput(value)
                    }
                  }}
                  className="w-32 p-2 border rounded text-center"
                />
              </div>

              {/* Equals Sign */}
              <div className="text-2xl font-bold">=</div>

              {/* Result Section */}
              <div className="w-full sm:w-48 p-2 text-center">
                {fractionResult && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">{fractionResult.numerator}</span>
                      <div className="my-1 border-t border-black w-20"></div>
                      <span className="text-2xl font-bold text-blue-600">{fractionResult.denominator}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Decimal:</span>{' '}
                        <span className="text-green-600 font-bold">
                          {(fractionResult.numerator / fractionResult.denominator).toFixed(3)}
                        </span>
                      </p>
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
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (!decimalInput) {
                    setFractionResult(null);
                    return;
                  }

                  const decimal = parseFloat(decimalInput);
                  if (isNaN(decimal)) {
                    setFractionResult(null);
                    return;
                  }

                  const precision = 1000000;
                  let numerator = decimal * precision;
                  let denominator = precision;
                  
                  const gcd = (a: number, b: number): number => {
                    a = Math.abs(a);
                    b = Math.abs(b);
                    return b ? gcd(b, a % b) : a;
                  };
                  
                  const divisor = gcd(numerator, denominator);
                  
                  numerator = numerator / divisor;
                  denominator = denominator / divisor;
                  
                  setFractionResult({
                    numerator: Math.round(numerator),
                    denominator: Math.round(denominator)
                  });
                }}
                type="button"
                className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        {/* Fraction to Decimal Calculator */}
        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Fraction to Decimal Calculator</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="calculator-grid">
              <div className="flex items-center justify-center gap-4">
                {/* Fraction Input */}
                <div className="flex flex-col items-center">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Numerator
                  </label>
                  <input 
                    type="number"
                    placeholder="numerator"
                    value={fractionInput.numerator}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^-?\d*$/.test(value)) {
                        setFractionInput({
                          ...fractionInput,
                          numerator: value === '' ? '0' : value
                        })
                      }
                    }}
                    className="w-32 p-2 border rounded text-center"
                  />
                  <div className="my-1 border-t border-black w-20"></div>
                  <input 
                    type="number" 
                    placeholder="denominator"
                    value={fractionInput.denominator}
                    onChange={(e) => setFractionInput({
                      ...fractionInput,
                      denominator: e.target.value
                    })}
                    className="w-32 p-2 border rounded text-center"
                  />
                </div>

                {/* Equals Sign */}
                <div className="text-2xl font-bold">=</div>

                {/* Result */}
                <div className="w-48 p-2 text-center min-h-[60px]">
                  {decimalResult !== null && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-4">
                        {decimalResult.toFixed(6)}
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold">Percentage:</span>{' '}
                          <span className="text-orange-600 font-bold">
                            {(decimalResult * 100).toFixed(2)}%
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold">Scientific Notation:</span>{' '}
                          <span className="text-green-600 font-bold">
                            {decimalResult.toExponential(4)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!fractionInput.denominator) {
                      setDecimalResult(null);
                      return;
                    }
                    setDecimalResult(parseInt(fractionInput.numerator) / parseInt(fractionInput.denominator));
                  }}
                  type="button"
                  className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          {/* Fraction to Decimal Details Dropdown */}
          <div className="mt-4">
            <details className="bg-white rounded-lg shadow-lg">
              <summary className="p-6 text-lg font-semibold cursor-pointer hover:bg-gray-50">
                More Details About Fraction to Decimal Conversion
              </summary>
              <div className="px-6 pb-6">
                <div className="prose max-w-none">
                  <p>
                    Convert any fraction to its decimal and percentage equivalents. The calculator handles both proper 
                    and improper fractions, providing results in standard decimal and scientific notation.
                  </p>

                  <h3>How It Works</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Enter the numerator (top number)</li>
                    <li>Enter the denominator (bottom number)</li>
                    <li>Click Calculate to see the decimal equivalent</li>
                    <li>View results in decimal, percentage, and scientific notation</li>
                  </ol>

                  <div className="bg-gray-50 p-4 rounded-lg my-4">
                    <p className="font-semibold mb-2">Common Fraction to Decimal Examples:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>1/2 = 0.5 = 50%</li>
                      <li>1/4 = 0.25 = 25%</li>
                      <li>3/4 = 0.75 = 75%</li>
                      <li>1/3 = 0.333... = 33.33%</li>
                      <li>2/3 = 0.666... = 66.67%</li>
                    </ul>
                  </div>

                  <h3>Example Calculation</h3>
                  <Image
                    src="/images/fractiondecimalcalculator.webp"
                    alt="Free online fraction to decimal calculator showing 3/4 converted to 0.75, with instant conversion to percentage (75%) and scientific notation (7.5000e-1). Perfect for students, teachers, and anyone working with fraction conversions. Features clear display and multiple number formats."
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg mb-4"
                    priority
                  />
                  <p className="text-sm text-gray-600 mb-6">
                    Example: Converting fraction 3/4 to decimal 0.75, showing decimal, percentage, and scientific notation formats.
                  </p>

                  <h3>Conversion Formulas</h3>
                  <Image
                    src="/images/fractiondecimal-formula.webp"
                    alt="Master fraction to decimal conversions with our comprehensive formula guide. Learn division method (3/4 = 0.75), percentage conversion (75%), and scientific notation (7.5 × 10⁻¹). Perfect for students, teachers, and professionals. Includes step-by-step examples and multiple number formats for better understanding."
                    width={800}
                    height={200}
                    className="rounded-lg shadow-md my-4"
                    priority
                  />
                  <p className="text-sm text-gray-600 mb-6">
                    Step-by-step formulas showing division method, percentage conversion, and scientific notation representation.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Big Number Fraction Calculator */}
        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Big Number Fraction Calculator</h2>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <form className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* First Fraction */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    First Fraction
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter numerator"
                    value={bigFractionInput.num1}
                    onChange={(e) => setBigFractionInput({
                      ...bigFractionInput,
                      num1: e.target.value.replace(/[^0-9]/g, '')
                    })}
                    className="w-32 p-2 border rounded text-center"
                  />
                  <div className="my-1 border-t border-black w-20"></div>
                  <input 
                    type="text" 
                    placeholder="Enter denominator"
                    value={bigFractionInput.den1}
                    onChange={(e) => setBigFractionInput({
                      ...bigFractionInput,
                      den1: e.target.value.replace(/[^0-9]/g, '')
                    })}
                    className="w-32 p-2 border rounded text-center"
                  />
                </div>

                {/* Operation */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Operation
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => setBigFractionInput({ ...bigFractionInput, operation: 'add' })}
                      className={`px-4 py-2 rounded ${
                        bigFractionInput.operation === 'add' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setBigFractionInput({ ...bigFractionInput, operation: 'subtract' })}
                      className={`px-4 py-2 rounded ${
                        bigFractionInput.operation === 'subtract' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      onClick={() => setBigFractionInput({ ...bigFractionInput, operation: 'multiply' })}
                      className={`px-4 py-2 rounded ${
                        bigFractionInput.operation === 'multiply' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ×
                    </button>
                    <button
                      type="button"
                      onClick={() => setBigFractionInput({ ...bigFractionInput, operation: 'divide' })}
                      className={`px-4 py-2 rounded ${
                        bigFractionInput.operation === 'divide' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ÷
                    </button>
                  </div>
                </div>

                {/* Second Fraction */}
                <div className="flex flex-col items-center w-full sm:w-auto">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Second Fraction
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter numerator"
                    value={bigFractionInput.num2}
                    onChange={(e) => setBigFractionInput({
                      ...bigFractionInput,
                      num2: e.target.value.replace(/[^0-9]/g, '')
                    })}
                    className="w-32 p-2 border rounded text-center"
                  />
                  <div className="my-1 border-t border-black w-20"></div>
                  <input 
                    type="text" 
                    placeholder="Enter denominator"
                    value={bigFractionInput.den2}
                    onChange={(e) => setBigFractionInput({
                      ...bigFractionInput,
                      den2: e.target.value.replace(/[^0-9]/g, '')
                    })}
                    className="w-32 p-2 border rounded text-center"
                  />
                </div>

                {/* Equals Sign */}
                <div className="text-2xl font-bold">=</div>

                {/* Result */}
                <div className="w-full sm:w-48 p-2 text-center">
                  {bigFractionResult && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center mb-4">
                        <p className="font-semibold text-gray-700 mb-2">Simplified Fraction:</p>
                        <span className="text-xl font-bold text-blue-600 break-all">{bigFractionResult.numerator}</span>
                        <div className="my-1 border-t border-black w-full"></div>
                        <span className="text-xl font-bold text-blue-600 break-all">{bigFractionResult.denominator}</span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold">Mixed Number:</span>{' '}
                          <span className="text-purple-600 font-bold">
                            {(() => {
                              const num = BigInt(bigFractionResult.numerator);
                              const den = BigInt(bigFractionResult.denominator);
                              const whole = num / den;
                              const remainder = num % den;
                              return remainder === BigInt(0) ? 
                                whole.toString() : 
                                `${whole} ${remainder}/${den}`;
                            })()}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold">Decimal:</span>{' '}
                          <span className="text-green-600 font-bold">
                            {(Number(bigFractionResult.numerator) / Number(bigFractionResult.denominator)).toFixed(6)}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold">Percentage:</span>{' '}
                          <span className="text-orange-600 font-bold">
                            {((Number(bigFractionResult.numerator) / Number(bigFractionResult.denominator)) * 100).toFixed(2)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleBigFractionCalculate}
                  type="button"
                  className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Calculate
                </button>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold mb-3">About Big Number Fraction Calculator</h3>
            <p className="text-gray-600 mb-4">
              This calculator handles very large integers and simplifies them to their lowest terms. 
              Enter whole numbers only (no decimals or commas).
            </p>
            
            <h3>Example Calculation</h3>
            <Image
              src="/images/bignumberscalculator.webp"
              alt="Free online big number fraction calculator handling large integers up to 20 digits. Shows multiplication of 123456789/987654321 × 987654321/123456789, with automatic simplification, mixed number conversion, and percentage calculation. Perfect for mathematicians, engineers, and students working with large fractions."
              width={800}
              height={400}
              className="rounded-lg shadow-lg mb-4"
              priority
            />
            <p className="text-sm text-gray-600 mb-6">
              Example: Calculating with large numbers (123456789/987654321), showing simplified result with mixed number and decimal equivalents.
            </p>
            
            <h3>Formula Guide</h3>
            <Image
              src="/images/bignumber-formula.webp"
              alt="Essential big number fraction formulas: Learn how to perform operations with large fractions (up to 20 digits). Shows addition (a/b + c/d), multiplication (a/b × c/d), and simplification using GCD method. Perfect for advanced mathematics, engineering calculations, and precise fraction arithmetic."
              width={800}
              height={200}
              className="rounded-lg shadow-md my-4"
              priority
            />
            <p className="text-sm text-gray-600 mb-6">
              Step-by-step formulas showing fraction operations and simplification methods for large numbers.
            </p>
            
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-2">Usage Notes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maximum input: 20 digits per number</li>
                <li>Denominator cannot be zero</li>
                <li>Results are automatically simplified</li>
                <li>No scientific notation used</li>
              </ul>
            </div>
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