import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorTypes = ['basic', 'scientific', 'bmi', 'mortgage'] // add your calculator types
  
  const calculatorPages = calculatorTypes.map(type => ({
    url: `https://your-domain.com/calculators/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...calculatorPages,
  ]
} 