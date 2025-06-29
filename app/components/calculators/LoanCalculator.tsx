'use client';

import { useState } from 'react';
import CalculatorLayout from './CalculatorLayout';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(loanTerm) || 0;

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
    });
  };

  const calculatorDescription = (
    <>
      <p className="text-lg text-gray-700">
        Taking out a loan is a significant financial commitment. Whether you're financing a new car,
        buying a home, or consolidating debt with a personal loan, understanding the true cost is
        paramount. This free Loan Calculator is a powerful tool designed to demystify the numbers. It
        helps you accurately forecast your monthly payments, see the total interest you'll pay over the life
        of the loan, and grasp the core concepts of lending.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Use the Loan Payment Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          Our calculator is designed for simplicity and accuracy. To determine your loan details, you only
          need to provide three key pieces of information:
        </p>

        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Loan Amount ($):</h3>
            <p className="text-gray-700">
              This is the total amount of money you intend to borrow, also known as the principal.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Annual Interest Rate (%):</h3>
            <p className="text-gray-700">
              This is the yearly interest rate charged by the lender. Do not enter the Annual Percentage
              Rate (APR) here unless it is identical to the interest rate.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">Loan Term (Years):</h3>
            <p className="text-gray-700">
              This is the duration over which you will repay the loan. Longer terms often mean lower
              monthly payments but higher total interest costs.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const calculatorInterface = (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="5.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (Years)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="5"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Loan
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="mt-8 space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Monthly Payment</div>
              <div className="text-2xl font-bold text-gray-900">
                ${results.monthlyPayment.toFixed(2)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Interest</div>
              <div className="text-2xl font-bold text-gray-900">
                ${results.totalInterest.toFixed(2)}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Payment</div>
              <div className="text-2xl font-bold text-gray-900">
                ${results.totalPayment.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description={calculatorDescription}
      calculator={calculatorInterface}
    />
  );
} 