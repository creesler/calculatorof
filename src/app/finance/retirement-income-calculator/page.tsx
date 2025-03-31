"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function RetirementIncomeCalculator() {
  const [savings, setSavings] = useState<number | "">("");
  const [years, setYears] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateIncome = () => {
    if (savings === "" || years === "" || rate === "") {
      setMonthlyIncome(null);
      return;
    }

    const S = Number(savings);
    const r = Number(rate) / 100 / 12; // Convert annual rate to monthly
    const n = Number(years) * 12;

    if (r === 0) {
      setMonthlyIncome(S / n);
    } else {
      const M = (S * r) / (1 - Math.pow(1 + r, -n));
      setMonthlyIncome(M);
    }
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div id="retirement-income-calculator-root" className="w-full">
      {isClient && (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl text-gray-800">
          <h1 className="text-3xl font-bold mb-4">Retirement Income Calculator</h1>
          <p className="text-gray-600 mb-4">
            Plan your financial future with our Retirement Income Calculator. Estimate your monthly income based on your savings, expected return rate, and withdrawal period.
          </p>

          {/* Calculator UI */}
          <div className="space-y-4">
            <label className="block">
              <span className="font-medium">Total Retirement Savings ($)</span>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>

            <label className="block">
              <span className="font-medium">Expected Annual Return (%)</span>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>

            <label className="block">
              <span className="font-medium">Withdrawal Period (Years)</span>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>

            <button
              onClick={calculateIncome}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Calculate Monthly Income
            </button>
          </div>

          {monthlyIncome !== null && (
            <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg">
              <p className="text-lg font-semibold">Estimated Monthly Income: ${formatNumber(monthlyIncome)}</p>
            </div>
          )}
          {/* Understanding Retirement Income */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Understanding Retirement Income</h2>
            <p className="text-gray-700 mt-2">
              Planning for retirement requires careful consideration of income sources, savings, and withdrawal strategies. Many retirees depend on a combination of Social Security, personal savings, and investments. Understanding how these factors interact will help ensure a financially secure retirement.
            </p>
            <p className="text-gray-700 mt-2">
              The biggest challenge in retirement planning is making sure your savings last as long as you do. Longevity, inflation, and unexpected medical expenses can impact financial stability. This calculator helps estimate how much monthly income you can safely withdraw without depleting your funds too soon.
            </p>
            <p className="text-gray-700 mt-2">
              Using a strategic withdrawal plan, such as the 4% rule or a fixed percentage model, can help balance income needs and financial longevity. Proper planning allows retirees to adjust their spending based on economic conditions and lifestyle goals.
            </p>
          </section>

          {/* Image & Calculation Explanation */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">How the Calculator Works</h2>
            <p className="text-gray-700 mt-2">
              This calculator estimates your monthly income using the fixed withdrawal formula:
            </p>

            <Image 
              src="/images/retirement-income-formula.webp" 
              alt="Retirement Income Formula - How to Calculate Monthly Withdrawals" 
              width={600} 
              height={200} 
              className="mt-4 mx-auto rounded-lg"
            />

            <pre className="bg-gray-100 p-4 rounded-lg mt-2 text-sm">
              M = (S × r) / (1 - (1 + r)^-n)
            </pre>
            <ul className="list-disc ml-5 mt-3 text-gray-700">
              <li><strong>S</strong>: Total savings</li>
              <li><strong>r</strong>: Monthly interest rate (annual rate ÷ 12)</li>
              <li><strong>n</strong>: Number of months in retirement</li>
            </ul>
          </section>

          {/* Key Takeaways */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Key Takeaways</h2>
            <ul className="list-disc ml-5 mt-3 text-gray-700">
              <li><strong>Start Early:</strong> The sooner you begin saving, the more you benefit from compound interest.</li>
              <li><strong>Set Realistic Expectations:</strong> Plan for inflation, unexpected expenses, and longer life expectancy.</li>
              <li><strong>Diversify Investments:</strong> A mix of stocks, bonds, and annuities balances risk and ensures stable income.</li>
              <li><strong>Monitor Your Withdrawal Rate:</strong> The 4% rule is a good starting point, but adjustments may be needed.</li>
              <li><strong>Use Tax-Advantaged Accounts:</strong> Maximizing IRA and 401(k) contributions can help reduce tax liabilities.</li>
            </ul>
          </section>

        </div>
      )}
    </div>
  );
}
