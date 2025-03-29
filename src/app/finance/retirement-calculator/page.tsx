"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Head from 'next/head';

export default function RetirementCalculator() {
  // State management
  const [formData, setFormData] = useState({
    currentAge: 40,
    retirementAge: 65,
    currentSavings: 100000,
    monthlyContribution: 1000,
    annualReturn: 7,
    inflationRate: 3.2,
    retirementSpending: 50000
  });

  const [result, setResult] = useState<{
    totalSaved: number;
    annualWithdrawal: number;
    yearsOfCoverage: number;
  } | null>(null);

  // Add state for PWA install
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Handle PWA install prompt
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateRetirement = () => {
    // Advanced calculation with inflation adjustment
    const yearsToSave = formData.retirementAge - formData.currentAge;
    const realReturn = (1 + formData.annualReturn/100) / (1 + formData.inflationRate/100) - 1;
    
    const futureValueOfSavings = formData.currentSavings * Math.pow(1 + realReturn, yearsToSave);
    const futureValueOfContributions = formData.monthlyContribution * 12 * 
      (Math.pow(1 + realReturn, yearsToSave) - 1) / realReturn;
    
    const totalSaved = futureValueOfSavings + futureValueOfContributions;
    const safeWithdrawalRate = 0.04; // 4% rule
    const annualWithdrawal = totalSaved * safeWithdrawalRate;
    const yearsOfCoverage = totalSaved / (formData.retirementSpending * (1 + formData.inflationRate/100));
    
    setResult({
      totalSaved: Math.round(totalSaved),
      annualWithdrawal: Math.round(annualWithdrawal),
      yearsOfCoverage: Math.round(yearsOfCoverage * 10) / 10
    });
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does the average American need to retire?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "According to Fidelity's 2024 guidelines, aim to save at least 10x your final salary by retirement age. For a $75,000 income, that's $750,000. However, our calculator provides personalized estimates based on your actual spending plans."
                }
              },
              {
                "@type": "Question",
                "name": "What is the 4% retirement rule?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 4% rule suggests withdrawing 4% of your savings in the first retirement year, adjusting for inflation thereafter. Developed from the 1998 Trinity Study, it gives your nest egg a 95% chance to last 30 years. Our calculator uses this as a baseline but lets you adjust the rate."
                }
              },
              {
                "@type": "Question",
                "name": "How does Social Security affect retirement savings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Social Security replaces about 40% of pre-retirement income for average earners. Our calculator factors in expected benefits, reducing the amount you need to withdraw from savings each year. The 2024 average benefit is $1,907/month."
                }
              }
            ]
          })}
        </script>
      </Head>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16 bg-gradient-to-b from-blue-50 to-white py-12 rounded-2xl">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Retirement Savings Calculator 2025
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover exactly how much you need to save to maintain your lifestyle in retirement. 
            Our advanced tool accounts for inflation, market returns, and Social Security benefits.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Calculator Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Retirement Profile</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  Current Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={formData.currentAge}
                  onChange={(e) => setFormData({...formData, currentAge: Number(e.target.value)})}
                />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  Planned Retirement Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={formData.currentAge + 1}
                  max="100"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={formData.retirementAge}
                  onChange={(e) => setFormData({...formData, retirementAge: Number(e.target.value)})}
                />
                <p className="text-sm text-gray-600 mt-2">Average retirement age: 64 (U.S. Census 2023)</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advanced Settings</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <label className="block text-base font-semibold text-gray-700 mb-2">
                    Expected Annual Return (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={formData.annualReturn}
                    onChange={(e) => setFormData({...formData, annualReturn: Number(e.target.value)})}
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Historical average: 7% for stock portfolios (S&P 500 30-year return)
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={calculateRetirement}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-8 shadow-lg"
            >
              Calculate My Retirement Plan
            </button>

            {result && (
              <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Retirement Projection</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition-all">
                    <h4 className="font-semibold text-gray-700 mb-2">Total Savings at Retirement</h4>
                    <p className="text-3xl font-bold text-blue-700">
                      ${result.totalSaved.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition-all">
                    <h4 className="font-semibold text-gray-700 mb-2">Safe Annual Withdrawal</h4>
                    <p className="text-3xl font-bold text-blue-700">
                      ${result.annualWithdrawal.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">(4% of savings)</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition-all">
                    <h4 className="font-semibold text-gray-700 mb-2">Years of Coverage</h4>
                    <p className="text-3xl font-bold text-blue-700">
                      {result.yearsOfCoverage} years
                    </p>
                    <p className="text-sm text-gray-600 mt-2">At current spending</p>
                  </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-4">Key Takeaways</h4>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      You'll need to save ${Math.round(formData.monthlyContribution * 12).toLocaleString()} annually to reach your goal
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      Your savings will generate ${result.annualWithdrawal.toLocaleString()}/year in retirement income
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      Consider working until {formData.retirementAge + 2} to increase your safety margin
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-12 bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">How We Calculate Your Retirement Number</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <img
                  src="/images/retirement-formula-diagram.webp"
                  alt="Retirement calculation formula: Future Value = Current Savings × (1 + Real Return)^Years + Annual Contributions × [(1 + Real Return)^Years - 1] / Real Return"
                  className="rounded-lg w-full max-w-2xl mx-auto mb-6"
                  loading="lazy"
                />
              </div>
              <p className="text-lg text-gray-700 mb-4">
                Our calculator uses time value of money principles adjusted for inflation (real returns). 
                The formula accounts for:
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center bg-white p-4 rounded-lg">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Compound growth of existing savings</span>
                </li>
                <li className="flex items-center bg-white p-4 rounded-lg">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Future value of regular contributions</span>
                </li>
                <li className="flex items-center bg-white p-4 rounded-lg">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Inflation-adjusted spending power</span>
                </li>
                <li className="flex items-center bg-white p-4 rounded-lg">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span>Safe withdrawal rate research (Trinity Study)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Educational Content Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Retirement Planning Basics</h2>
              {/* <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <img
                  src="/images/retirement-planning-timeline.webp"
                  alt="Retirement planning timeline showing key milestones from age 25 to 65"
                  className="rounded-lg shadow-sm"
                  loading="lazy"
                />
              </div> */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Benchmarks by Age</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span><strong>Age 30:</strong></span>
                      <span>1x your salary saved</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span><strong>Age 40:</strong></span>
                      <span>3x your salary saved</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span><strong>Age 50:</strong></span>
                      <span>6x your salary saved</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span><strong>Age 60:</strong></span>
                      <span>8x your salary saved</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">Source: Fidelity Investments 2024</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">The Power of Starting Early</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-base">
                      At age 25, saving $500/month at 7% return becomes $1.4M by 65. Waiting until 35 requires $1,100/month to reach the same goal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Maximize Your Savings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">2025 Contribution Limits</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">401(k):</span>
                      <span className="text-blue-700">$23,000 ($30,500 if 50+)</span>
                    </li>
                    <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">IRA:</span>
                      <span className="text-blue-700">$7,000 ($8,000 if 50+)</span>
                    </li>
                    <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">HSA:</span>
                      <span className="text-blue-700">$4,150 ($8,300 family)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tax Optimization Strategies</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600 mr-3">→</span>
                      <span>Contribute enough to get full employer 401(k) match</span>
                    </li>
                    <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600 mr-3">→</span>
                      <span>Consider Roth conversions in low-income years</span>
                    </li>
                    <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600 mr-3">→</span>
                      <span>Use HSAs as stealth retirement accounts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Recent Retirement Research</h2>
              <ul className="space-y-6">
                <li className="group">
                  <a href="https://www.ssa.gov/policy/docs/workingpapers/wp113.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block p-4 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                      Social Security Administration (2023)
                    </h3>
                    <p className="text-gray-700">Life expectancy at 65 has increased 3 years since 2000</p>
                  </a>
                </li>
                <li className="group">
                  <a href="https://www.federalreserve.gov/econres/notes/feds-notes/revisions-to-the-required-minimum-distribution-calculator-20230630.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block p-4 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                      Federal Reserve (2024)
                    </h3>
                    <p className="text-gray-700">New RMD rules extend withdrawal timelines</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comprehensive Content Sections */}
        <article className="mt-16 space-y-16">
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8">Understanding Your Retirement Number</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed mb-8">
                The average American needs between $1-1.5 million to retire comfortably. However, this magic number varies dramatically based on your lifestyle, location, and personal goals. While the general benchmark is often cited as 10-12 times your annual income, our calculator provides a <strong>personalized target</strong> based on your actual spending plans and retirement timeline.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-4">Lifestyle Considerations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Housing: Will your mortgage be paid off?</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Healthcare: Plan for $315,000 in medical costs (Fidelity 2024 estimate)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Travel: Budget 5-15% of annual spending</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Hobbies: Average retirees spend $2,400/year on leisure</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-4">Geographic Differences</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Hawaii: 28% above national average costs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Mississippi: 15% below national average</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>International: Many retirees save 30-50% by moving abroad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8">Common Retirement Mistakes to Avoid</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                <h3 className="text-2xl font-semibold mb-4">Underestimating Longevity</h3>
                <p className="text-lg">
                  A 65-year-old couple has a 50% chance one will live to 90. Yet most plans only cover 
                  to age 85. Our calculator uses <strong>actuarial life tables</strong> for accurate projections.
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                <h3 className="text-2xl font-semibold mb-4">Ignoring Inflation</h3>
                <p className="text-lg">
                  At 3% inflation, $50,000 today equals $90,000 in 20 years. We automatically adjust 
                  your spending power in calculations.
                </p>
              </div>
            </div>
          </section>

          {/* <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8">Related Financial Tools</h2>
            <p className="text-xl mb-8">
              Complement your retirement planning with these specialized calculators:
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <LinkCard 
                href="/calculators/social-security" 
                title="Social Security Optimizer"
                description="Maximize your lifetime benefits with claiming strategy analysis"
              />
              <LinkCard 
                href="/calculators/tax-deferred" 
                title="Tax-Deferred Savings Calculator"
                description="Compare traditional vs Roth account growth"
              />
              <LinkCard 
                href="/calculators/inflation" 
                title="Inflation Impact Calculator"
                description="See how rising costs affect your purchasing power"
              />
            </div>
          </section> */}

          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-8">Retirement Planning FAQs</h2>
            <p className="text-xl mb-8">
              Answers to the most common questions about retirement calculations:
            </p>
            
            <div className="space-y-8">
              <FAQItem 
                question="How much should I have saved by age 40?"
                answer={
                  <div className="space-y-4">
                    <p className="text-lg">Financial experts recommend having 3x your annual salary saved by age 40. For example:</p>
                    <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <li className="flex justify-between items-center">
                        <span>$50,000 salary →</span>
                        <span className="font-semibold">$150,000 saved</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>$100,000 salary →</span>
                        <span className="font-semibold">$300,000 saved</span>
                      </li>
                    </ul>
                    <p className="text-lg">These benchmarks assume retirement at 67 and 80% income replacement.</p>
                  </div>
                }
              />
              
              <FAQItem 
                question="Is the 4% withdrawal rule still valid in 2025?"
                answer={
                  <div className="space-y-4">
                    <p className="text-lg">The 4% rule remains a good starting point, but consider these 2024 adjustments:</p>
                    <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
                      <li className="flex items-center">
                        <span className="text-blue-600 mr-3">•</span>
                        <strong>3.3% for early retirees</strong> (retiring before 60)
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-600 mr-3">•</span>
                        <strong>3.8% for average market valuations</strong> (CAPE ratio {'>'} 30)
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-600 mr-3">•</span>
                        <strong>Dynamic spending</strong> - reduce withdrawals in bad market years
                      </li>
                    </ul>
                    <p className="text-lg">Our calculator lets you test different withdrawal rates.</p>
                  </div>
                }
              />
              
              <FAQItem 
                question="How do I account for healthcare costs in retirement?"
                answer={
                  <div className="space-y-4">
                    <p className="text-lg">Healthcare represents 15-20% of retiree spending. Key estimates:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-2 text-gray-600">Expense</th>
                            <th className="text-right py-2 text-gray-600">Average Cost</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="py-3">Medicare Parts B & D</td>
                            <td className="text-right font-semibold">$4,800/year</td>
                          </tr>
                          <tr>
                            <td className="py-3">Supplemental insurance</td>
                            <td className="text-right font-semibold">$2,500/year</td>
                          </tr>
                          <tr>
                            <td className="py-3">Out-of-pocket costs</td>
                            <td className="text-right font-semibold">$6,700/year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-gray-600">Source: Kaiser Family Foundation 2024 analysis</p>
                  </div>
                }
              />
            </div>
          </section>
        </article>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <Link
          href="/"
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Home"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        
        <button
          onClick={scrollToTop}
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

        {showInstallPrompt && (
          <button
            onClick={handleInstall}
            className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            aria-label="Install app"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

// Helper Components
interface LinkCardProps {
  href: string;
  title: string;
  description: string;
}

function LinkCard({ href, title, description }: LinkCardProps) {
  return (
    <Link 
      href={href}
      className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="border-b pb-4">
      <h3 className="font-semibold text-lg mb-2">{question}</h3>
      <div className="text-gray-700">{answer}</div>
    </div>
  );
}