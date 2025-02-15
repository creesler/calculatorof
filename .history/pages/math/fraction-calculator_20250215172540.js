import { useState } from 'react';
import Head from 'next/head';

export default function FractionCalculator() {
  const [decimalInput, setDecimalInput] = useState('');
  const [fractionResult, setFractionResult] = useState({ numerator: 0, denominator: 1 });

  const convertDecimalToFraction = () => {
    if (!decimalInput) return;
    
    const decimal = parseFloat(decimalInput);
    const precision = 1000000; // This handles up to 6 decimal places
    
    let numerator = decimal * precision;
    let denominator = precision;
    
    // Find the greatest common divisor (GCD)
    const gcd = (a, b) => {
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
      <Head>
        <title>Fraction Calculator</title>
        <meta name="description" content="Fraction calculator with various operations" />
      </Head>

      <main className="container">
        <h1>Fraction Calculator</h1>
        
        {/* Existing Simplify Calculator section */}
        
        {/* Decimal to Fraction Calculator */}
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
      </main>
    </div>
  );
} 