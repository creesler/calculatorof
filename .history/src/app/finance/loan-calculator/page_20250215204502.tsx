'use client'

import type { FormEvent } from 'react';
import { useState } from 'react';
import { LoanInputs, LoanResults } from '@/types/calculator';
import { calculateLoan } from '@/utils/calculations';
import Image from 'next/image';
import FloatingButtons from '@/components/FloatingButtons';

interface ScreenshotExample {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
  results: {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  loanAmount: 250000,
  interestRate: 5.5,
  loanTerm: 30,
  paymentFrequency: 'monthly',
  results: {
    monthlyPayment: 1419.47,
    totalPayment: 511009.20,
    totalInterest: 261009.20
  }
});

export default function LoanCalculator() {
  const [inputs, setInputs] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    paymentFrequency: 'monthly'
  });
  
  const [results, setResults] = useState<LoanResults | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculateLoan(inputs);
    setResults(calculatedResults);
  };

  const screenshotExample = getScreenshotExample();

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        <FloatingButtons />

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Loan Calculator</h1>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    value={inputs.loanAmount}
                    onChange={(e) => setInputs({...inputs, loanAmount: e.target.value})}
                    className="w-full p-2 border rounded text-center"
                    placeholder="loan amount"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs({...inputs, interestRate: e.target.value})}
                    className="w-full p-2 border rounded text-center"
                    placeholder="interest rate"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                    Loan Term (years)
                  </label>
                  <input
                    type="number"
                    value={inputs.loanTerm}
                    onChange={(e) => setInputs({...inputs, loanTerm: e.target.value})}
                    className="w-full p-2 border rounded text-center"
                    placeholder="loan term"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Frequency
                  <select
                    value={inputs.paymentFrequency}
                    onChange={(e) => setInputs({...inputs, paymentFrequency: e.target.value as LoanInputs['paymentFrequency']})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate Loan
              </button>
            </form>

            {results && (
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Monthly Payment</h3>
                    <p className="text-2xl font-bold text-blue-600">${results.monthlyPayment}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Total Payment</h3>
                    <p className="text-2xl font-bold text-green-600">${results.totalPayment}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Total Interest</h3>
                    <p className="text-2xl font-bold text-purple-600">${results.totalInterest}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                </button>

                {showAmortization && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment #</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.amortizationSchedule.map((row, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${row.payment}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${row.principal}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${row.interest}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${row.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12">
            <h2>Understanding Loan Calculations</h2>
            <p>
              A loan calculator helps you estimate your monthly payments and understand the total cost of borrowing. 
              Whether you're planning to take out a mortgage, auto loan, or personal loan, this calculator provides 
              detailed insights into your loan's payment structure and total interest costs.
            </p>

            <div className="my-8">
              <Image
                src="/images/loancalculator.JPG"
                alt="Loan Calculator interface showing payment calculation with input fields for loan amount, interest rate, and term"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <h3>How Loan Payments Are Calculated</h3>
            <p>
              The loan payment formula uses these key components:
            </p>
            
            <div className="my-8">
              <Image
                src="/images/loan-formula.jpg"
                alt="Loan Payment Formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]"
                width={600}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>

            <p>
              Our calculator provides three essential metrics:
            </p>
            <ul>
              <li><strong>Monthly Payment:</strong> Your regular payment amount</li>
              <li><strong>Total Payment:</strong> The total amount you'll pay over the loan term</li>
              <li><strong>Total Interest:</strong> The cost of borrowing</li>
            </ul>

            <h3>When to Use This Loan Calculator</h3>
            <p>
              This calculator is particularly useful for:
            </p>
            <ul>
              <li>Mortgage planning</li>
              <li>Auto loan comparison</li>
              <li>Personal loan evaluation</li>
              <li>Debt consolidation analysis</li>
              <li>Business loan planning</li>
            </ul>

            <h3>Understanding Your Results</h3>
            <p>
              The calculator provides detailed insights into your loan:
            </p>
            <ul>
              <li>Monthly payments help with budgeting</li>
              <li>Total interest shows the cost of borrowing</li>
              <li>Amortization schedule details the loan payoff process</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3>Expert Tip</h3>
              <p>
                Consider making extra payments to reduce the total interest paid and shorten your loan term. 
                Even small additional payments can make a significant difference over time.
              </p>
            </div>

            <h3>Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">How can I lower my monthly payments?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    You can lower your monthly payments by extending the loan term, finding a lower interest rate, 
                    making a larger down payment, or borrowing a smaller amount. However, note that a longer term 
                    will increase the total interest paid.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">Should I choose weekly or monthly payments?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    More frequent payments (weekly or bi-weekly) can help you pay off your loan faster and reduce 
                    total interest costs. However, choose a payment schedule that aligns with your income frequency 
                    to ensure consistent payments.
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
                  "name": "Loan Calculator",
                  "applicationCategory": "FinanceApplication",
                  "operatingSystem": "Any",
                  "description": "Calculate loan payments, total interest, and view amortization schedule with our free online calculator.",
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
                  "headline": "Understanding Loan Calculations",
                  "description": "Learn how to calculate and understand loan payments. Comprehensive guide with formulas, examples, and expert tips.",
                  "image": "/images/loancalculator.JPG",
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
                    "@id": "https://calculatorof.com/finance/loan-calculator"
                  }
                }
              ])
            }}
          />
        </main>
      </div>
    </>
  );
} 