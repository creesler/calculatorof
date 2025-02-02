import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { ScientificInputs, ScientificResults } from '@/types/calculator';
import { calculateScientific } from '@/utils/calculations';
import FloatingButtons from '@/components/FloatingButtons';
import Image from 'next/image';

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

            <div className="my-8">
              <Image
                src="/images/scientificcalculator.JPG"
                alt="Scientific Calculator interface showing trigonometric calculation example"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

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

            <h3>History of Scientific Calculators</h3>
            <p>
              The first scientific calculator was the Hewlett-Packard HP-35, introduced in 1972. 
              It was revolutionary as the first handheld calculator with trigonometric and exponential functions. 
              Before this, such calculations required bulky slide rules or complex tables.
            </p>

            <h3>Key Features Explained</h3>
            <div className="space-y-4">
              <div>
                <h4>Trigonometric Functions</h4>
                <p>
                  Sin, Cos, and Tan functions work in radians. For example, sin(π/2) = 1, 
                  as π/2 radians equals 90 degrees.
                </p>
              </div>
              <div>
                <h4>Logarithms</h4>
                <div>
                  Two types available:
                  <ul>
                    <li>log(x) - Base-10 logarithm</li>
                    <li>ln(x) - Natural logarithm (base e)</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4>Constants</h4>
                <div>
                  Built-in mathematical constants:
                  <ul>
                    <li>π (pi) ≈ 3.14159</li>
                    <li>e (Euler's number) ≈ 2.71828</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>Common Applications</h3>
            <ul>
              <li>Engineering calculations</li>
              <li>Physics problems</li>
              <li>Mathematics homework</li>
              <li>Financial computations</li>
              <li>Scientific research</li>
            </ul>

            <h3>Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">Why do trigonometric functions use radians?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Radians are the standard unit in mathematics and physics because they make many 
                    formulas simpler and are more natural for calculus. One radian is the angle where 
                    the arc length equals the radius (approximately 57.3 degrees).
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">What's the difference between log and ln?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    log (base-10) is commonly used in engineering and for measuring quantities that vary 
                    by orders of magnitude. ln (natural log) is based on e and is more common in calculus 
                    and natural sciences.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">How accurate are the calculations?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Results are rounded to 8 decimal places for clarity, but internal calculations 
                    use JavaScript's full floating-point precision. For most practical purposes, 
                    this accuracy is more than sufficient.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg my-8">
              <h3>Important Note</h3>
              <p>
                While this calculator is designed for accuracy, always verify critical calculations 
                through multiple methods. For professional or academic work, consider using specialized 
                software or consulting with experts.
              </p>
            </div>
          </article>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
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
                  },
                  "featureList": [
                    "Trigonometric functions",
                    "Logarithms",
                    "Square root and exponents",
                    "Mathematical constants",
                    "Calculation history"
                  ]
                },
                {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": "Understanding Scientific Calculators",
                  "description": "Learn about scientific calculators, their history, features, and applications.",
                  "image": "/images/scientificcalculator.JPG",
                  "author": {
                    "@type": "Organization",
                    "name": "CalculatorOf.com"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "CalculatorOf.com",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "/images/calculatorof.png"
                    }
                  },
                  "datePublished": "2024-01-25",
                  "dateModified": new Date().toISOString().split('T')[0]
                }
              ])
            }}
          />
        </main>
      </div>
    </>
  );
};

export default ScientificCalculator; 