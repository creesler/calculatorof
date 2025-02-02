import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { CalorieInputs, CalorieResults } from '@/types/calculator';
import { calculateCalories } from '@/utils/calculations';
import Image from 'next/image';
import Link from 'next/link';
import FloatingButtons from '@/components/FloatingButtons';

interface ScreenshotExample {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'maintain' | 'lose' | 'gain';
  results: {
    bmr: number;
    dailyCalories: number;
    macronutrients: {
      protein: number;
      carbs: number;
      fats: number;
    };
    weeklyGoal: number;
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  age: 30,
  gender: 'male',
  weight: 70,
  height: 170,
  unit: 'metric',
  activityLevel: 'moderate',
  goal: 'maintain',
  results: {
    bmr: 1550,
    dailyCalories: 2400,
    macronutrients: {
      protein: 180,
      carbs: 240,
      fats: 80
    },
    weeklyGoal: 0
  }
});

const CalorieCalculator = () => {
  const [inputs, setInputs] = useState<CalorieInputs>({
    age: 0,
    gender: 'male',
    weight: 0,
    height: 0,
    unit: 'metric',
    activityLevel: 'moderate',
    goal: 'maintain'
  });
  
  const [results, setResults] = useState<CalorieResults | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculateCalories(inputs);
    setResults(calculatedResults);
  };

  const screenshotExample = getScreenshotExample();

  const activityLevels = {
    sedentary: 'Little or no exercise',
    light: 'Light exercise 1-3 times/week',
    moderate: 'Moderate exercise 3-5 times/week',
    active: 'Heavy exercise 6-7 times/week',
    veryActive: 'Very heavy exercise, physical job'
  };

  const goals = {
    maintain: 'Maintain weight',
    lose: 'Lose weight (-0.5kg/week)',
    gain: 'Gain weight (+0.5kg/week)'
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        {/* Add fixed position buttons */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Go to top"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </button>
          
          <Link 
            href="/"
            className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            aria-label="Go to home"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
          </Link>
        </div>

        <Head>
          <title>Calorie Calculator | CalculatorOf.com - Calculate Your Daily Calorie Needs</title>
          <meta 
            name="description" 
            content="Free calorie calculator at CalculatorOf.com. Calculate your daily calorie needs, BMR, and macronutrient ratios based on your goals and activity level." 
          />
          <meta name="keywords" content="calorie calculator, BMR calculator, TDEE calculator, macronutrient calculator, diet calculator, nutrition calculator, CalculatorOf" />
          <meta property="og:title" content="Calorie Calculator | CalculatorOf.com" />
          <meta property="og:description" content="Calculate your daily calorie needs and macronutrient ratios with our free calorie calculator at CalculatorOf.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/calculatorof.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Calorie Calculator | CalculatorOf.com" />
          <meta name="twitter:description" content="Calculate your daily calorie needs instantly with our free calculator" />
          <meta name="twitter:image" content="/images/calculatorof.png" />
          <link rel="canonical" href="https://calculatorof.com/health/calorie-calculator" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Calorie Calculator</h1>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="flex justify-center space-x-4 mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={inputs.unit === 'metric'}
                    onChange={() => setInputs({...inputs, unit: 'metric'})}
                  />
                  <span className="ml-2">Metric (kg/cm)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={inputs.unit === 'imperial'}
                    onChange={() => setInputs({...inputs, unit: 'imperial'})}
                  />
                  <span className="ml-2">Imperial (lb/in)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age (years)
                    <input
                      type="number"
                      value={inputs.age || ''}
                      onChange={(e) => setInputs({...inputs, age: Number(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={screenshotExample.age.toString()}
                      required
                      min="15"
                      max="120"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                    <select
                      value={inputs.gender}
                      onChange={(e) => setInputs({...inputs, gender: e.target.value as 'male' | 'female'})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {inputs.unit === 'metric' ? 'Weight (kg)' : 'Weight (lb)'}
                    <input
                      type="number"
                      value={inputs.weight || ''}
                      onChange={(e) => setInputs({...inputs, weight: Number(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={screenshotExample.weight.toString()}
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {inputs.unit === 'metric' ? 'Height (cm)' : 'Height (in)'}
                    <input
                      type="number"
                      value={inputs.height || ''}
                      onChange={(e) => setInputs({...inputs, height: Number(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={screenshotExample.height.toString()}
                      required
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Activity Level
                  <select
                    value={inputs.activityLevel}
                    onChange={(e) => setInputs({...inputs, activityLevel: e.target.value as CalorieInputs['activityLevel']})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(activityLevels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal
                  <select
                    value={inputs.goal}
                    onChange={(e) => setInputs({...inputs, goal: e.target.value as CalorieInputs['goal']})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(goals).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate Calories
              </button>
            </form>

            {results && (
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Basal Metabolic Rate (BMR)</h3>
                    <p className="text-2xl font-bold text-blue-600">{results.bmr} calories/day</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Daily Calories Needed</h3>
                    <p className="text-2xl font-bold text-green-600">{results.dailyCalories} calories/day</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Recommended Macronutrients</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Protein</p>
                      <p className="text-xl font-bold text-purple-600">{results.macronutrients.protein}g</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Carbs</p>
                      <p className="text-xl font-bold text-purple-600">{results.macronutrients.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fats</p>
                      <p className="text-xl font-bold text-purple-600">{results.macronutrients.fats}g</p>
                    </div>
                  </div>
                </div>

                {inputs.goal !== 'maintain' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Weekly Weight Change</h3>
                    <p className="text-xl font-bold text-purple-600">
                      {results.weeklyGoal > 0 ? '+' : ''}{results.weeklyGoal} kg/week
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12">
            <h2>Understanding Daily Calorie Needs</h2>
            <p>
              Calculating your daily calorie needs is essential for maintaining, losing, or gaining weight. 
              This calculator uses the Mifflin-St Jeor equation to determine your Basal Metabolic Rate (BMR) 
              and adjusts it based on your activity level and goals.
            </p>

            <div className="my-8">
              <Image
                src="/images/caloriecalculator.JPG"
                alt="Calorie Calculator interface showing daily calorie needs calculation with inputs for age, weight, height, and activity level"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <h3>How Calories Are Calculated</h3>
            <p>
              The calculation uses the following formulas:
            </p>
            
            <div className="my-8">
              <Image
                src="/images/calorie-formula.jpg"
                alt="Calorie and BMR Formula: BMR calculation for males and females, plus daily calorie adjustment"
                width={600}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>

            <h3>Understanding Your Results</h3>
            <ul>
              <li><strong>BMR (Basal Metabolic Rate):</strong> Calories burned at complete rest</li>
              <li><strong>Daily Calories:</strong> Total calories needed based on activity and goals</li>
              <li><strong>Macronutrients:</strong> Recommended protein, carbs, and fats distribution</li>
            </ul>

            <h3>Activity Levels Explained</h3>
            <ul>
              <li><strong>Sedentary:</strong> Little or no exercise, desk job</li>
              <li><strong>Light:</strong> Light exercise 1-3 times per week</li>
              <li><strong>Moderate:</strong> Moderate exercise 3-5 times per week</li>
              <li><strong>Active:</strong> Heavy exercise 6-7 times per week</li>
              <li><strong>Very Active:</strong> Very heavy exercise, physical job, or training twice per day</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3>Important Note</h3>
              <p>
                These calculations provide estimates based on averages. Individual needs may vary based on 
                factors like metabolism, muscle mass, and overall health. Consult healthcare professionals 
                for personalized advice.
              </p>
            </div>

            <h3>Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">How accurate are calorie calculators?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Calorie calculators provide estimates based on well-researched formulas. While they're 
                    generally accurate within 10%, individual factors like metabolism and body composition 
                    can affect actual calorie needs.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">How should I adjust my calories for weight loss?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    A safe rate of weight loss is 0.5-1 kg per week, which requires a daily calorie deficit 
                    of 500-1000 calories. This calculator automatically adjusts your calories based on your 
                    selected goal.
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
                  "name": "Calorie Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Any",
                  "description": "Calculate your daily calorie needs, BMR, and macronutrient ratios with our free online calculator.",
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
                  "headline": "Understanding Daily Calorie Needs",
                  "description": "Learn how to calculate your daily calorie needs and macronutrient ratios. Comprehensive guide with formulas and expert tips.",
                  "image": "/images/caloriecalculator.JPG",
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
                    "@id": "https://calculatorof.com/health/calorie-calculator"
                  }
                }
              ])
            }}
          />
        </main>
      </div>
    </>
  );
};

export default CalorieCalculator; 