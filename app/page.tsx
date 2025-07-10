import { Metadata } from 'next';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/mongodb';
import type { CalculatorPage } from '@/types/calculator';
import CategoryAccordion from './components/accordion/CategoryAccordion';

export const metadata: Metadata = {
  title: 'Calculator.of - Free Online Calculators',
  description: 'Collection of free online calculators for various purposes. Easy to use, accurate, and always free.',
  openGraph: {
    title: 'Calculator.of - Free Online Calculators',
    description: 'Collection of free online calculators for various purposes. Easy to use, accurate, and always free.',
    type: 'website',
    url: 'https://calculatorof.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator.of - Free Online Calculators',
    description: 'Collection of free online calculators for various purposes. Easy to use, accurate, and always free.',
  },
};

export const revalidate = 0;

type CalculatorWithCategory = Pick<CalculatorPage, 'title' | 'slug' | 'shortIntro' | 'seo' | 'category'>;

// Helper function to serialize MongoDB documents
function serializeDocument(doc: any) {
  return JSON.parse(JSON.stringify(doc));
}

async function getCalculators() {
  const { db } = await connectToDatabase();
  const calculators = await db
    .collection('calculators')
    .find({})
    .project({
      title: 1,
      slug: 1,
      shortIntro: 1,
      'seo.description': 1,
      category: 1,
    })
    .toArray();
  
  // Serialize the MongoDB documents
  return serializeDocument(calculators) as CalculatorWithCategory[];
}

function organizeByCategory(calculators: CalculatorWithCategory[]) {
  const categoryMap = new Map<string, CalculatorWithCategory[]>();
  
  // First, collect all unique categories
  const allCategories = new Set<string>();
  calculators.forEach(calc => {
    calc.category.forEach(cat => allCategories.add(cat.toLowerCase()));
  });

  // Initialize categories with empty arrays
  allCategories.forEach(category => {
    categoryMap.set(category, []);
  });

  // Organize calculators into their categories
  calculators.forEach(calc => {
    calc.category.forEach(cat => {
      const category = cat.toLowerCase();
      const existingCalcs = categoryMap.get(category) || [];
      categoryMap.set(category, [...existingCalcs, calc]);
    });
  });

  return Array.from(categoryMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function HomePage() {
  const calculators = await getCalculators();
  const categorizedCalculators = organizeByCategory(calculators);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Free Online Calculators for Every Need
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              Welcome to CalculatorOf.com, your one-stop destination for all types of calculators. 
              Whether you're planning investments, checking your health metrics, calculating pet food portions, 
              or solving mathematical problems, we've got you covered with our easy-to-use calculators.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Categories */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {categorizedCalculators.map(([category, calcs]) => (
              <CategoryAccordion
                key={category}
                category={category}
                calculators={calcs}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose Our Calculators?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free to use
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                User-friendly interface
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Accurate results
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No registration required
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mobile-friendly design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 