import type { Metadata } from 'next'

type Props = {
  params: { type: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calculatorType = params.type
  const formattedType = calculatorType.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  // Base URL for the calculator
  const baseUrl = 'https://calculatorof.com'
  const canonicalPath = `/calculators/${calculatorType}`
  const canonicalUrl = `${baseUrl}${canonicalPath}`

  // Alternative paths that should redirect to canonical
  const alternativePaths = [
    `/calculator/${calculatorType}`,
    `/${calculatorType}`,
    `/${calculatorType}-calculator`
  ]

  return {
    title: `${formattedType} Calculator - Free Online Calculator | CalculatorOf.com`,
    description: `Free online ${calculatorType.replace('-', ' ')} calculator - fast and easy to use. Simple, accurate, and no registration required.`,
    keywords: `${calculatorType}, calculator, online calculator, free calculator, ${formattedType.toLowerCase()}, calculatorof`,
    openGraph: {
      title: `${formattedType} Calculator - CalculatorOf.com`,
      description: `Free online ${calculatorType.replace('-', ' ')} calculator - fast and easy to use. Get accurate results instantly.`,
      url: canonicalUrl,
      type: 'website',
      siteName: 'CalculatorOf.com',
      images: [{
        url: `/images/${calculatorType}-calc.jpg`,
        width: 1200,
        height: 630,
        alt: `${formattedType} Calculator`
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedType} Calculator`,
      description: `Free online ${calculatorType.replace('-', ' ')} calculator - fast and easy to use`,
      images: [`/images/${calculatorType}-calc.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

export default function CalculatorPage({ params }: Props) {
  const formattedType = params.type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  const canonicalUrl = `https://calculatorof.com/calculators/${params.type}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${formattedType} Calculator`,
    description: `Free online ${params.type.replace('-', ' ')} calculator - fast and easy to use`,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: canonicalUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    provider: {
      '@type': 'Organization',
      name: 'CalculatorOf.com',
      url: 'https://calculatorof.com'
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    permissions: 'none',
    softwareVersion: '1.0',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Your existing calculator component */}
    </>
  )
}