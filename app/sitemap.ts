import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

interface Calculator {
  slug: string;
  category: string[];
  lastUpdated?: string;
}

type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { db } = await connectToDatabase();
  const calculators = await db
    .collection('calculators')
    .find({})
    .project({ slug: 1, category: 1, lastUpdated: 1 })
    .toArray() as Calculator[];

  // Static routes
  const routes = [
    {
      url: 'https://calculatorof.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1,
    },
    {
      url: 'https://calculatorof.com/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.3,
    },
    {
      url: 'https://calculatorof.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.3,
    },
    {
      url: 'https://calculatorof.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.3,
    },
  ];

  // Get unique categories
  const categoriesMap: { [key: string]: boolean } = {};
  calculators.forEach((calc) => {
    calc.category.forEach(cat => {
      categoriesMap[cat.toLowerCase()] = true;
    });
  });

  // Category routes
  const categoryRoutes = Object.keys(categoriesMap).map(category => ({
    url: `https://calculatorof.com/${category.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as ChangeFrequency,
    priority: 0.9,
  }));

  // Calculator routes
  const calculatorRoutes = calculators.flatMap((calc: Calculator) =>
    calc.category.map((category: string) => ({
      url: `https://calculatorof.com/${category.toLowerCase()}/${calc.slug}`,
      lastModified: calc.lastUpdated ? new Date(calc.lastUpdated) : new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    }))
  );

  return [...routes, ...categoryRoutes, ...calculatorRoutes];
} 