'use client'

import Link from 'next/link'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'
import InstallPromo from '@/components/InstallPromo'

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

const categories: Category[] = [
  {
    name: "Finance",
    slug: "finance",
    description: "Financial calculators for investments and loans",
    calculators: [
      {
        name: "ROI Calculator",
        slug: "roi-calculator",
        description: "Calculate Return on Investment"
      },
      {
        name: "Loan Calculator",
        slug: "loan-calculator",
        description: "Calculate loan payments and interest"
      },
      {
        name: "Retirement Calculator",
        slug: "retirement-calculator",
        description: "Find Your Perfect Savings Number"
      },
      {
        name: "401(k) Calculator",
        slug: "401k-calculator",
        description: "Find Your Perfect Savings Number"
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
    description: "Pet care calculators",
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
    description: "Mathematical calculators",
    calculators: [
      {
        name: "Percentage Calculator",
        slug: "percentage-calculator",
        description: "Calculate percentages"
      },
      {
        name: "Scientific Calculator",
        slug: "scientific-calculator",
        description: "Advanced mathematical calculations"
      },
      {
        name: "Fraction Calculator",
        slug: "fraction-calculator",
        description: "Calculate and simplify fractions"
      }
    ]
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />
      <main className="container mx-auto px-4 py-8">
        <InstallPromo />
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-900">
          Free Online Calculators
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.slug} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">{category.name}</h2>
              <p className="text-gray-600 dark:text-gray-600">{category.description}</p>
              
              <div className="space-y-2">
                {category.calculators.map((calculator) => (
                  <Link
                    key={calculator.slug}
                    href={`/${category.slug}/${calculator.slug}`}
                    className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-gray-900">{calculator.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{calculator.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <article className="prose lg:prose-xl mx-auto mt-12 px-4">
          <h2 className="text-gray-900 dark:text-gray-900">Free Online Calculators for Every Need</h2>
          <p className="text-gray-600 dark:text-gray-600">
            Welcome to CalculatorOf.com, your one-stop destination for all types of calculators. 
            Whether you're planning investments, checking your health metrics, calculating pet food portions, 
            or solving mathematical problems, we've got you covered with our easy-to-use calculators.
          </p>

          <section className="mt-8">
            <h2 className="text-gray-900 dark:text-gray-900">Why Choose Our Calculators?</h2>
            <ul className="text-gray-600 dark:text-gray-600">
              <li>Free to use</li>
              <li>User-friendly interface</li>
              <li>Accurate results</li>
              <li>No registration required</li>
              <li>Mobile-friendly design</li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  )
}