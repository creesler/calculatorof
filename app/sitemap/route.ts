import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { connectToDatabase } from '@/lib/mongodb';

const SITE_URL = 'https://calculatorof.com';

interface Calculator {
  slug: string;
  category: string[];
  lastUpdated?: string;
}

export async function GET() {
  try {
    // Try to read existing sitemap
    try {
      const sitemap = readFileSync('public/sitemap.xml', 'utf-8');
      return new NextResponse(sitemap, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    } catch (error) {
      // If sitemap doesn't exist, generate it
      const { db } = await connectToDatabase();
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

      return new NextResponse(sitemap, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }
  } catch (error) {
    console.error('Error serving sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 