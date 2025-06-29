import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const SITE_URL = 'https://calculatorof.com';

interface Calculator {
  slug: string;
  category: string[];
  lastUpdated?: string;
}

function generateCalculatorUrl(category: string, slug: string, lastUpdated?: string): string {
  return `<url>
    <loc>${SITE_URL}/${category.toLowerCase()}/${slug}</loc>${lastUpdated ? `
    <lastmod>${new Date(lastUpdated).toISOString()}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const calculators = await db
      .collection('calculators')
      .find({})
      .project({ slug: 1, category: 1, lastUpdated: 1 })
      .toArray() as Calculator[];

    const staticUrls = `<url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
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
  </url>`;

    const calculatorUrls = calculators
      .flatMap((calc: Calculator) => 
        calc.category.map((category: string) => 
          generateCalculatorUrl(category, calc.slug, calc.lastUpdated)
        )
      )
      .join('\n  ');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${calculatorUrls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 