import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { ROIInputs, ROIResults } from '../../types/calculator';
import { calculateROI } from '../../utils/calculations';
import Image from 'next/image';

const getScreenshotExample = () => {
  return {
    initialInvestment: 100000,
    annualRevenue: 50000,
    annualCosts: 20000,
    timeframe: 3,
    results: {
      roi: 70.00,
      netProfit: 70000,
      paybackPeriod: 3.33
    }
  };
};

const ROICalculator: NextPage = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    initialInvestment: 0,
    annualRevenue: 0,
    annualCosts: 0,
    timeframe: 1
  });
  
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculateROI(inputs);
    setResults(calculatedResults);
  };

  const screenshotExample = getScreenshotExample();

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
                  placeholder={screenshotExample.initialInvestment.toString()}
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
                  placeholder={screenshotExample.annualRevenue.toString()}
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
                  placeholder={screenshotExample.annualCosts.toString()}
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
                  placeholder={screenshotExample.timeframe.toString()}
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
          <h2>Understanding Return on Investment (ROI)</h2>
          <p>
            Return on Investment (ROI) is a crucial financial metric used by investors, business owners, and financial analysts 
            to evaluate the profitability and efficiency of investments. This comprehensive ROI calculator helps you make 
            informed decisions by providing detailed insights into your investment's potential returns.
          </p>

          <div className="my-8">
            <Image
              src="/images/roi-calculator-screenshot.png"
              alt="ROI Calculator interface showing investment return calculation with input fields for initial investment, revenue, and costs"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h3>How ROI is Calculated</h3>
          <p>
            The ROI formula is straightforward but powerful:
          </p>
          
          <div className="my-8">
            <Image
              src="/images/roi-formula.png"
              alt="ROI Formula: ROI = ((Total Revenue - Total Costs) / Initial Investment) × 100"
              width={600}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>

          <p>
            Our calculator breaks this down into three key metrics:
          </p>
          <ul>
            <li><strong>ROI Percentage:</strong> Shows your return as a percentage of the initial investment</li>
            <li><strong>Net Profit:</strong> Calculates your total monetary gain or loss</li>
            <li><strong>Payback Period:</strong> Estimates how long it will take to recover your investment</li>
          </ul>

          <h3>When to Use This ROI Calculator</h3>
          <p>
            This calculator is particularly useful for:
          </p>
          <ul>
            <li>Business investments and expansions</li>
            <li>Real estate investment analysis</li>
            <li>Stock market investment planning</li>
            <li>Marketing campaign evaluation</li>
            <li>Equipment purchase decisions</li>
          </ul>

          <h3>Understanding Your Results</h3>
          <p>
            A positive ROI indicates a profitable investment, while a negative ROI suggests a loss. Generally:
          </p>
          <ul>
            <li>ROI > 15%: Considered a good return for most investments</li>
            <li>ROI > 25%: Excellent performance</li>
            <li>ROI < 0%: Investment is losing money</li>
          </ul>

          <h3>Factors Affecting ROI</h3>
          <p>
            Several factors can impact your return on investment:
          </p>
          <ul>
            <li>Market conditions and economic factors</li>
            <li>Operating costs and overhead</li>
            <li>Competition and market saturation</li>
            <li>Time horizon of the investment</li>
            <li>Risk factors and volatility</li>
          </ul>

          <h3>Tips for Maximizing ROI</h3>
          <ol>
            <li>Carefully research investment opportunities</li>
            <li>Monitor and control costs effectively</li>
            <li>Consider the time value of money</li>
            <li>Diversify investments to manage risk</li>
            <li>Regular review and adjustment of strategy</li>
          </ol>

          <h3>Limitations and Considerations</h3>
          <p>
            While ROI is a valuable metric, it's important to consider:
          </p>
          <ul>
            <li>Time value of money is not factored in</li>
            <li>Risk levels are not directly reflected</li>
            <li>Non-monetary benefits are not included</li>
            <li>Industry-specific factors may vary</li>
          </ul>

          <div className="bg-blue-50 p-6 rounded-lg my-8">
            <h3>Expert Tip</h3>
            <p>
              For more accurate long-term investment analysis, consider using ROI in conjunction with other metrics 
              such as Net Present Value (NPV) and Internal Rate of Return (IRR).
            </p>
          </div>

          <h3>Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div itemScope itemType="https://schema.org/Question">
              <h4 itemProp="name">What is a good ROI percentage?</h4>
              <div itemScope itemType="https://schema.org/Answer">
                <p itemProp="text">
                  A good ROI typically depends on your industry and risk tolerance. Generally, an ROI of 15-30% 
                  is considered good for most investments. However, some industries may accept lower returns while 
                  others require higher returns to offset greater risks.
                </p>
              </div>
            </div>

            <div itemScope itemType="https://schema.org/Question">
              <h4 itemProp="name">How long should I wait before evaluating ROI?</h4>
              <div itemScope itemType="https://schema.org/Answer">
                <p itemProp="text">
                  The evaluation period depends on your investment type. Short-term investments might be evaluated 
                  monthly or quarterly, while long-term investments should be assessed over years to account for 
                  market cycles and growth patterns.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Add Schema.org markup for the calculator */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "ROI Calculator",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "description": "Calculate return on investment (ROI), net profit, and payback period with our free online calculator.",
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
  );
};

export default ROICalculator; 