import React, { useState } from 'react';

export default function FractionCalculator() {
  // ... existing fraction calculator state ...

  // Add these new states for decimal to fraction conversion
  const [decimalInput, setDecimalInput] = useState('');
  const [fractionResult, setFractionResult] = useState<{ numerator: number, denominator: number } | null>(null);

  // Add this new function for decimal to fraction conversion
  const convertDecimalToFraction = () => {
    if (!decimalInput) return;
    
    const decimal = parseFloat(decimalInput);
    const precision = 1000000; // This handles up to 6 decimal places
    
    let numerator = decimal * precision;
    let denominator = precision;
    
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a);
      b = Math.abs(b);
      return b ? gcd(b, a % b) : a;
    };
    
    const divisor = gcd(numerator, denominator);
    
    // Simplify the fraction
    numerator = numerator / divisor;
    denominator = denominator / divisor;
    
    setFractionResult({
      numerator: Math.round(numerator),
      denominator: Math.round(denominator)
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Decimal to Fraction Calculator</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
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

          {/* Result - Only show when fractionResult exists */}
          <div className="w-32 p-2 text-center">
            {fractionResult && (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{fractionResult.numerator}</span>
                <div className="my-1 border-t border-black w-20"></div>
                <span className="text-2xl font-bold">{fractionResult.denominator}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={convertDecimalToFraction}
            className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
} 