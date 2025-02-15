'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

interface FractionResult {
  numerator: number;
  denominator: number;
}

export default function FractionCalculator() {
  const [inputs, setInputs] = useState<{
    num1: string;
    den1: string;
  }>({
    num1: '',
    den1: ''
  })
  
  const [result, setResult] = useState<FractionResult | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const num = parseInt(inputs.num1) || 0
    const den = parseInt(inputs.den1) || 0
    
    if (den === 0) {
      setResult(null)
      return
    }
    
    setResult({
      numerator: num,
      denominator: den
    })
  }

  return (
    <form onSubmit={handleCalculate}>
      <div>
        <input
          type="number"
          value={inputs.num1}
          onChange={(e) => setInputs({ ...inputs, num1: e.target.value })}
          placeholder="numerator"
        />
        <div className="divider" />
        <input
          type="number"
          value={inputs.den1}
          onChange={(e) => setInputs({ ...inputs, den1: e.target.value })}
          placeholder="denominator"
        />
      </div>

      {result && (
        <div>
          {result.numerator}/{result.denominator}
          = {(result.numerator / result.denominator).toFixed(6)}
        </div>
      )}
    </form>
  )
} 