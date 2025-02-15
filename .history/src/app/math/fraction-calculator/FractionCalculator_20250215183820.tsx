import React, { useState } from 'react';

export default function FractionCalculator() {
  // ... existing fraction calculator state ...

  // Add these new states for decimal to fraction conversion
  const [decimalInput, setDecimalInput] = useState('');
  const [fractionResult, setFractionResult] = useState({ numerator: 0, denominator: 1 });

  // Add this new function for decimal to fraction conversion
  const convertDecimalToFraction = () => {
    if (!decimalInput) return;
    
    const decimal = parseFloat(decimalInput);
    const precision = 1000000; // This handles up to 6 decimal places
    
    let numerator = decimal * precision;
    let denominator = precision;
    
    // Find the greatest common divisor (GCD)
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
    <div>
      {/* Your existing Simplify Fraction calculator JSX */}

      {/* Add this new section below your existing calculator */}
      <div className="calculator-section">
        <h2>Decimal to Fraction Calculator</h2>
        <div className="calculator-grid">
          <div className="fraction-input">
            <input 
              type="number" 
              placeholder="Enter decimal"
              value={decimalInput}
              onChange={(e) => setDecimalInput(e.target.value)}
            />
            <button onClick={convertDecimalToFraction}>=</button>
            <div className="result">
              <div className="fraction">
                <span className="numerator">{fractionResult.numerator}</span>
                <span className="denominator">{fractionResult.denominator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 