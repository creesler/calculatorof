import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://calculatorof.com';

interface Calculator {
  slug: string;
  category: string[];
  lastUpdated?: string;
}

async function generateSitemap() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  try {
    const calculators = await db
      .collection('calculators')
      .find({})
      .project({ slug: 1, category: 1, lastUpdated: 1 })
      .toArray() as Calculator[];

    // Create XML sitemap with category-based URLs
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Calculator Pages -->
  ${calculators.flatMap((calc: Calculator) => 
    calc.category.map((category: string) => `
  <url>
    <loc>${SITE_URL}/${category.toLowerCase()}/${calc.slug}</loc>
    ${calc.lastUpdated ? `<lastmod>${new Date(calc.lastUpdated).toISOString()}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
  ).join('')}
</urlset>`;

    // Write sitemap to public directory
    writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully');
  } finally {
    await client.close();
  }
}

generateSitemap().catch(console.error); 