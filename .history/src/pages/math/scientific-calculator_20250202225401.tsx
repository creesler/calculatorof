import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { ScientificInputs, ScientificResults } from '@/types/calculator';
import { calculateScientific } from '@/utils/calculations';
import FloatingButtons from '@/components/FloatingButtons';

const ScientificCalculator = () => {
  const [inputs, setInputs] = useState<ScientificInputs>({
    expression: ''
  });
  
  const [results, setResults] = useState<ScientificResults | null>(null);
  const [history, setHistory] = useState<{expression: string, result: string}[]>([]);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculateScientific(inputs);
    setResults(calculatedResults);
    
    if (!calculatedResults.error) {
      setHistory(prev => [...prev, {
        expression: inputs.expression,
        result: calculatedResults.result.toString()
      }].slice(-5)); // Keep last 5 calculations
    }
  };

  const appendToExpression = (value: string) => {
    setInputs(prev => ({
      expression: prev.expression + value
    }));
  };

  const clearExpression = () => {
    setInputs({ expression: '' });
    setResults(null);
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', '(', ')', 'C'],
    ['7', '8', '9', '/', '^', 'sqrt('],
    ['4', '5', '6', '*', 'log(', 'ln('],
    ['1', '2', '3', '-', 'π', 'e'],
    ['0', '.', '=', '+', '←', 'ANS']
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        <FloatingButtons />
        <Head>
          <title>Scientific Calculator | CalculatorOf.com - Advanced Mathematical Calculations</title>
          <meta 
            name="description" 
            content="Free scientific calculator at CalculatorOf.com. Perform advanced mathematical calculations including trigonometry, logarithms, and more." 
          />
          <meta name="keywords" content="scientific calculator, math calculator, trigonometry calculator, logarithm calculator, CalculatorOf" />
          <meta property="og:title" content="Scientific Calculator | CalculatorOf.com" />
          <meta property="og:description" content="Perform advanced mathematical calculations with our free scientific calculator" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/calculatorof.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Scientific Calculator | CalculatorOf.com" />
          <meta name="twitter:description" content="Advanced mathematical calculations made easy" />
          <meta name="twitter:image" content="/images/calculatorof.png" />
          <link rel="canonical" href="https://calculatorof.com/math/scientific-calculator" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Scientific Calculator</h1>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <input
                  type="text"
                  value={inputs.expression}
                  onChange={(e) => setInputs({ expression: e.target.value })}
                  className="w-full bg-transparent text-right text-2xl font-mono focus:outline-none"
                  placeholder="Enter expression"
                  readOnly
                />
                {results && (
                  <div className="text-right mt-2">
                    {results.error ? (
                      <p className="text-red-500">{results.error}</p>
                    ) : (
                      <p className="text-2xl font-bold">{results.result}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-6 gap-2">
                {buttons.map((row, i) => (
                  <div key={i} className="contents">
                    {row.map((btn) => (
                      <button
                        key={btn}
                        type={btn === '=' ? 'submit' : 'button'}
                        onClick={() => {
                          if (btn === 'C') clearExpression();
                          else if (btn === '←') setInputs(prev => ({
                            expression: prev.expression.slice(0, -1)
                          }));
                          else if (btn === 'ANS' && results) appendToExpression(results.result.toString());
                          else if (btn !== '=') appendToExpression(btn);
                        }}
                        className="p-3 text-lg font-medium rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </form>

            {history.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">History</h3>
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.expression}</span>
                      <span className="font-medium">{item.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12">
            <h2>Advanced Mathematical Calculations</h2>
            <p>
              This scientific calculator supports a wide range of mathematical operations including:
            </p>
            <ul>
              <li>Basic arithmetic (+, -, *, /)</li>
              <li>Trigonometric functions (sin, cos, tan)</li>
              <li>Logarithms (log, ln)</li>
              <li>Square root and exponents</li>
              <li>Constants (π, e)</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3>Usage Tips</h3>
              <ul>
                <li>Use parentheses to group operations</li>
                <li>Trigonometric functions use radians</li>
                <li>Use ^ for exponents (e.g., 2^3)</li>
                <li>ANS recalls the previous result</li>
              </ul>
            </div>
          </article>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Scientific Calculator",
                "applicationCategory": "CalculatorApplication",
                "operatingSystem": "Any",
                "description": "Advanced scientific calculator with support for trigonometry, logarithms, and more.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "author": {
                  "@type": "Organization",
                  "name": "CalculatorOf.com"
                }
              })
            }}
          />
        </main>
      </div>
    </>
  );
};

export default ScientificCalculator; 