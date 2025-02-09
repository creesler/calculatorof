import Link from 'next/link'
import Image from 'next/image'
import FloatingButtons from '@/components/FloatingButtons'

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
          slug: "roi",
          description: "Calculate return on investment and payback period"
        },
        {
          name: "Loan Calculator",
          slug: "loan",
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
          slug: "bmi",
          description: "Calculate Body Mass Index"
        },
        {
          name: "Calorie Calculator",
          slug: "calorie",
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
          slug: "pet-food",
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
          slug: "percentage",
          description: "Calculate percentages and ratios"
        },
        {
          name: "Scientific Calculator",
          slug: "scientific",
          description: "Advanced mathematical calculations"
        },
        {
          name: "Fraction Calculator",
          slug: "fraction",
          description: "Calculate and simplify fractions"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <FloatingButtons />
      <div className="py-4 px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/calculator-icon.png" alt="Calculator Icon" width={40} height={40} />
          <span className="font-bold text-xl">CalculatorOf</span>
          <span className="text-yellow-400">●</span>
        </Link>
      </div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">CalculatorOf.com</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div key={category.slug} className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              
              <div className="space-y-2">
                {category.calculators.map((calculator) => (
                  <Link 
                    href={`/calculators/${calculator.slug}`} 
                    key={calculator.slug}
                    className="block p-4 border border-gray-200 rounded hover:bg-gray-50"
                  >
                    <h3 className="text-blue-600 hover:text-blue-800">{calculator.name}</h3>
                    <p className="text-gray-600 text-sm mt-0.5">{calculator.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 