import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { BMIInputs, BMIResults } from '@/types/calculator';
import { calculateBMI } from '@/utils/calculations';
import Image from 'next/image';
import FloatingButtons from '@/components/FloatingButtons';

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
      min: 53.5,
      max: 72.1
    }
  }
});

const BMICalculator = () => {
  const [inputs, setInputs] = useState<BMIInputs>({
    weight: 0,
    height: 0,
    unit: 'metric'
  });
  
  const [results, setResults] = useState<BMIResults | null>(null);

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculateBMI(inputs);
    setResults(calculatedResults);
  };

  const screenshotExample = getScreenshotExample();

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        <FloatingButtons />
        <Head>
          <title>BMI Calculator | CalculatorOf.com - Calculate Your Body Mass Index</title>
          <meta 
            name="description" 
            content="Free BMI calculator at CalculatorOf.com. Calculate your Body Mass Index, determine your weight category, and get healthy weight range recommendations." 
          />
          <meta name="keywords" content="BMI calculator, body mass index calculator, healthy weight calculator, weight category calculator, health calculator, CalculatorOf" />
          <meta property="og:title" content="BMI Calculator | CalculatorOf.com" />
          <meta property="og:description" content="Calculate your Body Mass Index and determine your weight category with our free BMI calculator at CalculatorOf.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/calculatorof.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="BMI Calculator | CalculatorOf.com" />
          <meta name="twitter:description" content="Calculate your BMI instantly with our free calculator" />
          <meta name="twitter:image" content="/images/calculatorof.png" />
          <link rel="canonical" href="https://calculatorof.com/health/bmi-calculator" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">BMI Calculator</h1>
          
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

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate BMI
              </button>
            </form>

            {results && (
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-semibold">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">BMI</h3>
                    <p className="text-2xl font-bold text-blue-600">{results.bmi}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Category</h3>
                    <p className="text-2xl font-bold text-green-600">{results.category}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Healthy Weight Range</h3>
                    <p className="text-xl font-bold text-purple-600">
                      {results.healthyWeightRange.min} - {results.healthyWeightRange.max}
                      {inputs.unit === 'metric' ? ' kg' : ' lb'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12">
            <h2>Understanding Body Mass Index (BMI)</h2>
            <p>
              Body Mass Index (BMI) is a simple measurement using your weight and height to work out if your weight 
              is healthy. It's used by healthcare professionals to assess if someone is at risk of health issues 
              related to their weight.
            </p>

            <div className="my-8">
              <Image
                src="/images/bmicalculator.JPG"
                alt="BMI Calculator interface showing weight and height inputs with BMI calculation results"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>

            <h3>How BMI is Calculated</h3>
            <p>
              The BMI formula uses your weight and height:
            </p>
            
            <div className="my-8">
              <Image
                src="/images/bmi-formula.jpg"
                alt="BMI Formula: BMI = weight(kg) / height(m)²"
                width={600}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>

            <h3>BMI Categories</h3>
            <ul>
              <li>Below 18.5 - Underweight</li>
              <li>18.5 to 24.9 - Normal weight</li>
              <li>25 to 29.9 - Overweight</li>
              <li>30 or greater - Obese</li>
            </ul>

            <h3>When to Use This BMI Calculator</h3>
            <p>
              This calculator is useful for:
            </p>
            <ul>
              <li>Health assessment</li>
              <li>Weight management planning</li>
              <li>Fitness goal setting</li>
              <li>Medical screening</li>
              <li>Nutritional guidance</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h3>Important Note</h3>
              <p>
                BMI is a general guide and doesn't account for factors like muscle mass, bone density, age, and gender.
                Athletes and elderly people may need different assessments. Always consult healthcare professionals for
                personalized advice.
              </p>
            </div>

            <h3>BMI Compared to Other Health Metrics</h3>
            <p>
              While BMI is widely used, it's just one of several methods to assess health based on body composition.
              Here's how BMI compares to other common health metrics:
            </p>
            
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-2 px-4 border-b border-r">Metric</th>
                    <th className="py-2 px-4 border-b border-r">What It Measures</th>
                    <th className="py-2 px-4 border-b border-r">Advantages</th>
                    <th className="py-2 px-4 border-b">Limitations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-r font-medium">BMI</td>
                    <td className="py-2 px-4 border-b border-r">Weight relative to height</td>
                    <td className="py-2 px-4 border-b border-r">
                      <ul className="list-disc pl-4">
                        <li>Simple to calculate</li>
                        <li>No special equipment needed</li>
                        <li>Well-established guidelines</li>
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <ul className="list-disc pl-4">
                        <li>Doesn't distinguish fat from muscle</li>
                        <li>Doesn't account for body composition</li>
                        <li>May misclassify athletes or elderly</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b border-r font-medium">Body Fat Percentage</td>
                    <td className="py-2 px-4 border-b border-r">Actual fat content relative to total weight</td>
                    <td className="py-2 px-4 border-b border-r">
                      <ul className="list-disc pl-4">
                        <li>Directly measures fat</li>
                        <li>More accurate health indicator</li>
                        <li>Better for athletes</li>
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <ul className="list-disc pl-4">
                        <li>Requires special equipment</li>
                        <li>More expensive to measure</li>
                        <li>Less standardized guidelines</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-r font-medium">Waist Circumference</td>
                    <td className="py-2 px-4 border-b border-r">Abdominal fat distribution</td>
                    <td className="py-2 px-4 border-b border-r">
                      <ul className="list-disc pl-4">
                        <li>Indicates visceral fat (most harmful)</li>
                        <li>Simple to measure</li>
                        <li>Good predictor of health risks</li>
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <ul className="list-disc pl-4">
                        <li>Doesn't account for overall body composition</li>
                        <li>Measurement technique can vary</li>
                        <li>Less useful for very tall/short individuals</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b border-r font-medium">Waist-to-Hip Ratio</td>
                    <td className="py-2 px-4 border-b border-r">Fat distribution pattern</td>
                    <td className="py-2 px-4 border-b border-r">
                      <ul className="list-disc pl-4">
                        <li>Identifies "apple" vs "pear" shapes</li>
                        <li>Better predictor of heart disease</li>
                        <li>Accounts for body shape</li>
                      </ul>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <ul className="list-disc pl-4">
                        <li>Requires two measurements</li>
                        <li>Doesn't account for total body fat</li>
                        <li>Less familiar to general public</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p>
              For the most comprehensive health assessment, consider using multiple metrics rather than relying solely on BMI.
              Consulting with healthcare professionals can help determine which measurements are most relevant for your specific situation.
            </p>

            <h3>Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">What is a healthy BMI range?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    A BMI between 18.5 and 24.9 is considered healthy for most adults. However, this range may not be
                    suitable for all body types and ethnicities. Some people may be healthy at BMIs slightly outside
                    this range.
                  </p>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">Why might BMI not be accurate for everyone?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    BMI doesn't distinguish between weight from muscle and weight from fat. Athletes with high muscle
                    mass might have a high BMI but be healthy. Similarly, elderly people might have a normal BMI but
                    low muscle mass.
                  </p>
                </div>
              </div>
              
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">How often should I check my BMI?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    For most adults, checking BMI once or twice a year is sufficient unless you're actively trying to lose
                    or gain weight. If you're on a weight management program, you might want to check more frequently to
                    track progress.
                  </p>
                </div>
              </div>
              
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">What's the difference between BMI and body fat percentage?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    BMI is calculated solely from height and weight, while body fat percentage measures the actual proportion
                    of fat in your body. Body fat percentage is more accurate for assessing health risks but requires specialized
                    equipment to measure properly. BMI is easier to calculate and serves as a useful screening tool.
                  </p>
                </div>
              </div>
              
              <div itemScope itemType="https://schema.org/Question">
                <h4 itemProp="name">Can children use this BMI calculator?</h4>
                <div itemScope itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    This calculator is designed for adults. For children and teens (ages 2-19), BMI is calculated the same way
                    but interpreted differently. Children's BMI should be assessed using age and sex-specific percentiles rather
                    than the fixed categories used for adults. Please consult a pediatrician for proper assessment of a child's BMI.
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
                  "name": "BMI Calculator",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Any",
                  "description": "Calculate your Body Mass Index (BMI) and determine your weight category with our free online calculator.",
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
                  "headline": "Understanding Body Mass Index (BMI)",
                  "description": "Learn how to calculate and interpret your BMI. Comprehensive guide with formulas, categories, and health implications.",
                  "image": "/images/bmicalculator.JPG",
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
                    "@id": "https://calculatorof.com/health/bmi-calculator"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is a healthy BMI range?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A BMI between 18.5 and 24.9 is considered healthy for most adults. However, this range may not be suitable for all body types and ethnicities. Some people may be healthy at BMIs slightly outside this range."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Why might BMI not be accurate for everyone?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "BMI doesn't distinguish between weight from muscle and weight from fat. Athletes with high muscle mass might have a high BMI but be healthy. Similarly, elderly people might have a normal BMI but low muscle mass."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How often should I check my BMI?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "For most adults, checking BMI once or twice a year is sufficient unless you're actively trying to lose or gain weight. If you're on a weight management program, you might want to check more frequently to track progress."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What's the difference between BMI and body fat percentage?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "BMI is calculated solely from height and weight, while body fat percentage measures the actual proportion of fat in your body. Body fat percentage is more accurate for assessing health risks but requires specialized equipment to measure properly. BMI is easier to calculate and serves as a useful screening tool."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can children use this BMI calculator?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "This calculator is designed for adults. For children and teens (ages 2-19), BMI is calculated the same way but interpreted differently. Children's BMI should be assessed using age and sex-specific percentiles rather than the fixed categories used for adults. Please consult a pediatrician for proper assessment of a child's BMI."
                      }
                    }
                  ]
                }
              ])
            }}
          />
        </main>
      </div>
    </>
  );
};

export default BMICalculator; 