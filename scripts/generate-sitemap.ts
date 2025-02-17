import { writeFileSync } from 'fs'
import { format } from 'date-fns'
import { calculatorCategories, getAllCalculatorPaths } from '../src/app/seo-config'

interface PageInfo {
  url: string
  priority: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

function generateSitemap() {
  const baseUrl = 'https://calculatorof.com'
  const today = format(new Date(), 'yyyy-MM-dd')

  // Define static pages with their priorities
  const staticPages: PageInfo[] = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'monthly' },
    { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  ]

  // Get all calculator paths
  const calculatorPaths: PageInfo[] = getAllCalculatorPaths().map(path => ({
    url: path,
    priority: '0.8',
    changefreq: 'weekly'
  }))

  // Category pages
  const categoryPages: PageInfo[] = calculatorCategories.map(category => ({
    url: `/${category.slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  }))

  // Combine all pages
  const allPages: PageInfo[] = [...staticPages, ...categoryPages, ...calculatorPaths]

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${allPages
  .map(
    page => {
      const urlParts = page.url.split('/')
      const lastPart = urlParts[urlParts.length - 1]
      const isCalculator = page.url.includes('/calculator')
      
      return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      isCalculator && lastPart
        ? `\n    <image:image>
      <image:loc>${baseUrl}/images/${lastPart}-calc.jpg</image:loc>
      <image:title>${lastPart.replace('-', ' ')} calculator</image:title>
    </image:image>`
        : ''
    }
  </url>`
    }
  )
  .join('\n')}
</urlset>`

  // Write sitemap
  writeFileSync('public/sitemap.xml', sitemap)
  console.log('Sitemap generated successfully!')

  // Generate sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`

  // Write sitemap index
  writeFileSync('public/sitemap-index.xml', sitemapIndex)
  console.log('Sitemap index generated successfully!')

  // Generate RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CalculatorOf.com - Free Online Calculators</title>
    <link>${baseUrl}</link>
    <description>Free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${calculatorPaths
      .map(
        page => {
          const urlParts = page.url.split('/')
          const lastPart = urlParts[urlParts.length - 1]
          if (!lastPart) return ''
          
          return `
    <item>
      <title>${lastPart.replace('-', ' ')} Calculator</title>
      <link>${baseUrl}${page.url}</link>
      <guid>${baseUrl}${page.url}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description>Free online ${lastPart.replace('-', ' ')} calculator - fast and easy to use.</description>
    </item>`
        }
      )
      .join('')}
  </channel>
</rss>`

  // Write RSS feed
  writeFileSync('public/rss.xml', rss)
  console.log('RSS feed generated successfully!')
}

generateSitemap()