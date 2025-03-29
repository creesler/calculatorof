"use client";

import { useState } from "react";

export default function TestCalculator() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    // Simple test calculation - just doubles the number
    const calculatedResult = parseFloat(value) * 2;
    setResult(calculatedResult.toString());
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Test Calculator</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Enter a number
            </label>
            <input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter a number"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Calculate
          </button>
          {result && (
            <div className="mt-4">
              <p className="font-bold">Result: {result}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 