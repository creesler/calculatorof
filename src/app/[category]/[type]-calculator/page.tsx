"use client";

import { useState } from "react";
import type { FormEvent } from 'react';
import Image from "next/image";
import Link from "next/link";
import FloatingButtons from "@/components/FloatingButtons";
import ShareButtons from "@/components/ShareButtons";
import { useParams } from "next/navigation";
import { getCalculatorBySlug } from "@/app/seo-config";
import { CalculatorInputs, CalculatorResults } from "@/types/calculator";

export default function TypeCalculator() {
  const params = useParams();
  const type = typeof params?.type === 'string' ? params.type : '';
  const calculator = type ? getCalculatorBySlug(type) : null;

  // Calculator State
  const [inputs, setInputs] = useState({
    initialValue: "",
    finalValue: "",
    time: "",
    additionalValue: "",
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);

  // Calculation Logic
  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Parse string inputs to numbers
    const parsedInputs: CalculatorInputs = {
      initialValue: parseFloat(inputs.initialValue) || 0,
      finalValue: parseFloat(inputs.finalValue) || 0,
      time: parseFloat(inputs.time) || 0,
      additionalValue: parseFloat(inputs.additionalValue) || 0,
    };

    // Only calculate if we have valid numbers
    if (parsedInputs.initialValue && parsedInputs.finalValue && parsedInputs.time) {
      // Add your calculation logic here
      const calculatedResults: CalculatorResults = {
        mainResult: 0,
        netValue: 0,
        additionalMetric: 0
      };
      setResults(calculatedResults);
    } else {
      setResults(null);
    }
  };

  if (!calculator) {
    return <div>Calculator not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{calculator.name}</h1>
          <ShareButtons />
        </div>

        {/* Calculator Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="flex flex-col space-y-4">
              {/* Initial Value Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Initial Value
                </label>
                <input
                  type="number"
                  value={inputs.initialValue}
                  onChange={(e) => setInputs({...inputs, initialValue: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="Enter initial value"
                />
              </div>

              {/* Final Value Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Final Value
                </label>
                <input
                  type="number"
                  value={inputs.finalValue}
                  onChange={(e) => setInputs({...inputs, finalValue: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="Enter final value"
                />
              </div>

              {/* Time Period Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Time Period
                </label>
                <input
                  type="number"
                  value={inputs.time}
                  onChange={(e) => setInputs({...inputs, time: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="Enter time period"
                />
              </div>

              {/* Additional Value Input */}
              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Additional Value
                </label>
                <input
                  type="number"
                  value={inputs.additionalValue}
                  onChange={(e) => setInputs({...inputs, additionalValue: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder="Enter additional value"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
          </form>

          {/* Results Section */}
          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Main Result</h3>
                  <p className="text-2xl font-bold text-blue-600">{results.mainResult}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Net Value</h3>
                  <p className="text-2xl font-bold text-green-600">${results.netValue}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Additional Metric</h3>
                  <p className="text-2xl font-bold text-purple-600">{results.additionalMetric}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Understanding {calculator.name}</h2>
          <p>{calculator.description}</p>

          <div className="my-8">
            <Image
              src="/images/calculator-diagram.jpg"
              alt="Visual explanation of calculation process"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <h3>How It Works</h3>
          <p>This calculator uses the following formula:</p>
          <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-sm">
            [Formula explanation goes here]
          </div>

          <h3>When to Use This Calculator</h3>
          <p>This calculator is particularly useful for:</p>
          <ul>
            <li>Use case 1 with detailed explanation</li>
            <li>Use case 2 with detailed explanation</li>
            <li>Use case 3 with detailed explanation</li>
          </ul>

          <h3>Understanding Your Results</h3>
          <div className="grid gap-4 my-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold">Main Result</h4>
              <p>Explanation of what the main result means and how to interpret it.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold">Net Value</h4>
              <p>Explanation of what the net value represents and its significance.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold">Additional Metric</h4>
              <p>Explanation of what the additional metric means and when it's important.</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg my-8">
            <h3 className="text-xl font-bold text-blue-900">Expert Tips</h3>
            <ul className="mt-4 space-y-2">
              <li>Important tip 1 with explanation</li>
              <li>Important tip 2 with explanation</li>
              <li>Important tip 3 with explanation</li>
            </ul>
          </div>

          <h3>Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold">Common Question 1?</h4>
              <p>Detailed answer to the first common question about using this calculator.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold">Common Question 2?</h4>
              <p>Detailed answer to the second common question about using this calculator.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold">Common Question 3?</h4>
              <p>Detailed answer to the third common question about using this calculator.</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
} 