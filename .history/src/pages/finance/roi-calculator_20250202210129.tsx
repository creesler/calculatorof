import { useState } from 'react';
import Head from 'next/head';
import { ROIInputs, ROIResults } from '../../types/calculator';
import { calculateROI } from '../../utils/calculations';

export default function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    initialInvestment: 0,
    annualRevenue: 0,
    annualCosts: 0,
    timeframe: 1
  });
  
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>ROI Calculator | CalculatorOf.com - Calculate Return on Investment</title>
        <meta 
          name="description" 
          content="Free ROI calculator at CalculatorOf.com. Calculate your return on investment, net profit, and payback period instantly with our easy-to-use calculator." 
        />
        <meta name="keywords" content="ROI calculator, return on investment calculator, investment calculator, financial planning, business tools, CalculatorOf" />
        <meta property="og:title" content="ROI Calculator | CalculatorOf.com" />
        <meta property="og:description" content="Calculate your return on investment easily with our free ROI calculator at CalculatorOf.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/calculatorof.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ROI Calculator | CalculatorOf.com" />
        <meta name="twitter:description" content="Calculate your ROI instantly with our free calculator" />
        <meta name="twitter:image" content="/images/calculatorof.png" />
        <link rel="canonical" href="https://calculatorof.com/finance/roi-calculator" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">ROI Calculator</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Initial Investment ($)
                <input
                  type="number"
                  value={inputs.initialInvestment}
                  onChange={(e) => setInputs({...inputs, initialInvestment: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Revenue ($)
                <input
                  type="number"
                  value={inputs.annualRevenue}
                  onChange={(e) => setInputs({...inputs, annualRevenue: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Costs ($)
                <input
                  type="number"
                  value={inputs.annualCosts}
                  onChange={(e) => setInputs({...inputs, annualCosts: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Timeframe (years)
                <input
                  type="number"
                  value={inputs.timeframe}
                  onChange={(e) => setInputs({...inputs, timeframe: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="1"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate ROI
            </button>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">ROI</h3>
                  <p className="text-2xl font-bold text-blue-600">{results.roi}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Net Profit</h3>
                  <p className="text-2xl font-bold text-green-600">${results.netProfit}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Payback Period</h3>
                  <p className="text-2xl font-bold text-purple-600">{results.paybackPeriod} years</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Understanding ROI Calculations</h2>
          <p>
            Return on Investment (ROI) is a key financial metric that helps evaluate the profitability 
            of an investment. Our calculator helps you make informed decisions by providing three 
            essential metrics: ROI percentage, net profit, and payback period.
          </p>

          <h3>How to Use This Calculator</h3>
          <ol>
            <li>Enter your initial investment amount</li>
            <li>Input the expected annual revenue</li>
            <li>Add anticipated annual costs</li>
            <li>Specify the timeframe in years</li>
            <li>Click calculate to see your results</li>
          </ol>
        </article>
      </main>
    </div>
  );
} 