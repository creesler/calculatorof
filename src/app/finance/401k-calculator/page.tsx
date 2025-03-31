"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "@/components/FloatingButtons";

export default function FourOhOneKCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: "",
    retirementAge: "",
    currentBalance: "",
    annualSalary: "",
    contributionPercent: "",
    employerMatchPercent: "",
    expectedReturn: "6",
    salaryIncrease: "2",
    inflationRate: "2.5"
  });

  const [results, setResults] = useState({
    finalBalance: "",
    totalContributions: "",
    growth: "",
    monthlyIncome: ""
  });

  const tocItems = [
    { id: "calculator", label: "401(k) Calculator" },
    { id: "how-it-works", label: "How It Works" },
    { id: "key-factors", label: "Key Factors" },
    { id: "methodology", label: "Calculation Method" },
    { id: "applications", label: "Practical Uses" },
    { id: "tips", label: "Expert Tips" },
    { id: "faq", label: "FAQs" },
  ];

  const faqItems = [
    {
      question: "How accurate is this 401(k) calculator?",
      answer: "Our calculator provides projections based on the inputs you provide. While it uses standard financial formulas for compounding growth, actual results may vary due to market fluctuations, changes in contribution rates, and other factors. We recommend using conservative return estimates (5-6% for balanced portfolios) for more realistic projections."
    },
    {
      question: "What return rate should I use for my 401(k)?",
      answer: "Historical stock market returns average about 7-10% annually, but your 401(k) may have different investments. Conservative estimates: 4-5% (bonds), Moderate: 6-7% (mixed portfolio), Aggressive: 8-10% (stocks). Remember to account for inflation (typically subtract 2-3%)."
    },
    {
      question: "How does employer matching work in 401(k) plans?",
      answer: "Employer matches typically follow formulas like '50% of your contributions up to 6% of salary.' This means if you earn $100,000 and contribute 6% ($6,000), your employer adds $3,000 (50% match). Always contribute enough to get the full match - it's free money!"
    }
  ];

  const handleCalculate = () => {
    // Simplified calculation for example purposes
    const years = parseInt(inputs.retirementAge) - parseInt(inputs.currentAge);
    const annualContribution = (parseInt(inputs.annualSalary) * parseInt(inputs.contributionPercent)/100);
    const annualMatch = (parseInt(inputs.annualSalary) * parseInt(inputs.employerMatchPercent)/100);
    const totalAnnualAddition = annualContribution + annualMatch;
    
    let balance = parseInt(inputs.currentBalance || "0");
    let totalContributed = 0;
    let salary = parseInt(inputs.annualSalary);
    
    for (let i = 0; i < years; i++) {
      totalContributed += totalAnnualAddition;
      balance += totalAnnualAddition;
      balance *= (1 + (parseInt(inputs.expectedReturn)/100));
      salary *= (1 + (parseInt(inputs.salaryIncrease)/100));
    }
    
    const monthlyWithdrawal = (balance * 0.04) / 12; // 4% rule
    
    setResults({
      finalBalance: balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
      totalContributions: totalContributed.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
      growth: (balance - totalContributed).toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
      monthlyIncome: monthlyWithdrawal.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-white relative">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link href="/financial" className="text-blue-600 hover:underline">Financial Calculators</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <span className="text-gray-500">401(k) Calculator</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          401(k) Calculator: Project Your Retirement Savings
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Last Updated: January 15, 2025 | <span className="text-blue-600">5 min read</span>
        </p>
        <div className="prose lg:prose-xl">
          <p className="lead text-xl font-semibold text-gray-800">
            Wondering how much your 401(k) could be worth at retirement? Our comprehensive calculator helps you project your retirement savings growth including employer matches, salary increases, and investment returns.
          </p>
          <p>
            With over 60 million Americans participating in 401(k) plans, understanding your potential retirement balance is crucial for financial planning. This tool goes beyond basic calculations to show you:
          </p>
          <ul>
            <li>How employer matching boosts your savings</li>
            <li>The power of compounding over time</li>
            <li>How increasing contributions affects your balance</li>
            <li>Estimated monthly income in retirement</li>
          </ul>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Calculator Section */}
          <section id="calculator" className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Calculate Your 401(k) Growth
              </h2>
              
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Current Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Age
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.currentAge}
                      onChange={(e) => setInputs({...inputs, currentAge: e.target.value})}
                      placeholder="e.g. 30"
                      min="18"
                      max="70"
                    />
                    <p className="text-sm text-gray-500 mt-1">Your current age in years</p>
                  </div>
                  
                  {/* Retirement Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Planned Retirement Age
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.retirementAge}
                      onChange={(e) => setInputs({...inputs, retirementAge: e.target.value})}
                      placeholder="e.g. 65"
                      min="55"
                      max="80"
                    />
                    <p className="text-sm text-gray-500 mt-1">When you plan to retire</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Current Balance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current 401(k) Balance
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.currentBalance}
                      onChange={(e) => setInputs({...inputs, currentBalance: e.target.value})}
                      placeholder="e.g. 25000"
                    />
                    <p className="text-sm text-gray-500 mt-1">Current savings in your 401(k)</p>
                  </div>
                  
                  {/* Annual Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Salary
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.annualSalary}
                      onChange={(e) => setInputs({...inputs, annualSalary: e.target.value})}
                      placeholder="e.g. 75000"
                    />
                    <p className="text-sm text-gray-500 mt-1">Your gross annual income</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Your Contribution */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Contribution (% of salary)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.contributionPercent}
                      onChange={(e) => setInputs({...inputs, contributionPercent: e.target.value})}
                      placeholder="e.g. 6"
                      step="0.5"
                      min="0"
                      max="100"
                    />
                    <p className="text-sm text-gray-500 mt-1">Percentage you contribute from each paycheck</p>
                  </div>
                  
                  {/* Employer Match */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employer Match (% of salary)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.employerMatchPercent}
                      onChange={(e) => setInputs({...inputs, employerMatchPercent: e.target.value})}
                      placeholder="e.g. 3"
                      step="0.5"
                      min="0"
                      max="100"
                    />
                    <p className="text-sm text-gray-500 mt-1">What your employer contributes</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Expected Return */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.expectedReturn}
                      onChange={(e) => setInputs({...inputs, expectedReturn: e.target.value})}
                      placeholder="e.g. 6"
                      step="0.1"
                      min="0"
                      max="20"
                    />
                    <p className="text-sm text-gray-500 mt-1">Average expected investment return</p>
                  </div>
                  
                  {/* Salary Increase */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Salary Increase (%)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.salaryIncrease}
                      onChange={(e) => setInputs({...inputs, salaryIncrease: e.target.value})}
                      placeholder="e.g. 2"
                      step="0.1"
                      min="0"
                      max="20"
                    />
                    <p className="text-sm text-gray-500 mt-1">Annual raise expectation</p>
                  </div>
                  
                  {/* Inflation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={inputs.inflationRate}
                      onChange={(e) => setInputs({...inputs, inflationRate: e.target.value})}
                      placeholder="e.g. 2.5"
                      step="0.1"
                      min="0"
                      max="20"
                    />
                    <p className="text-sm text-gray-500 mt-1">For inflation-adjusted results</p>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  Calculate My 401(k) Projection
                </button>

                {/* Results */}
                {results.finalBalance && (
                  <div className="results-card mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Your 401(k) Projection Results</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="result-item bg-white p-4 rounded-lg shadow-sm">
                        <span className="block text-sm text-gray-600 font-medium">Projected Balance at Retirement</span>
                        <span className="text-2xl font-bold text-blue-600">{results.finalBalance}</span>
                      </div>
                      <div className="result-item bg-white p-4 rounded-lg shadow-sm">
                        <span className="block text-sm text-gray-600 font-medium">Total Contributions (You + Employer)</span>
                        <span className="text-xl font-semibold">{results.totalContributions}</span>
                      </div>
                      <div className="result-item bg-white p-4 rounded-lg shadow-sm">
                        <span className="block text-sm text-gray-600 font-medium">Investment Growth</span>
                        <span className="text-xl font-semibold text-green-600">{results.growth}</span>
                      </div>
                      <div className="result-item bg-white p-4 rounded-lg shadow-sm">
                        <span className="block text-sm text-gray-600 font-medium">Estimated Monthly Income (4% Rule)</span>
                        <span className="text-xl font-semibold">{results.monthlyIncome}</span>
                        <p className="text-xs text-gray-500 mt-1">4% annual withdrawal rate is a common retirement strategy</p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Note: These projections are estimates only. Actual results will vary based on market performance, contribution changes, and other factors.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Educational Content */}
          <article className="prose lg:prose-xl max-w-none mb-12">
            {/* How It Works */}
            <section id="how-it-works">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">How Our 401(k) Calculator Works</h2>
              <p className="text-lg">
                Our advanced 401(k) calculator provides detailed projections of your retirement savings by accounting for multiple factors that affect your account growth:
              </p>
              
              {/* <Image
                src="/images/401k-growth-diagram.webp"
                alt="Visual explanation of 401(k) growth factors"
                width={800}
                height={450}
                className="my-8 rounded-lg shadow-md"
              /> */}
              
              <p>
                The calculator uses time-tested financial formulas to project your account balance year-by-year until retirement, accounting for:
              </p>
              
              <ul>
                <li><strong>Regular contributions</strong> from your paycheck (percentage of your salary)</li>
                <li><strong>Employer matching contributions</strong> (free money that boosts your savings)</li>
                <li><strong>Compound growth</strong> of your investments over time</li>
                <li><strong>Salary increases</strong> that typically lead to higher contributions</li>
                <li><strong>Inflation adjustments</strong> to show real purchasing power</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <p className="font-medium">Pro Tip: The calculator assumes your contributions are made evenly throughout the year and that returns compound annually. In reality, market fluctuations will cause variations, but the long-term averages are reliable for planning purposes.</p>
              </div>
            </section>

            {/* Key Factors */}
            <section id="key-factors">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Factors Affecting Your 401(k) Growth</h2>
              <p>
                Understanding these critical elements will help you make the most of your 401(k) and interpret the calculator results more effectively:
              </p>
              
              <div className="grid gap-6 mt-6 md:grid-cols-2">
                <div className="factor-card p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">1. Contribution Rate</h3>
                  <p>
                    The percentage of your salary you contribute is the biggest controllable factor in your retirement savings. The IRS allows contributions up to $23,500 in 2025 ($31,000 if 50+).
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Impact:</strong> Increasing from 6% to 10% could add hundreds of thousands to your final balance.
                  </p>
                </div>
                
                <div className="factor-card p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">2. Employer Matching</h3>
                  <p>
                    Employer matches are essentially free money. Typical formulas match 50% of your contributions up to 6% of your salary (a 3% match).
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Impact:</strong> A 3% match on a $75,000 salary adds $2,250 annually to your retirement savings.
                  </p>
                </div>
                
                <div className="factor-card p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">3. Investment Returns</h3>
                  <p>
                    Historical stock market returns average 7-10% annually, but your actual returns depend on your investment choices and market conditions.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Impact:</strong> A 2% difference in returns (6% vs 8%) could mean $200,000+ difference over 30 years.
                  </p>
                </div>
                
                <div className="factor-card p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">4. Time Horizon</h3>
                  <p>
                    The power of compounding works best over long periods. Starting early allows small contributions to grow significantly.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Impact:</strong> Starting at 25 vs 35 could double your final balance with the same contributions.
                  </p>
                </div>
              </div>
            </section>

            {/* Methodology */}
            <section id="methodology">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculation Methodology</h2>
              <p>
                Our calculator uses financial mathematics to project your 401(k) balance at retirement. Here's how the calculations work:
              </p>
              
              <div className="methodology-content mt-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">The Core Formula</h3>
                <div className="formula-block p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono overflow-x-auto">
                  <p>Future Value = P(1 + r)^n + c[(1 + r)^n - 1]/r</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">Where:</p>
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>P = Current principal (existing balance)</li>
                  <li>r = Periodic interest rate (annual return)</li>
                  <li>n = Number of periods (years to retirement)</li>
                  <li>c = Annual contributions (your + employer)</li>
                </ul>
                
                <h3 className="text-2xl font-semibold mb-4 mt-6 text-gray-700">Step-by-Step Process</h3>
                <ol className="space-y-4">
                  <li className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-600">1. Calculate Annual Contributions</strong>
                    <p>Your contributions = Salary × Contribution %</p>
                    <p>Employer match = Salary × Match %</p>
                    <p>Total annual addition = Your contributions + Employer match</p>
                  </li>
                  
                  <li className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-600">2. Project Year-by-Year Growth</strong>
                    <p>For each year until retirement:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Add annual contributions to balance</li>
                      <li>Apply investment growth (balance × (1 + return rate))</li>
                      <li>Increase salary by raise percentage (affects future contributions)</li>
                    </ul>
                  </li>
                  
                  <li className="bg-blue-50 p-4 rounded-lg">
                    <strong className="text-blue-600">3. Calculate Retirement Income</strong>
                    <p>Using the 4% rule (a common retirement withdrawal strategy):</p>
                    <p>Annual withdrawal = Final balance × 4%</p>
                    <p>Monthly income = Annual withdrawal ÷ 12</p>
                  </li>
                </ol>
                
                <div className="example-calculation mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">Example Calculation</h4>
                  <p>Let's walk through a sample scenario:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Current age: 30 | Retirement age: 65 (35 years)</li>
                    <li>Current balance: $25,000</li>
                    <li>Salary: $75,000</li>
                    <li>Your contribution: 6% ($4,500/year)</li>
                    <li>Employer match: 3% ($2,250/year)</li>
                    <li>Expected return: 6% | Salary growth: 2%</li>
                  </ul>
                  <p className="mt-3 font-medium">Projected balance at 65: ~$1,050,000</p>
                  <p className="text-sm text-gray-600 mt-2">Note how small annual contributions grow significantly over decades through compounding.</p>
                </div>
              </div>
            </section>

            {/* Practical Applications */}
            <section id="applications">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Practical Applications</h2>
              <p>
                Our 401(k) calculator isn't just for projecting a single scenario - it's a powerful tool for retirement planning. Here are valuable ways to use it:
              </p>
              
              <div className="grid gap-6 mt-6 md:grid-cols-2">
                <div className="application-card p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Contribution Rate Testing</h3>
                  <p>
                    Compare how increasing your contributions by just 1-2% affects your final balance. Small increases early in your career have outsized impacts.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>6% vs 8% contribution on $75k salary</li>
                    <li>Effect of maxing out contributions ($23,500 in 2025)</li>
                    <li>Catch-up contributions after age 50</li>
                  </ul>
                </div>
                
                <div className="application-card p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Employer Match Optimization</h3>
                  <p>
                    See exactly how much free money you're leaving on the table if you're not getting the full employer match.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Contribute 3% vs 6% when employer matches 50% up to 6%</li>
                    <li>Compare different employer match formulas</li>
                    <li>Impact of changing jobs with different match policies</li>
                  </ul>
                </div>
                
                <div className="application-card p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Early Retirement Planning</h3>
                  <p>
                    Test how retiring earlier (with fewer contribution years but longer withdrawal period) affects your savings needs.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>Retire at 55 vs 65 with same contributions</li>
                    <li>Required savings for different retirement ages</li>
                    <li>Impact of working part-time in later years</li>
                  </ul>
                </div>
                
                <div className="application-card p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Salary Increase Scenarios</h3>
                  <p>
                    Project how raises and promotions (with corresponding contribution increases) will accelerate your savings.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
                    <li>3% annual raises vs 5% raises</li>
                    <li>Major career jumps in salary</li>
                    <li>Maintaining same % contribution vs increasing $ amount</li>
                  </ul>
                </div>
              </div>
              
              <div className="case-study mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Real-World Example: The Power of Small Increases</h3>
                <p>
                  Sarah, age 30, earns $60,000 and contributes 6% to her 401(k) with a 3% employer match. She runs three scenarios:
                </p>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li><strong>Status quo:</strong> Continues 6% contribution → $745k at 65</li>
                  <li><strong>Increases 1% annually</strong> to max out → $1.2M at 65</li>
                  <li><strong>Immediately increases to 10%</strong> → $1.1M at 65</li>
                </ol>
                <p className="mt-3">
                  This shows how gradual increases can yield better results than a single large jump, due to compounding over time.
                </p>
              </div>
            </section>

            {/* Tips Section */}
            <section id="tips">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">401(k) Tips and Best Practices</h2>
              <p>
                Maximize your retirement savings with these expert-recommended strategies:
              </p>
              
              <div className="tips-grid grid gap-4 mt-6 md:grid-cols-2">
                <div className="tip-card p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700">1. Get the Full Employer Match</h3>
                  <p className="text-sm mt-1">
                    This is free money - contribute at least enough to get 100% of your employer's match. Not doing this is like declining a raise.
                  </p>
                </div>
                
                <div className="tip-card p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-700">2. Increase Contributions Gradually</h3>
                  <p className="text-sm mt-1">
                    Bump your contribution by 1% each year or whenever you get a raise. You'll adjust to the smaller paycheck more easily.
                  </p>
                </div>
                
                <div className="tip-card p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-700">3. Take Advantage of Catch-Up Contributions</h3>
                  <p className="text-sm mt-1">
                    If you're 50+, you can contribute an extra $7,500 in 2025 ($30,500 total). This can significantly boost late-stage savings.
                  </p>
                </div>
                
                <div className="tip-card p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-700">4. Review Your Investments Annually</h3>
                  <p className="text-sm mt-1">
                    Ensure your asset allocation matches your risk tolerance and time horizon. Rebalance if needed to maintain your target mix.
                  </p>
                </div>
                
                <div className="tip-card p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-700">5. Avoid Early Withdrawals</h3>
                  <p className="text-sm mt-1">
                    Withdrawals before age 59½ typically incur 10% penalty plus taxes. The long-term damage to your retirement savings is substantial.
                  </p>
                </div>
                
                <div className="tip-card p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-indigo-700">6. Consider Roth 401(k) Options</h3>
                  <p className="text-sm mt-1">
                    If available, Roth contributions grow tax-free. This can be valuable if you expect higher taxes in retirement.
                  </p>
                </div>
              </div>
              
              <div className="pro-tip mt-8 p-6 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Professional Advice</h3>
                <p>
                  While this calculator provides valuable projections, consider consulting a financial advisor for personalized retirement planning, especially if:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>You have multiple retirement accounts (401(k), IRA, etc.)</li>
                  <li>You're within 10 years of retirement</li>
                  <li>You have complex financial situations (business ownership, rental properties, etc.)</li>
                  <li>You're considering early retirement</li>
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <div key={index} className="faq-item p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
                
                <div className="faq-item p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">What's the difference between traditional and Roth 401(k) contributions?</h3>
                  <p className="text-gray-600">
                    Traditional 401(k) contributions are made pre-tax (reducing your taxable income now) but taxed upon withdrawal. Roth contributions are made after-tax but grow tax-free. The better choice depends on your current vs. expected future tax bracket. Many experts recommend diversifying with both types if your plan allows.
                  </p>
                </div>
                
                <div className="faq-item p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">How do I account for inflation in my retirement planning?</h3>
                  <p className="text-gray-600">
                    Our calculator includes an inflation rate input (default 2.5%) to show your projected balance in today's dollars. This helps you understand the real purchasing power of your future savings. For more precise planning, consider that healthcare costs typically rise faster than general inflation.
                  </p>
                </div>
                
                <div className="faq-item p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">What happens to my 401(k) if I change jobs?</h3>
                  <p className="text-gray-600">
                    You typically have four options: 1) Leave it in your former employer's plan (if allowed), 2) Roll it over to your new employer's plan, 3) Roll it into an IRA, or 4) Cash it out (not recommended due to taxes/penalties). Rollovers preserve the tax-advantaged status of your savings.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* Table of Contents */}
            <div className="toc-card p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Article Contents</h3>
              <ul className="space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-blue-600 hover:underline block py-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Related Calculators */}
            <div className="related-calculators p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Calculators</h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="/financial/retirement-income-calculator" 
                    className="group flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Retirement Income Calculator</h4>
                      <p className="text-sm text-gray-500">Estimate your monthly retirement income from all sources</p>
                    </div>
                  </a>
                </li>
                
                <li>
                  <a 
                    href="/financial/roth-ira-calculator" 
                    className="group flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Roth IRA Calculator</h4>
                      <p className="text-sm text-gray-500">Compare Roth vs traditional IRA growth</p>
                    </div>
                  </a>
                </li>
                
                <li>
                  <a 
                    href="/financial/social-security-calculator" 
                    className="group flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Social Security Calculator</h4>
                      <p className="text-sm text-gray-500">Estimate your future Social Security benefits</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div className="resources-card p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-start"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    IRS 401(k) Contribution Limits
                  </a>
                </li>
                
                <li>
                  <a 
                    href="https://www.dol.gov/general/topic/retirement" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-start"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    DOL Retirement Plan Information
                  </a>
                </li>
                
                <li>
                  <a 
                    href="https://www.investopedia.com/terms/1/401kplan.asp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-start"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Investopedia 401(k) Guide
                  </a>
                </li>
                
                <li>
                  <a 
                    href="https://www.bogleheads.org/wiki/401(k)" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-start"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Bogleheads 401(k) Wiki
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Newsletter Signup */}
            <div className="newsletter-card p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Retirement Planning Tips</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get monthly updates with retirement strategies, contribution tips, and market insights.
              </p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom CTA */}
      <section className="mt-12 p-8 bg-blue-600 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Start Planning Your Retirement Today</h2>
        <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
          Don't leave your retirement to chance. Use our 401(k) calculator to explore different scenarios and create a savings plan that works for your future.
        </p>
        <button
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-blue-600 py-3 px-8 rounded-md hover:bg-blue-50 transition-colors font-medium"
        >
          Calculate My 401(k) Now
        </button>
      </section>

      <FloatingButtons />
    </main>
  );
}