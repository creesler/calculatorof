'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { BMIInputs, BMIResults } from '@/types/calculator'
import { calculateBMI } from '@/utils/calculations'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import ShareButtons from '@/components/ShareButtons'
import { siteConfig } from '@/app/seo-config'

interface ScreenshotExample {
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
  results: {
    bmi: number;
    category: string;
    healthyWeightRange: {
      min: number;
      max: number;
    };
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  weight: 70,
  height: 170,
  unit: 'metric',
  results: {
    bmi: 24.2,
    category: 'Normal weight',
    healthyWeightRange: {
      min: 53.6,
      max: 72.2
    }
  }
});

export default function BMICalculator() {
  const [inputs, setInputs] = useState<{
    weight: string;
    height: string;
    unit: 'metric' | 'imperial';
  }>({
    weight: '',
    height: '',
    unit: 'metric'
  })
  
  const [results, setResults] = useState<BMIResults | null>(null)

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Parse string inputs to numbers
    const parsedInputs: BMIInputs = {
      weight: parseFloat(inputs.weight) || 0,
      height: parseFloat(inputs.height) || 0,
      unit: inputs.unit
    }

    // Only calculate if we have valid numbers
    if (parsedInputs.weight && parsedInputs.height) {
      const calculatedResults = calculateBMI(parsedInputs)
      setResults(calculatedResults)
    } else {
      setResults(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
          <ShareButtons
            title="BMI Calculator - CalculatorOf.com"
            description="Calculate your Body Mass Index (BMI) with this free online calculator. Get instant health insights and recommendations."
          />
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="flex flex-col space-y-4">
              {/* Unit Selection */}
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, unit: 'metric'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.unit === 'metric' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({...inputs, unit: 'imperial'})}
                  className={`px-4 py-2 rounded-full ${
                    inputs.unit === 'imperial' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Imperial
                </button>
              </div>

              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Weight ({inputs.unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={inputs.weight}
                  onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder={`weight in ${inputs.unit === 'metric' ? 'kilograms' : 'pounds'}`}
                />
              </div>

              <div className="flex flex-col">
                <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2 shadow-sm">
                  Height ({inputs.unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={inputs.height}
                  onChange={(e) => setInputs({...inputs, height: e.target.value})}
                  className="w-full p-2 border rounded text-center"
                  placeholder={`height in ${inputs.unit === 'metric' ? 'centimeters' : 'inches'}`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate BMI
            </button>
          </form>

          {results && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Your Results</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium">BMI</h3>
                <p className="text-2xl font-bold text-blue-600">{results.bmi}</p>
                <p className="text-lg text-gray-600">{results.category}</p>
              </div>
            </div>
          )}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12">
          <h2>Understanding BMI</h2>
          <p>
            Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if your weight
            is healthy. The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
          </p>

          <div className="my-8">
            <Image
              src="/images/bmicalculator.jpg"
              alt="BMI Categories Chart showing underweight, normal, overweight, and obese ranges"
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="my-8">
            <Image
              src="/images/bmi-formula.jpg"
              alt="BMI Formula: BMI = weight(kg) / height²(m)"
              width={600}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>

          <h3>BMI Categories</h3>
          <ul>
            <li>Underweight = less than 18.5</li>
            <li>Normal weight = 18.5 to 24.9</li>
            <li>Overweight = 25 to 29.9</li>
            <li>Obesity = BMI of 30 or greater</li>
          </ul>
          
          <h3>Free Online Body Mass Index Calculator Tool</h3>
          <p>
            Our free BMI calculator provides an easy way to determine your Body Mass Index and assess your weight category.
            Simply enter your weight and height using either metric (kilograms/centimeters) or imperial (pounds/inches) units.
            The calculator automatically applies the BMI formula and provides your result instantly.
          </p>
          
          <h3>Health Implications of Different BMI Categories</h3>
          <p>
            Each BMI category is associated with different health implications:
          </p>
          <ul>
            <li><strong>Underweight</strong>: May indicate malnutrition, eating disorders, or other health problems requiring medical attention.</li>
            <li><strong>Normal weight</strong>: Associated with the lowest health risks for most adults. Maintaining a BMI in this range is recommended for optimal health.</li>
            <li><strong>Overweight</strong>: Increased risk for heart disease, high blood pressure, type 2 diabetes, and other weight-related health issues.</li>
            <li><strong>Obesity</strong>: Significantly higher risk for serious health conditions including cardiovascular disease, stroke, sleep apnea, and certain cancers.</li>
          </ul>

          <h3>Benefits of Regular BMI Monitoring</h3>
          <ul>
            <li><strong>Quick Health Assessment</strong>: Get immediate feedback on your weight status</li>
            <li><strong>Weight Management Tool</strong>: Track your progress over time</li>
            <li><strong>Health Risk Awareness</strong>: Understand potential health risks associated with your BMI</li>
            <li><strong>Goal Setting</strong>: Establish realistic weight goals based on BMI recommendations</li>
            <li><strong>Easy to Use</strong>: Simple interface with both metric and imperial options</li>
            <li><strong>Free and Accessible</strong>: No cost, no registration required</li>
          </ul>

          <h3>Limitations of BMI Measurements</h3>
          <p>
            While BMI is a useful screening tool, it has some limitations to keep in mind:
          </p>
          <ul>
            <li>Doesn't distinguish between muscle and fat weight</li>
            <li>May not be accurate for athletes, bodybuilders, or people with high muscle mass</li>
            <li>May not be suitable for pregnant or breastfeeding women</li>
            <li>Doesn't account for age-related muscle loss in older adults</li>
            <li>Doesn't consider fat distribution (where you carry your weight)</li>
            <li>May have different implications for different ethnic groups</li>
          </ul>

          <h3 className="mt-8">Frequently Asked Questions About BMI</h3>
          <div className="space-y-6 mt-4">
            <div className="mb-4">
              <h4 className="text-xl font-semibold">What is a healthy BMI range?</h4>
              <p>
                A BMI between 18.5 and 24.9 is considered healthy for most adults. However, this range may not be
                suitable for all body types and ethnicities. Some people may be healthy at BMIs slightly outside
                this range depending on factors like muscle mass, age, and body composition.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">Why might BMI not be accurate for everyone?</h4>
              <p>
                BMI doesn't distinguish between weight from muscle and weight from fat. Athletes with high muscle
                mass might have a high BMI but be healthy. Similarly, elderly people might have a normal BMI but
                low muscle mass. BMI also doesn't account for differences in body composition between different ethnic groups.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xl font-semibold">How often should I check my BMI?</h4>
              <p>
                For most adults, checking BMI once or twice a year is sufficient unless you're actively trying to lose
                or gain weight. If you're on a weight management program, you might want to check more frequently to
                track progress, but avoid obsessive monitoring as weight naturally fluctuates.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xl font-semibold">What's the difference between BMI and body fat percentage?</h4>
              <p>
                BMI is calculated solely from height and weight, while body fat percentage measures the actual proportion
                of fat in your body. Body fat percentage is more accurate for assessing health risks but requires specialized
                equipment to measure properly. BMI is easier to calculate and serves as a useful screening tool.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xl font-semibold">Can children use this BMI calculator?</h4>
              <p>
                This calculator is designed for adults. For children and teens (ages 2-19), BMI is calculated the same way
                but interpreted differently. Children's BMI should be assessed using age and sex-specific percentiles rather
                than the fixed categories used for adults. Please consult a pediatrician for proper assessment of a child's BMI.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">How is BMI calculated?</h4>
              <p>
                BMI is calculated using the formula: BMI = weight(kg) / height²(m). In imperial units, the formula is:
                BMI = 703 × weight(lb) / height²(in). Our calculator automatically handles the conversion based on your
                selected unit system, so you don't need to convert measurements manually.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">What health risks are associated with a high BMI?</h4>
              <p>
                A BMI in the overweight or obese range is associated with increased risk of several health conditions, including:
                type 2 diabetes, heart disease, stroke, certain cancers, sleep apnea, osteoarthritis, fatty liver disease,
                kidney disease, and pregnancy complications. However, BMI alone cannot predict an individual's health risks.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">What health risks are associated with a low BMI?</h4>
              <p>
                A BMI below 18.5 (underweight) is associated with health risks such as: malnutrition, vitamin deficiencies,
                anemia, osteoporosis, decreased immune function, fertility issues, and complications from surgery. Being
                underweight can be a sign of underlying health conditions and should be discussed with a healthcare provider.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">How can I achieve a healthy BMI?</h4>
              <p>
                Achieving a healthy BMI involves balanced nutrition, regular physical activity, and healthy lifestyle habits.
                Focus on eating a variety of nutrient-dense foods, controlling portion sizes, staying hydrated, getting regular
                exercise (both cardio and strength training), managing stress, and getting adequate sleep. Consult with healthcare
                professionals before starting any weight management program.
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-semibold">Does BMI vary by age and gender?</h4>
              <p>
                While the standard BMI categories are the same for adult men and women, body composition naturally changes with age.
                Older adults typically have more body fat than younger adults at the same BMI. Some health organizations suggest
                slightly higher BMI ranges may be acceptable for older adults. For children and teens, BMI is age and gender-specific.
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
} 