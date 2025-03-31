import fs from 'fs'
import { format } from 'date-fns'
import { calculatorCategories, getAllCalculatorPaths, scanForCalculators } from './sitemap-config'

const baseUrl = 'https://calculatorof.com'

// Scan for new calculators first
console.log('Scanning for new calculators...')
scanForCalculators()
console.log('Scan complete!')

function generateSitemap(): string {
  const paths = getAllCalculatorPaths()
  const today = format(new Date(), 'yyyy-MM-dd')
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
  ${paths.map(path => {
    // Category pages have higher priority than calculator pages
    const isCategory = path.split('/').length === 2
    const priority = isCategory ? '0.9' : '0.8'
    const changefreq = isCategory ? 'daily' : 'weekly'
    
    return `
  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${today}</lastmod>
  </url>`
  }).join('')}
</urlset>`

  return sitemap
}

function generateSitemapIndex(): string {
  const today = format(new Date(), 'yyyy-MM-dd')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`
}

function generateRssFeed(): string {
  const today = format(new Date(), 'yyyy-MM-dd')
  const paths = getAllCalculatorPaths()
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CalculatorOf.com - Free Online Calculators</title>
    <link>${baseUrl}</link>
    <description>Free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs.</description>
    <language>en-us</language>
    <lastBuildDate>${today}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${paths.map(path => {
      const category = calculatorCategories.find(cat => path.startsWith(`/${cat.slug}`))
      const calculator = category?.calculators.find(calc => path.endsWith(calc.slug))
      
      if (!category || !calculator) return ''
      
      return `
    <item>
      <title>${calculator.name} - Free Online Calculator</title>
      <description>${calculator.description}. Easy to use, accurate results, and no registration required.</description>
      <link>${baseUrl}${path}</link>
      <guid>${baseUrl}${path}</guid>
      <pubDate>${today}</pubDate>
      <category>${category.name}</category>
    </item>`
    }).join('')}
  </channel>
</rss>`
}

// Generate and write files
console.log('Generating sitemap files...')
const sitemap = generateSitemap()
fs.writeFileSync('public/sitemap.xml', sitemap)
console.log('✓ Sitemap generated successfully!')

const sitemapIndex = generateSitemapIndex()
fs.writeFileSync('public/sitemap-index.xml', sitemapIndex)
console.log('✓ Sitemap index generated successfully!')

const rssFeed = generateRssFeed()
fs.writeFileSync('public/rss.xml', rssFeed)
console.log('✓ RSS feed generated successfully!')

console.log('\nAll files generated successfully! The following paths are now included:')
getAllCalculatorPaths().forEach(path => console.log(`- ${baseUrl}${path}`))