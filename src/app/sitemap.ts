import { MetadataRoute } from 'next'
import { siteConfig } from '@/app/seo-config'
import { calculatorCategories, Category, Calculator } from '@/app/seo-config'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
  // Create entries for all calculator pages
  const calculatorPages: MetadataRoute.Sitemap = []
  
  // Add category pages
  calculatorCategories.forEach((category: Category) => {
    // Add category page
    calculatorPages.push({
      url: `${siteConfig.url}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    })

    // Add each calculator page
    category.calculators.forEach((calculator: Calculator) => {
      calculatorPages.push({
        url: `${siteConfig.url}/${category.slug}/${calculator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.8,
      })
    })
  })

  // Add static pages
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.3,
    },
    ...calculatorPages,
  ]
}