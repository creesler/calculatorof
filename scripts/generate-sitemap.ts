import { writeFileSync } from 'fs';
import { join } from 'path';
import { connectToDatabase } from '../lib/mongodb';

const SITE_URL = 'https://calculatorof.com';

async function generateSitemap() {
  try {
    // Connect to MongoDB and get all calculator data
    const { db } = await connectToDatabase();
    const calculators = await db
      .collection('calculators')
      .find({})
      .project({ slug: 1, category: 1, lastUpdated: 1 })
      .toArray();

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
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Calculator Pages -->
  ${calculators.flatMap(calc => 
    calc.category.map(category => `
  <url>
    <loc>${SITE_URL}/${category.toLowerCase()}/${calc.slug}</loc>
    ${calc.lastUpdated ? `<lastmod>${new Date(calc.lastUpdated).toISOString()}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
  ).join('')}
</urlset>`;

    // Write sitemap to public directory using absolute path
    const publicDir = join(process.cwd(), 'public');
    const sitemapPath = join(publicDir, 'sitemap.xml');
    
    try {
      writeFileSync(sitemapPath, sitemap);
      console.log('✅ Sitemap generated successfully at:', sitemapPath);
    } catch (writeError) {
      console.error('Error writing sitemap file:', writeError);
      throw writeError;
    }

    // Close MongoDB connection
    await db.client.close();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Execute the function
generateSitemap(); 