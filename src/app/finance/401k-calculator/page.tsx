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
          {/* Header */}
          <h1 className="text-3xl font-bold mb-4">Retirement Income Calculator</h1>
          <p className="text-gray-600 mb-4">
            Plan your financial future with our Retirement Income Calculator. Estimate your monthly income based on your savings, expected return rate, and withdrawal period.
          </p>

          {/* Calculator Interface */}
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

          {/* Results Display */}
          {monthlyIncome !== null && (
            <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg">
              <p className="text-lg font-semibold">
                Estimated Monthly Income: ${formatNumber(monthlyIncome)}
              </p>
            </div>
          )}

          {/* Understanding Retirement Income */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Understanding Retirement Income</h2>
            <p className="text-gray-700 mt-2">
              Your retirement income is determined by various factors, including savings, investment returns, and the duration of your withdrawals. Understanding these components is essential for a financially secure retirement.
            </p>
            <p className="text-gray-700 mt-2">
              A well-structured retirement plan ensures that you do not outlive your savings while maintaining a comfortable lifestyle. This calculator helps you estimate your potential monthly income so you can plan accordingly.
            </p>
          </section>

          {/* How the Calculator Works */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">How the Calculator Works</h2>
            <p className="text-gray-700 mt-2">
              This calculator follows a structured financial formula to determine your estimated monthly income:
            </p>

            <Image 
              src="/images/retirement-income-formula.webp" 
              alt="Formula for calculating retirement income - detailed financial planning for retirement security." 
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
        </div>
      )}
    </div>
  );
}
          {/* Best Practices */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Best Practices for Retirement Planning</h2>
            <ul className="list-disc ml-5 mt-3 text-gray-700">
              <li>Start saving early to maximize compound interest.</li>
              <li>Diversify investments to reduce risk exposure.</li>
              <li>Monitor inflation and adjust withdrawals accordingly.</li>
              <li>Delay Social Security benefits for a higher payout.</li>
              <li>Work with a financial advisor for personalized guidance.</li>
            </ul>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <details className="mt-2 border-b py-2">
              <summary className="font-medium cursor-pointer">How much should I save for retirement?</summary>
              <p className="text-gray-700 mt-2">
                A common rule is to save at least 25 times your annual expenses to ensure financial security.
              </p>
            </details>
            <details className="mt-2 border-b py-2">
              <summary className="font-medium cursor-pointer">What is a good withdrawal rate?</summary>
              <p className="text-gray-700 mt-2">
                The 4% rule suggests withdrawing 4% of your savings annually to make it last 30+ years.
              </p>
            </details>
          </section>
