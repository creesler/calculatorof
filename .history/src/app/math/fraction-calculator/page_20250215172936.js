'use client';

import { useState } from 'react';
import styles from './FractionCalculator.module.css';

export default function FractionCalculator() {
  // Existing state for fraction simplification
  const [fraction1, setFraction1] = useState({ numerator: '', denominator: '' });
  const [simplifiedFraction, setSimplifiedFraction] = useState({ numerator: '', denominator: '' });
  
  // New state for decimal to fraction conversion
  const [decimalInput, setDecimalInput] = useState('');
  const [fractionResult, setFractionResult] = useState({ numerator: 0, denominator: 1 });

  // Existing simplify fraction function
  const simplifyFraction = () => {
    if (!fraction1.numerator || !fraction1.denominator) return;

    const gcd = (a, b) => {
      a = Math.abs(a);
      b = Math.abs(b);
      return b ? gcd(b, a % b) : a;
    };

    const num = parseInt(fraction1.numerator);
    const den = parseInt(fraction1.denominator);
    
    const divisor = gcd(num, den);
    
    setSimplifiedFraction({
      numerator: num / divisor,
      denominator: den / divisor
    });
  };

  // New decimal to fraction conversion function
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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Fraction Calculator</h1>

        {/* Existing Simplify Calculator section */}
        <div className={styles.calculatorSection}>
          <h2>Simplify Fractions</h2>
          <div className={styles.calculatorGrid}>
            <input
              type="number"
              placeholder="Numerator"
              value={fraction1.numerator}
              onChange={(e) => setFraction1({ ...fraction1, numerator: e.target.value })}
            />
            <div className={styles.fractionLine}></div>
            <input
              type="number"
              placeholder="Denominator"
              value={fraction1.denominator}
              onChange={(e) => setFraction1({ ...fraction1, denominator: e.target.value })}
            />
            <button onClick={simplifyFraction}>Simplify</button>
            <div className={styles.result}>
              {simplifiedFraction.numerator}/{simplifiedFraction.denominator}
            </div>
          </div>
        </div>

        {/* New Decimal to Fraction Calculator section */}
        <div className={styles.calculatorSection}>
          <h2>Decimal to Fraction Calculator</h2>
          <div className={styles.calculatorGrid}>
            <div className={styles.fractionInput}>
              <input 
                type="number" 
                placeholder="Enter decimal"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
              />
              <button onClick={convertDecimalToFraction}>=</button>
              <div className={styles.result}>
                <div className={styles.fraction}>
                  <span className={styles.numerator}>{fractionResult.numerator}</span>
                  <span className={styles.denominator}>{fractionResult.denominator}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 