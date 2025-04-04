import type { Metadata, Viewport } from 'next'
import './globals.css'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { GA_MEASUREMENT_ID } from '@/lib/constants'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'

// Separate viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
}

// Regular metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://calculatorof.com'),
  title: 'Calculator Suite',
  description: 'Free online calculators',
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
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Calculator Suite',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Restore PWA meta tags */}
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Calculator Suite" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Navigation />
        {children}
        <PWAInstallPrompt />

        {/* Modern Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold">CalculatorOf</span>
                  <span className="text-yellow-400 text-2xl">●</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Free online calculators for every need
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li className="text-gray-500">
                    <a href="mailto:creesler@gmail.com" className="hover:text-gray-900">
                      creesler@gmail.com
                    </a>
                  </li>
                  <li className="text-gray-500">
                    United States
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} CalculatorOf.com. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Add ServiceWorkerRegistration */}
        <ServiceWorkerRegistration />

        {/* Place Google Analytics here */}
        <script
          async
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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