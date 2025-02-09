import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://calculatorof.com'),
  title: 'CalculatorOf.com | Free Online Calculators for Every Need',
  description: 'CalculatorOf.com provides free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs.',
  keywords: 'calculatorof, online calculator, finance calculator, health calculator, pet calculator, math calculator, ROI calculator, BMI calculator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calculatorof.com',
    siteName: 'CalculatorOf.com',
    title: 'CalculatorOf.com | Free Online Calculators',
    description: 'Free online calculators for finance, health, pets, and math. Easy-to-use tools for all your calculation needs.',
    images: [
      {
        url: '/images/calculatorof.png',
        width: 1200,
        height: 630,
        alt: 'CalculatorOf.com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculatorOf.com | Free Online Calculators',
    description: 'Free online calculators for every need',
    images: ['/images/calculatorof.png']
  },
  alternates: {
    canonical: 'https://calculatorof.com'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 