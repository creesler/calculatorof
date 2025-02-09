import type { Metadata } from 'next'

type Props = {
  params: { type: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calculatorType = params.type

  return {
    title: `${calculatorType.charAt(0).toUpperCase() + calculatorType.slice(1)} Calculator`,
    description: `Free online ${calculatorType} calculator - fast and easy to use`,
    openGraph: {
      title: `${calculatorType} Calculator`,
      description: `Free online ${calculatorType} calculator - fast and easy to use`,
      images: [{
        url: `/images/${calculatorType}-calc.jpg`,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${calculatorType} Calculator`,
      description: `Free online ${calculatorType} calculator - fast and easy to use`,
    }
  }
}

export default function CalculatorPage({ params }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${params.type} Calculator`,
    description: `Free online ${params.type} calculator - fast and easy to use`,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: `https://your-domain.com/calculators/${params.type}`,
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