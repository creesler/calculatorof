import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loan Calculator - Free Loan Payment Calculator',
  description: 'Calculate loan payments and interest rates with our free online loan calculator. Easy to use mortgage and loan payment calculator.',
  openGraph: {
    title: 'Loan Calculator',
    description: 'Calculate loan payments and interest rates',
    images: [{
      url: '/images/loan-calc.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://calculatorof.com/finance/loan-calculator'
  }
}

// Move your existing Loan calculator component code here
export default function LoanCalculator() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Loan Calculator',
    description: 'Calculate loan payments and interest rates',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: 'https://calculatorof.com/finance/loan-calculator'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Your existing Loan calculator UI code goes here */}
    </>
  )
} 