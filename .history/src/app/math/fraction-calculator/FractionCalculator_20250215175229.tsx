"use client";

import React, { useState } from 'react';
import styles from './FractionCalculator.module.css';

export default function FractionCalculator() {
  // Existing state
  const [fraction1, setFraction1] = useState<{ numerator: string; denominator: string }>({ 
    numerator: '', 
    denominator: '' 
  });
  const [simplifiedFraction, setSimplifiedFraction] = useState<{ numerator: string; denominator: string }>({ 
    numerator: '', 
    denominator: '' 
  });
  
  // New state for decimal to fraction conversion
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [fractionResult, setFractionResult] = useState<{ numerator: number; denominator: number }>({ 
    numerator: 0, 
    denominator: 1 
  });

  // Existing simplifyFraction function...
  const simplifyFraction = () => {
    // Your existing simplify function implementation
  };

  // Add this new function with proper type annotations
  const gcd = (a: number, b: number): number => {
    return b ? gcd(b, a % b) : a;
  };

  const convertDecimalToFraction = () => {
    if (!decimalInput) return;
    
    const decimal = parseFloat(decimalInput);
    const precision = 1000000; // This handles up to 6 decimal places
    
    let numerator = decimal * precision;
    let denominator = precision;
    
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
    <div className={styles.calculatorContainer}>
      {/* Existing Simplify Fractions calculator */}
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
      
      {/* Decimal to Fraction Calculator */}
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
    </div>
  );
} 