import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorTypes = ['basic', 'scientific', 'bmi', 'mortgage'] // add your calculator types
  
  const calculatorPages = calculatorTypes.map(type => ({
    url: `https://your-domain.com/calculators/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...calculatorPages,
  ]
} 