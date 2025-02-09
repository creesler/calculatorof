import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { PercentageInputs, PercentageResults } from '@/types/calculator';
import { calculatePercentage } from '@/utils/calculations';
import Image from 'next/image';
import FloatingButtons from '@/components/FloatingButtons';

interface ScreenshotExample {
  calculationType: 'percentage' | 'value' | 'total';
  value1: number;
  value2: number;
  results: {
    result: number;
    explanation: string;
    formula: string;
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  calculationType: 'percentage',
  value1: 25,
  value2: 100,
  results: {
    result: 25,
    explanation: '25 is 25% of 100',
    formula: '(25 ÷ 100) × 100 = 25%'
  }
});

const PercentageCalculator = () => {
  const [inputs, setInputs] = useState<PercentageInputs>({
    calculationType: 'percentage',
    value1: 0,
    value2: 0
  });
  
  const [results, setResults] = useState<PercentageResults | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculatePercentage(inputs);
    setResults(calculatedResults);
  };

  const screenshotExample = getScreenshotExample();

  const calculationTypes = {
    percentage: 'What percentage is X of Y?',
    value: 'What is X% of Y?',
    total: 'X is Y% of what number?'
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        <FloatingButtons />
        <Head>
          <title>Percentage Calculator | CalculatorOf.com - Calculate Percentages Easily</title>
          <meta 
            name="description" 
            content="Free percentage calculator at CalculatorOf.com. Calculate percentages, find values from percentages, and solve percentage problems." 
          />
          <meta name="keywords" content="percentage calculator, percent calculator, percentage math, percentage conversion, CalculatorOf" />
          <meta property="og:title" content="Percentage Calculator | CalculatorOf.com" />
          <meta property="og:description" content="Calculate percentages with our free calculator at CalculatorOf.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/calculatorof.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Percentage Calculator | CalculatorOf.com" />
          <meta name="twitter:description" content="Calculate percentages instantly with our free calculator" />
          <meta name="twitter:image" content="/images/calculatorof.png" />
          <link rel="canonical" href="https://calculatorof.com/math/percentage-calculator" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Percentage Calculator</h1>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Calculation Type
                  <select
                    name="calculationType"
                    value={inputs.calculationType}
                    onChange={(e) => setInputs({...inputs, calculationType: e.target.value as PercentageInputs['calculationType']})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(calculationTypes).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {inputs.calculationType === 'value' ? 'Percentage' : 'Value'}
                    <input
                      type="number"
                      name="value1"
                      value={inputs.value1 || ''}
                      onChange={(e) => setInputs({...inputs, value1: Number(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={screenshotExample.value1.toString()}
                      required
                      step="any"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {inputs.calculationType === 'total' ? 'Percentage' : 'Value'}
                    <input
                      type="number"
                      name="value2"
                      value={inputs.value2 || ''}
                      onChange={(e) => setInputs({...inputs, value2: Number(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={screenshotExample.value2.toString()}
                      required
                      step="any"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate
              </button>
            </form>

            {results && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md" data-testid="results">
                <p className="text-lg font-medium text-gray-900">{results.explanation}</p>
                <p className="mt-2 text-sm text-gray-600">Formula: {results.formula}</p>
              </div>
            )}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12">
            <h2>Understanding Percentage Calculations</h2>
            <p>
              Percentages are used to express parts of a whole, where the whole is considered as 100. 
              This calculator helps you solve three common types of percentage problems.
            </p>

            <div className="my-8">
              <Image
                src="/images/percentagecalculator.JPG"
                alt="Percentage Calculator interface showing percentage calculation with example values"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <h3>How Percentages Are Calculated</h3>
            <p>
              The calculation uses these formulas:
            </p>
            
            <div className="my-8">
              <Image
                src="/images/percentage-formula.jpg"
                alt="Percentage Formula showing different percentage calculations"
                width={600}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>

            <h3>Types of Calculations</h3>
            <ul>
              <li><strong>Finding a Percentage:</strong> What percentage is X of Y?</li>
              <li><strong>Finding a Value:</strong> What is X% of Y?</li>
              <li><strong>Finding the Total:</strong> X is Y% of what number?</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3>Quick Tips</h3>
              <ul>
                <li>To convert a decimal to a percentage, multiply by 100</li>
                <li>To convert a percentage to a decimal, divide by 100</li>
                <li>Percentages can be greater than 100</li>
                <li>Negative percentages are possible in some contexts</li>
              </ul>
            </div>
          </article>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Percentage Calculator",
                "applicationCategory": "CalculatorApplication",
                "operatingSystem": "Any",
                "description": "Calculate percentages, find values from percentages, and solve percentage problems.",
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

export default PercentageCalculator; 