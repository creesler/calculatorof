'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fraction Calculator - Free Online Calculator',
  description: 'Free online fraction calculator for addition, subtraction, multiplication, and division of fractions. Simple and easy to use.',
  openGraph: {
    title: 'Fraction Calculator',
    description: 'Calculate fractions online - add, subtract, multiply and divide fractions easily',
    images: [{
      url: '/images/fraction-calc.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://your-domain.com/calculators/fraction'
  }
}

export default function FractionCalculator() {
  const [num1, setNum1] = useState('')
  const [den1, setDen1] = useState('')
  const [num2, setNum2] = useState('')
  const [den2, setDen2] = useState('')
  const [operation, setOperation] = useState('+')
  const [result, setResult] = useState({ num: '', den: '' })

  const calculate = () => {
    const n1 = parseInt(num1)
    const d1 = parseInt(den1)
    const n2 = parseInt(num2)
    const d2 = parseInt(den2)

    if (!d1 || !d2) return

    let resultNum, resultDen

    switch (operation) {
      case '+':
        resultNum = n1 * d2 + n2 * d1
        resultDen = d1 * d2
        break
      case '-':
        resultNum = n1 * d2 - n2 * d1
        resultDen = d1 * d2
        break
      case '×':
        resultNum = n1 * n2
        resultDen = d1 * d2
        break
      case '/':
        resultNum = n1 * d2
        resultDen = d1 * n2
        break
    }

    setResult({ num: resultNum.toString(), den: resultDen.toString() })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fraction Calculator',
    description: 'Free online fraction calculator for basic fraction operations',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: 'https://your-domain.com/calculators/fraction'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Fraction Calculator</h1>
        
        <p className="mb-6">
          Below are multiple fraction calculators capable of addition, subtraction, multiplication, 
          division, simplification, and conversion between fractions and decimals. Fields above the 
          solid black line represent the numerator, while fields below represent the denominator.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-3 gap-8 items-center">
            <div>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="w-full text-center border-b-2 border-black mb-2"
                placeholder="0"
              />
              <div className="border-t-2 border-black"></div>
              <input
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                className="w-full text-center mt-2"
                placeholder="1"
              />
            </div>

            <div className="flex justify-center gap-4">
              {['+', '-', '×', '/'].map((op) => (
                <button
                  key={op}
                  onClick={() => {
                    setOperation(op)
                    calculate()
                  }}
                  className={`w-10 h-10 rounded-full ${
                    operation === op ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            <div>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="w-full text-center border-b-2 border-black mb-2"
                placeholder="0"
              />
              <div className="border-t-2 border-black"></div>
              <input
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                className="w-full text-center mt-2"
                placeholder="1"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-4">Result</h3>
            <div className="inline-block">
              <div className="text-2xl">
                <span>{result.num || '0'}</span>
                <div className="border-t-2 border-black my-1"></div>
                <span>{result.den || '1'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 