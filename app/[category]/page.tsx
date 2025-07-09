import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/mongodb';
import type { CalculatorPage } from '@/types/calculator';

interface Props {
  params: {
    category: string;
  };
}

interface CalculatorWithCategory {
  title: string;
  slug: string;
  category: string[];
  shortIntro: string;
  screenshot: {
    imageUrl: string;
    altText: string;
  };
  seo: {
    description: string;
  };
}

export const revalidate = 0;

// Generate static params for all categories
export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const calculators = await db
    .collection('calculators')
    .find({})
    .project({ category: 1 })
    .toArray();

  // Extract and deduplicate all categories
  const categories = [...new Set(
    calculators.flatMap((calc: { category: string[] }) => 
      calc.category.map(cat => cat.toLowerCase())
    )
  )];

  return categories.map(category => ({
    category,
  }));
}

// Get all calculators for a specific category
async function getCategoryCalculators(category: string) {
  const { db } = await connectToDatabase();
  const calculators = await db
    .collection('calculators')
    .find({
      category: { 
        $elemMatch: { 
          $regex: new RegExp(`^${category}$`, 'i') 
        } 
      }
    })
    .project({
      title: 1,
      slug: 1,
      category: 1,
      shortIntro: 1,
      screenshot: 1,
      seo: 1,
    })
    .toArray() as CalculatorWithCategory[];

  return calculators;
}

// Generate metadata for the category page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calculators = await getCategoryCalculators(params.category);
  
  if (!calculators.length) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1).toLowerCase();
  const description = `Explore our collection of ${calculators.length} ${categoryName} calculators. Free online tools for all your ${params.category.toLowerCase()} calculation needs.`;

  return {
    title: `${categoryName} Calculators - Free Online Tools | CalculatorOf`,
    description,
    openGraph: {
      title: `${categoryName} Calculators - CalculatorOf`,
      description,
      type: 'website',
      url: `https://calculatorof.com/${params.category}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Calculators`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const calculators = await getCategoryCalculators(params.category);

  if (!calculators.length) {
    notFound();
  }

  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryName} Calculators
          </h1>
          <p className="text-xl text-gray-600">
            Explore our collection of {calculators.length} calculators for all your {params.category.toLowerCase()} needs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calculator) => (
            <Link
              key={calculator.slug}
              href={`/${params.category}/${calculator.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={calculator.screenshot.imageUrl}
                    alt={calculator.screenshot.altText}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {calculator.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {calculator.shortIntro}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 