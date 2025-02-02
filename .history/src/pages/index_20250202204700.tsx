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
        <title>ROI Calculator | Free Investment Return Calculator Tool 2024</title>
        <meta 
          name="description" 
          content="Calculate your Return on Investment (ROI) easily with our free calculator. Get instant results for ROI percentage, net profit, and payback period. Perfect for investors, business owners, and financial planners." 
        />
        <meta name="keywords" content="ROI calculator, return on investment calculator, investment calculator, ROI percentage, net profit calculator, payback period calculator, business tools, financial planning, investment analysis" />
        <meta property="og:title" content="ROI Calculator | Free Investment Return Calculator Tool 2024" />
        <meta property="og:description" content="Calculate your return on investment easily with our free ROI calculator tool. Get instant results and make better investment decisions." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/calculatorof.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ROI Calculator | Free Investment Return Calculator Tool 2024" />
        <meta name="twitter:description" content="Calculate your ROI instantly with our free calculator tool" />
        <meta name="twitter:image" content="/images/calculatorof.png" />
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

        <article className="prose lg:prose-xl mx-auto mt-12 px-4">
          <h2>Understanding Return on Investment (ROI)</h2>
          <p>
            Return on Investment (ROI) is a crucial financial metric that helps investors and business owners evaluate the profitability of their investments. Our calculator helps you make informed decisions by providing three key metrics: ROI percentage, net profit, and payback period.
          </p>

          <h3>How to Use This ROI Calculator</h3>
          <ol>
            <li>Enter your initial investment amount</li>
            <li>Input expected annual revenue</li>
            <li>Add anticipated annual costs</li>
            <li>Specify the timeframe in years</li>
            <li>Click calculate to see your results</li>
          </ol>

          <section className="mt-8">
            <h2>Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div itemScope itemType="https://schema.org/Question">
                <h3 itemProp="name">What is a good ROI percentage?</h3>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">A "good" ROI typically depends on your industry and risk tolerance. Generally, an ROI of 15-30% is considered good for most investments, though some industries may accept lower returns while others require higher returns to offset greater risks.</p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h3 itemProp="name">How is ROI calculated?</h3>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">ROI is calculated by taking the net profit (total revenue minus total costs) and dividing it by the initial investment, then multiplying by 100 to get a percentage. Our calculator automates this process for you.</p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h3 itemProp="name">What is payback period?</h3>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">The payback period is the time it takes to recover your initial investment. It's calculated by dividing the initial investment by the annual cash flow (revenue minus costs).</p>
                </div>
              </div>
            </div>
          </section>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ROI Calculator",
              "description": "Free calculator tool to compute return on investment (ROI), net profit, and payback period.",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </main>
    </div>
  );
} 
