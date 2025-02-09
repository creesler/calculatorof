import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI Calculator - Free Investment Return Calculator',
  description: 'Calculate return on investment and payback period with our free online ROI calculator. Simple and easy to use investment calculator.',
  openGraph: {
    title: 'ROI Calculator',
    description: 'Calculate return on investment and payback period',
    images: [{
      url: '/images/roi-calc.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://calculatorof.com/finance/roi-calculator'
  }
}

// Move your existing ROI calculator component code here
export default function ROICalculator() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ROI Calculator',
    description: 'Calculate return on investment and payback period',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: 'https://calculatorof.com/finance/roi-calculator'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Your existing ROI calculator UI code goes here */}
    </>
  )
} 