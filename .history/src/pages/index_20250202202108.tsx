import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { ROIInputs, ROIResults } from '../types/calculator';
import { calculateROI } from '../utils/calculations';

export default function Home() {
  const [inputs, setInputs] = useState<ROIInputs>({
    initialInvestment: 0,
    annualRevenue: 0,
    annualCosts: 0,
    timeframe: 1
  });
  
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>ROI Calculator - Calculate Your Return on Investment</title>
        <meta name="description" content="Free ROI calculator tool to help you calculate your return on investment. Make better investment decisions with our easy-to-use calculator." />
        <meta name="keywords" content="ROI calculator, return on investment, investment calculator, financial planning, business tools" />
        <meta property="og:title" content="ROI Calculator - Calculate Your Return on Investment" />
        <meta property="og:description" content="Calculate your return on investment easily with our free ROI calculator tool." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://your-domain.com" />
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
      </main>
    </div>
  );
} 

// Add zod or similar validation for the ROIInputs type to ensure data integrity
import { z } from 'zod';
const ROISchema = z.object({
  initialInvestment: z.number().min(0),
  annualRevenue: z.number().min(0),
  annualCosts: z.number().min(0),
  timeframe: z.number().min(1)
});
