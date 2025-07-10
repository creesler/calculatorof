import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingHomeButton from './components/FloatingHomeButton'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CalculatorOf - Free Online Calculators',
  description: 'Free online calculators for all your needs',
  metadataBase: new URL('https://calculatorof.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/icons/favicon-16x16.png',
  },
  manifest: '/icons/site.webmanifest',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ffffff',
  other: {
    'p:domain_verify': 'effa7cef91f54b14d6cb2f60811cb16e',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calculatorof.com',
    siteName: 'CalculatorOf',
    title: 'CalculatorOf - Free Online Calculators',
    description: 'Free online calculators for all your needs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalculatorOf - Free Online Calculators',
    description: 'Free online calculators for all your needs',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingHomeButton />
        </div>
      </body>
    </html>
  )
} 