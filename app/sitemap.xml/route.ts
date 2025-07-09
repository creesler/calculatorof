import { connectToDatabase } from '@/lib/mongodb';

interface Calculator {
  slug: string;
  category: string[];
  lastUpdated?: string;
}

type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';

export async function GET() {
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
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as ChangeFreq,
      priority: 1,
    },
    {
      url: 'https://calculatorof.com/terms',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly' as ChangeFreq,
      priority: 0.3,
    },
    {
      url: 'https://calculatorof.com/privacy-policy',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly' as ChangeFreq,
      priority: 0.3,
    },
    {
      url: 'https://calculatorof.com/contact',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly' as ChangeFreq,
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
    lastmod: new Date().toISOString(),
    changefreq: 'daily' as ChangeFreq,
    priority: 0.9,
  }));

  // Calculator routes
  const calculatorRoutes = calculators.flatMap((calc: Calculator) =>
    calc.category.map((category: string) => ({
      url: `https://calculatorof.com/${category.toLowerCase()}/${calc.slug}`,
      lastmod: calc.lastUpdated ? new Date(calc.lastUpdated).toISOString() : new Date().toISOString(),
      changefreq: 'weekly' as ChangeFreq,
      priority: 0.8,
    }))
  );

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...routes, ...categoryRoutes, ...calculatorRoutes]
        .map(
          (route) => `
        <url>
          <loc>${route.url}</loc>
          <lastmod>${route.lastmod}</lastmod>
          <changefreq>${route.changefreq}</changefreq>
          <priority>${route.priority}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      // No caching - always generate fresh sitemap
      'Cache-Control': 'no-store, max-age=0',
    },
  });
} 