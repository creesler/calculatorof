import type { Metadata } from 'next'
import './globals.css'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

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
  },
  other: {
    'p:domain_verify': '8b307b5b857ccc07264de92450c3dd3f'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="p:domain_verify" content="8b307b5b857ccc07264de92450c3dd3f" />
      </head>
      <body>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">CalculatorOf</span>
                <span className="text-yellow-400 text-2xl">●</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

<NextSeo
  additionalMetaTags={[
    {
      name: 'p:domain_verify',
      content: '8b307b5b857ccc07264de92450c3dd3f'
    }
  ]}
/> 