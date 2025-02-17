import type { Metadata, Viewport } from 'next'
import './globals.css'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { GA_MEASUREMENT_ID } from '@/lib/constants'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import { siteConfig } from './seo-config'

// Separate viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3b82f6',
  colorScheme: 'light dark'
}

// Regular metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://calculatorof.com'),
  title: {
    default: siteConfig.title,
    template: '%s | CalculatorOf.com'
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@calculatorof',
    site: '@calculatorof',
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': `${siteConfig.url}/rss.xml`,
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'yandex-verification': 'your-yandex-verification-code',
      'msvalidate.01': 'your-bing-verification-code',
    }
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: 'CalculatorOf',
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://twitter.com/calculatorof',
      'https://www.facebook.com/calculatorof',
      'https://www.linkedin.com/company/calculatorof'
    ]
  }

  return (
    <html lang="en">
      <head>
        {/* PWA meta tags */}
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="RSS Feed for CalculatorOf.com" href="/rss.xml" />
        
        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
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

        {/* Google Analytics */}
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