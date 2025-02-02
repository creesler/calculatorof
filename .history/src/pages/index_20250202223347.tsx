import type { FormEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import FloatingButtons from '@/components/FloatingButtons';

interface Category {
  name: string;
  slug: string;
  description: string;
  calculators: Calculator[];
}

interface Calculator {
  name: string;
  slug: string;
  description: string;
}

export default function Home() {
  const categories: Category[] = [
    {
      name: "Finance",
      slug: "finance",
      description: "Financial calculators for investment, loans, and business planning",
      calculators: [
        {
          name: "ROI Calculator",
          slug: "roi-calculator",
          description: "Calculate return on investment and payback period"
        },
        {
          name: "Loan Calculator",
          slug: "loan-calculator",
          description: "Calculate loan payments and interest rates"
        }
      ]
    },
    {
      name: "Health",
      slug: "health",
      description: "Health and fitness related calculators",
      calculators: [
        {
          name: "BMI Calculator",
          slug: "bmi-calculator",
          description: "Calculate Body Mass Index"
        },
        {
          name: "Calorie Calculator",
          slug: "calorie-calculator",
          description: "Calculate daily calorie needs"
        }
      ]
    },
    {
      name: "Pet",
      slug: "pet",
      description: "Pet care and nutrition calculators",
      calculators: [
        {
          name: "Pet Food Calculator",
          slug: "pet-food-calculator",
          description: "Calculate pet food portions"
        }
      ]
    },
    {
      name: "Math",
      slug: "math",
      description: "Mathematical and statistical calculators",
      calculators: [
        {
          name: "Percentage Calculator",
          slug: "percentage-calculator",
          description: "Calculate percentages and ratios"
        },
        {
          name: "Scientific Calculator",
          slug: "scientific-calculator",
          description: "Advanced mathematical calculations"
        }
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative">
        <FloatingButtons />
        <Head>
          <title>CalculatorOf.com | Free Online Calculators for Every Need</title>
          <meta 
            name="description" 
            content="CalculatorOf.com provides free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs." 
          />
          <meta name="keywords" content="calculatorof, online calculator, finance calculator, health calculator, pet calculator, math calculator, ROI calculator, BMI calculator" />
          <meta property="og:title" content="CalculatorOf.com | Free Online Calculators" />
          <meta property="og:description" content="Free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/images/calculatorof.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="CalculatorOf.com | Free Online Calculators" />
          <meta name="twitter:description" content="Free online calculators for every need" />
          <meta name="twitter:image" content="/images/calculatorof.png" />
          <link rel="canonical" href="https://calculatorof.com" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">CalculatorOf.com</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.slug} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.name}</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <div className="space-y-4">
                  {category.calculators.map((calculator) => (
                    <Link 
                      href={`/${category.slug}/${calculator.slug}`} 
                      key={calculator.slug}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-blue-600">{calculator.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{calculator.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <article className="prose lg:prose-xl mx-auto mt-12 px-4">
            <h2>Free Online Calculators for Every Need</h2>
            <p>
              Welcome to CalculatorOf.com, your one-stop destination for all types of calculators. 
              Whether you're planning investments, checking your health metrics, calculating pet food portions, 
              or solving mathematical problems, we've got you covered with our easy-to-use calculators.
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CalculatorOf.com | Free Online Calculators for Every Need</title>
        <meta 
          name="description" 
          content="CalculatorOf.com provides free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs." 
        />
        <meta name="keywords" content="calculatorof, online calculator, finance calculator, health calculator, pet calculator, math calculator, ROI calculator, BMI calculator" />
        <meta property="og:title" content="CalculatorOf.com | Free Online Calculators" />
        <meta property="og:description" content="Free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/calculatorof.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CalculatorOf.com | Free Online Calculators" />
        <meta name="twitter:description" content="Free online calculators for every need" />
        <meta name="twitter:image" content="/images/calculatorof.png" />
        <link rel="canonical" href="https://calculatorof.com" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">CalculatorOf.com</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.slug} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.name}</h2>
              <p className="text-gray-600 mb-6">{category.description}</p>
              
              <div className="space-y-4">
                {category.calculators.map((calculator) => (
                  <Link 
                    href={`/${category.slug}/${calculator.slug}`} 
                    key={calculator.slug}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-blue-600">{calculator.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{calculator.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12 px-4">
          <h2>Free Online Calculators for Every Need</h2>
          <p>
            Welcome to CalculatorOf.com, your one-stop destination for all types of calculators. 
            Whether you're planning investments, checking your health metrics, calculating pet food portions, 
            or solving mathematical problems, we've got you covered with our easy-to-use calculators.
          </p>

          <section className="mt-8">
            <h2>Why Choose Our Calculators?</h2>
            <ul>
              <li>Free to use</li>
              <li>User-friendly interface</li>
              <li>Accurate results</li>
              <li>No registration required</li>
              <li>Mobile-friendly design</li>
            </ul>
          </section>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CalculatorOf.com",
              "description": "Free online calculators for finance, health, pets, and math",
              "url": "https://calculatorof.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://calculatorof.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </main>
    </div>
  );
} 
