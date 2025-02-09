import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fraction Calculator - Free Online Calculator',
  description: 'Free online fraction calculator for addition, subtraction, multiplication, and division of fractions. Simple and easy to use.',
  openGraph: {
    title: 'Fraction Calculator',
    description: 'Calculate fractions online - add, subtract, multiply and divide fractions easily',
    images: [{
      url: '/images/fraction-calc.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://your-domain.com/calculators/fraction'
  }
}

export default function FractionCalculator() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fraction Calculator',
    description: 'Free online fraction calculator for basic fraction operations',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: 'https://your-domain.com/calculators/fraction'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Fraction Calculator</h1>
        
        <p className="mb-6">
          Below are multiple fraction calculators capable of addition, subtraction, multiplication, 
          division, simplification, and conversion between fractions and decimals. Fields above the 
          solid black line represent the numerator, while fields below represent the denominator.
        </p>

        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <input type="number" className="w-full border-b-2 border-black text-center mb-2" />
              <div className="border-t-2 border-black"></div>
              <input type="number" className="w-full text-center mt-2" />
            </div>
            
            <div className="flex flex-col gap-2">
              <button className="px-3 py-2 border rounded hover:bg-gray-50">+</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50">-</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50">×</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-50">/</button>
            </div>

            <div>
              <input type="number" className="w-full border-b-2 border-black text-center mb-2" readOnly />
              <div className="border-t-2 border-black"></div>
              <input type="number" className="w-full text-center mt-2" readOnly />
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 