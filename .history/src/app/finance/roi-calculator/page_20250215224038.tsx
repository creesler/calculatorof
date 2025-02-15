'use client'

import type { FormEvent } from 'react';
import { useState } from 'react';
import { ROIInputs, ROIResults } from '@/types/calculator';
import { calculateROI } from '@/utils/calculations';
import Image from 'next/image';
import FloatingButtons from '@/components/FloatingButtons';
import ShareButtons from '@/components/ShareButtons';

interface ScreenshotExample {
  initialInvestment: number;
  annualRevenue: number;
  annualCosts: number;
  timeframe: number;
  results: {
    roi: number;
    netProfit: number;
    paybackPeriod: number;
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  initialInvestment: 100000,
  annualRevenue: 50000,
  annualCosts: 20000,
  timeframe: 3,
  results: {
    roi: 70.00,
    netProfit: 70000,
    paybackPeriod: 3.33
  }
});

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    initialInvestment: '',
    finalValue: '',
    time: '',
    additionalContribution: '',
    contributionFrequency: 'monthly'
  });
  
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Parse string inputs to numbers
    const parsedInputs = {
      initialInvestment: parseFloat(inputs.initialInvestment) || 0,
      finalValue: parseFloat(inputs.finalValue) || 0,
      time: parseFloat(inputs.time) || 0,
      additionalContribution: parseFloat(inputs.additionalContribution) || 0,
      contributionFrequency: inputs.contributionFrequency
    };

    // Only calculate if we have valid numbers
    if (parsedInputs.initialInvestment && parsedInputs.finalValue && parsedInputs.time) {
      const calculatedResults = calculateROI(parsedInputs);
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  };

  const screenshotExample = getScreenshotExample();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ROI Calculator</h1>
          <ShareButtons />
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Initial Investment
                </label>
                <input
                  type="number"
                  value={inputs.initialInvestment}
                  onChange={(e) => setInputs({...inputs, initialInvestment: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="initial investment"
                />
              </div>

              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Final Value
                </label>
                <input
                  type="number"
                  value={inputs.finalValue}
                  onChange={(e) => setInputs({...inputs, finalValue: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="final value"
                />
              </div>

              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Time Period (years)
                </label>
                <input
                  type="number"
                  value={inputs.time}
                  onChange={(e) => setInputs({...inputs, time: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="time in years"
                />
              </div>

              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Additional Contribution
                </label>
                <input
                  type="number"
                  value={inputs.additionalContribution}
                  onChange={(e) => setInputs({...inputs, additionalContribution: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="additional contribution"
                />
              </div>
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
              src="/images/roicalculator.JPG"
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
              src="/images/roi-formula.jpg"
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
            <li>ROI (above 15%): Considered a good return for most investments</li>
            <li>ROI (above 25%): Excellent performance</li>
            <li>ROI (below 0%): Investment is losing money</li>
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

        {/* Add Schema.org markup for the calculator and article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
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
              },
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Understanding Return on Investment (ROI)",
                "description": "Learn how to calculate and interpret ROI for your investments. Comprehensive guide with formulas, examples, and expert tips.",
                "image": "/images/roicalculator.JPG",
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
                "dateModified": new Date().toISOString().split('T')[0],
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://calculatorof.com/finance/roi-calculator"
                },
                "articleBody": "Return on Investment (ROI) is a crucial financial metric used by investors, business owners, and financial analysts to evaluate the profitability and efficiency of investments. This comprehensive ROI calculator helps you make informed decisions by providing detailed insights into your investment's potential returns.",
                "keywords": "ROI calculator, return on investment, investment calculator, financial planning, business tools, investment analysis"
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a good ROI percentage?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A good ROI typically depends on your industry and risk tolerance. Generally, an ROI of 15-30% is considered good for most investments. However, some industries may accept lower returns while others require higher returns to offset greater risks."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long should I wait before evaluating ROI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The evaluation period depends on your investment type. Short-term investments might be evaluated monthly or quarterly, while long-term investments should be assessed over years to account for market cycles and growth patterns."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </main>
    </div>
  );
} 