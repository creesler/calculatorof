'use client';

import { useState } from 'react';
import CalculatorLayout from './CalculatorLayout';

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [additionalContribution, setAdditionalContribution] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [results, setResults] = useState<{
    netProfit: number;
    roi: number;
    paybackPeriod: number;
  } | null>(null);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const additional = parseFloat(additionalContribution) || 0;
    const time = parseFloat(timePeriod) || 0;
    
    const totalInvested = initial + additional;
    const netProfit = final - totalInvested;
    const roi = (netProfit / totalInvested) * 100;
    const paybackPeriod = time * (totalInvested / netProfit);

    setResults({
      netProfit,
      roi,
      paybackPeriod
    });
  };

  const calculatorDescription = (
    <>
      <p className="text-lg text-gray-700">
        ROI, or Return on Investment, is a profitability metric used to evaluate the efficiency of an investment. 
        It compares the gain from an investment relative to its cost. This simple but powerful ratio helps individuals 
        and businesses make informed financial decisions.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">ROI Formulas & Metrics</h2>
        <p className="mb-2">We calculate three key metrics:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Net Profit:</strong> Final Value minus total invested (initial + additional).</li>
          <li><strong>ROI (%):</strong> (Net Profit / Total Invested) × 100.</li>
          <li><strong>Payback Period:</strong> Time (years) × (Total Invested / Net Profit).</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Enter <em>Initial Investment</em> amount.</li>
          <li>Enter <em>Final Value</em> (proceeds or current value).</li>
          <li>Specify time period in years for payback calculation.</li>
          <li>Optionally add any <em>Additional Contribution</em>.</li>
          <li>Click "Calculate ROI" to show results below.</li>
        </ol>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Example</h2>
        <p className="text-gray-700">
          With an initial $1,000, final value $1,500, extra $200, and 2 years time:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
          <li>Net Profit = $1,500 - ($1,000 + $200) = $300</li>
          <li>ROI = (300 / 1,200) × 100 = 25%</li>
          <li>Payback Period = 2 × (1,200 / 300) = 8 years</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Benefits</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Quick insight into ROI and profitability.</li>
          <li>Shows both percentage return and actual net profit.</li>
          <li>Includes payback period calculation.</li>
        </ul>
      </div>
    </>
  );

  const calculatorInterface = (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final Value ($)
          </label>
          <input
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Contribution ($)
          </label>
          <input
            type="number"
            value={additionalContribution}
            onChange={(e) => setAdditionalContribution(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period (years)
          </label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="2"
          />
        </div>

        <button
          onClick={calculateROI}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate ROI
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="mt-8 space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Net Profit</div>
              <div className="text-2xl font-bold text-gray-900">
                ${results.netProfit.toFixed(2)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">ROI</div>
              <div className="text-2xl font-bold text-gray-900">
                {results.roi.toFixed(2)}%
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Payback Period</div>
              <div className="text-2xl font-bold text-gray-900">
                {results.paybackPeriod.toFixed(1)} years
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorLayout
      title="What is ROI?"
      description={calculatorDescription}
      calculator={calculatorInterface}
    />
  );
} 