import { MetadataRoute } from 'next'
import { calculatorCategories, siteConfig, getAllCalculatorPaths } from './seo-config'

export default function sitemap(): MetadataRoute.Sitemap {
  // Create entries for all calculator pages
  const calculatorPages: MetadataRoute.Sitemap = []
  
  // Add category pages
  calculatorCategories.forEach(category => {
    // Add each calculator page
    category.calculators.forEach(calculator => {
      calculatorPages.push({
        url: `${siteConfig.url}/${category.slug}/${calculator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  // Add static pages
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...calculatorPages,
  ]
}