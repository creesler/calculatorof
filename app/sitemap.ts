import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

interface Calculator {
  slug: string;
  category: string[];
  lastUpdated?: string;
}

type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';

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
      changeFrequency: 'daily' as ChangeFreq,
      priority: 1,
    },
    {
      url: 'https://calculatorof.com/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.3,
    },
    {
      url: 'https://calculatorof.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.3,
    },
    {
      url: 'https://calculatorof.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.3,
    },
  ];

  // Calculator routes
  const calculatorRoutes = calculators.flatMap((calc: Calculator) =>
    calc.category.map((category: string) => ({
      url: `https://calculatorof.com/${category.toLowerCase()}/${calc.slug}`,
      lastModified: calc.lastUpdated ? new Date(calc.lastUpdated) : new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    }))
  );

  return [...routes, ...calculatorRoutes];
} 