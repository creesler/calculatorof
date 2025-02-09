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
    <div className="min-h-screen bg-gray-50">
      <FloatingButtons />
      <div className="py-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/calculator-icon.png" alt="Calculator Icon" width={40} height={40} />
          <span className="font-bold">CalculatorOf</span>
        </Link>
      </div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">CalculatorOf.com</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.slug} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              <div className="space-y-3">
                {category.calculators.map((calculator) => (
                  <Link 
                    href={`/calculators/${calculator.slug}`} 
                    key={calculator.slug}
                    className="block p-4 border rounded hover:bg-gray-50"
                  >
                    <h3 className="text-blue-600 font-semibold">{calculator.name}</h3>
                    <p className="text-gray-600 text-sm">{calculator.description}</p>
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
      </main>
    </div>
  )
} 