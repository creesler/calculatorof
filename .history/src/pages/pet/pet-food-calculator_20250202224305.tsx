import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { PetFoodInputs, PetFoodResults } from '@/types/calculator';
import { calculatePetFood } from '@/utils/calculations';
import Image from 'next/image';
import FloatingButtons from '@/components/FloatingButtons';

interface ScreenshotExample {
  petType: 'dog' | 'cat';
  weight: number;
  age: number;
  activityLevel: 'low' | 'moderate' | 'high';
  unit: 'metric' | 'imperial';
  foodType: 'dry' | 'wet';
  results: {
    dailyCalories: number;
    foodAmount: number;
    mealsPerDay: number;
    amountPerMeal: number;
  };
}

const getScreenshotExample = (): ScreenshotExample => ({
  petType: 'dog',
  weight: 10,
  age: 3,
  activityLevel: 'moderate',
  unit: 'metric',
  foodType: 'dry',
  results: {
    dailyCalories: 750,
    foodAmount: 214,
    mealsPerDay: 2,
    amountPerMeal: 107
  }
});

const PetFoodCalculator = () => {
  const [inputs, setInputs] = useState<PetFoodInputs>({
    petType: 'dog',
    weight: 0,
    age: 0,
    activityLevel: 'moderate',
    unit: 'metric',
    foodType: 'dry'
  });
  
  const [results, setResults] = useState<PetFoodResults | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculatePetFood(inputs);
    setResults(calculatedResults);
  };

  const screenshotExample = getScreenshotExample();

  const activityLevels = {
    low: 'Low (senior or inactive)',
    moderate: 'Moderate (adult, normal activity)',
    high: 'High (very active, young)'
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        <FloatingButtons />
        <Head>
          <title>Pet Food Calculator | CalculatorOf.com - Calculate Pet Food Portions</title>
          <meta 
            name="description" 
            content="Free pet food calculator at CalculatorOf.com. Calculate daily food portions for dogs and cats based on weight, age, and activity level." 
          />
          <meta name="keywords" content="pet food calculator, dog food calculator, cat food calculator, pet portion calculator, pet nutrition calculator, CalculatorOf" />
          <meta property="og:title" content="Pet Food Calculator | CalculatorOf.com" />
          <meta property="og:description" content="Calculate pet food portions with our free calculator at CalculatorOf.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/calculatorof.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pet Food Calculator | CalculatorOf.com" />
          <meta name="twitter:description" content="Calculate pet food portions instantly with our free calculator" />
          <meta name="twitter:image" content="/images/calculatorof.png" />
          <link rel="canonical" href="https://calculatorof.com/pet/pet-food-calculator" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Pet Food Calculator</h1>
          
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
                  <span className="ml-2">Metric (kg)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={inputs.unit === 'imperial'}
                    onChange={() => setInputs({...inputs, unit: 'imperial'})}
                  />
                  <span className="ml-2">Imperial (lb)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pet Type
                    <div className="mt-1 space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="dog"
                          checked={inputs.petType === 'dog'}
                          onChange={(e) => setInputs({...inputs, petType: e.target.value as 'dog' | 'cat'})}
                          className="form-radio"
                        />
                        <span className="ml-2">Dog</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="cat"
                          checked={inputs.petType === 'cat'}
                          onChange={(e) => setInputs({...inputs, petType: e.target.value as 'dog' | 'cat'})}
                          className="form-radio"
                        />
                        <span className="ml-2">Cat</span>
                      </label>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Food Type
                    <select
                      value={inputs.foodType}
                      onChange={(e) => setInputs({...inputs, foodType: e.target.value as 'dry' | 'wet'})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="dry">Dry Food</option>
                      <option value="wet">Wet Food</option>
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
                    Age (years)
                    <input
                      type="number"
                      value={inputs.age || ''}
                      onChange={(e) => setInputs({...inputs, age: Number(e.target.value)})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={screenshotExample.age.toString()}
                      required
                      min="0"
                      step="0.1"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Activity Level
                  <select
                    name="activityLevel"
                    value={inputs.activityLevel}
                    onChange={(e) => setInputs({...inputs, activityLevel: e.target.value as PetFoodInputs['activityLevel']})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(activityLevels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate Portions
              </button>
            </form>

            {results && (
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Daily Calories</h3>
                    <p className="text-2xl font-bold text-blue-600">{results.dailyCalories} kcal</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Daily Food Amount</h3>
                    <p className="text-2xl font-bold text-green-600">{results.foodAmount}g</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Feeding Schedule</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Meals Per Day</p>
                      <p className="text-xl font-bold text-purple-600">{results.mealsPerDay}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount Per Meal</p>
                      <p className="text-xl font-bold text-purple-600">{results.amountPerMeal}g</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12">
            <h2>Understanding Pet Food Portions</h2>
            <p>
              Calculating the right amount of food for your pet is crucial for their health and well-being. 
              This calculator uses your pet's weight, age, and activity level to determine their daily caloric 
              needs and recommended food portions.
            </p>

            <div className="my-8">
              <Image
                src="/images/petfoodcalculator.JPG"
                alt="Pet Food Calculator interface showing portion calculation with inputs for weight, age, and activity level"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <h3>How Pet Food Portions Are Calculated</h3>
            <p>
              The calculation uses the following formula:
            </p>
            
            <div className="my-8">
              <Image
                src="/images/pet-food-formula.jpg"
                alt="Pet Food Formula: RER calculation and daily calorie needs"
                width={600}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>

            <h3>Understanding Your Results</h3>
            <ul>
              <li><strong>Daily Calories:</strong> Total calories your pet needs per day</li>
              <li><strong>Food Amount:</strong> Total grams of food per day</li>
              <li><strong>Meals Per Day:</strong> Recommended feeding frequency</li>
              <li><strong>Amount Per Meal:</strong> Grams of food per meal</li>
            </ul>

            <h3>Activity Levels Explained</h3>
            <ul>
              <li><strong>Low:</strong> Senior pets, inactive lifestyle</li>
              <li><strong>Moderate:</strong> Adult pets with normal activity</li>
              <li><strong>High:</strong> Very active pets, working dogs, puppies/kittens</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3>Important Note</h3>
              <p>
                These calculations provide general guidelines. Individual needs may vary based on breed, 
                health conditions, and other factors. Always consult your veterinarian for personalized advice.
              </p>
            </div>

            <h3>Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">How often should I feed my pet?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Adult dogs typically need 2 meals per day, while puppies need 3-4. Adult cats do better 
                    with 3 smaller meals, and kittens need 4 meals per day. This helps maintain stable 
                    blood sugar and prevents overeating.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">Should I adjust portions for different food brands?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Yes, different brands have varying caloric densities. Check the food's nutritional 
                    information and adjust portions accordingly. This calculator uses average values for 
                    dry and wet food.
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
                  "name": "Pet Food Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Any",
                  "description": "Calculate pet food portions and daily calorie needs with our free online calculator.",
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
                  "headline": "Understanding Pet Food Portions",
                  "description": "Learn how to calculate proper food portions for your pet. Comprehensive guide with formulas and feeding recommendations.",
                  "image": "/images/petfoodcalculator.JPG",
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
                    "@id": "https://calculatorof.com/pet/pet-food-calculator"
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

export default PetFoodCalculator; 