import { Metadata } from "next";

export const metadata: Metadata = {
  title: "401(k) Calculator with Employer Match - Project Your Retirement Savings | CalculatorOf",
  description: "Free online 401(k) calculator with employer matching. Calculate your retirement savings growth with contributions, returns, and inflation. Get instant projections, expert tips, and practical examples. Updated 2025.",
  keywords: [
    "401k calculator",
    "retirement calculator",
    "401k growth calculator",
    "employer match calculator",
    "retirement savings projection",
    "401k contribution calculator",
    "retirement planning tool",
    "compound interest calculator",
    "investment growth calculator",
    "free financial calculator"
  ],

  openGraph: {
    title: "401(k) Calculator - See Your Retirement Growth | Free Online Tool",
    description: "Calculate your 401(k) balance at retirement with our free calculator. Includes employer matching, salary increases, and inflation adjustments.",
    url: "https://calculatorof.com/financial/401k-calculator",
    siteName: "Calculator Of",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://calculatorof.com/images/401k-calculator-og.webp",
        width: 1200,
        height: 630,
        alt: "401(k) Calculator showing retirement projections with interactive interface"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "401(k) Calculator - Project Your Retirement Savings",
    description: "Free 401(k) calculator with employer matching. See how contributions grow over time with compound interest.",
    images: ["https://calculatorof.com/images/401k-calculator-twitter.webp"]
  },

  alternates: {
    canonical: "https://calculatorof.com/financial/401k-calculator",
    languages: {
      'en-US': 'https://calculatorof.com/financial/401k-calculator',
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
      'max-snippet': -1
    }
  },
};

// Structured Data
export const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  'headline': '401(k) Calculator: Project Your Retirement Savings with Employer Match',
  'description': 'Comprehensive guide to calculating 401(k) growth including contribution strategies, employer matching formulas, and long-term projections.',
  'image': [
    'https://calculatorof.com/images/401k-calculator-hero.webp',
    'https://calculatorof.com/images/401k-calculator-methodology.webp'
  ],
  'author': {
    '@type': 'Organization',
    'name': 'CalculatorOf.com',
    'url': 'https://calculatorof.com'
  },
  'datePublished': '2025-01-15',
  'dateModified': '2025-01-15',
  'about': {
    '@type': 'Thing',
    'name': '401(k) Retirement Planning'
  },
  'keywords': '401k, retirement calculator, employer match, compound interest, retirement planning',
};

export const calculatorStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': '401(k) Calculator with Employer Match',
  'applicationCategory': 'FinancialApplication',
  'operatingSystem': 'Web',
  'description': 'Projects 401(k) account balance at retirement including contributions, employer matches, and investment returns',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  },
  'featureList': [
    'Employer matching calculations',
    'Salary increase projections',
    'Inflation adjustments',
    'Year-by-year growth charts'
  ]
};

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'How much should I contribute to my 401(k)?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Financial experts typically recommend contributing at least enough to get your full employer match (usually between 3-6% of salary), and ideally 10-15% of your income for comfortable retirement savings.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is a good employer 401(k) match?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A typical good employer match is 50% of your contributions up to 6% of your salary (effectively a 3% match). Some companies offer dollar-for-dollar matches up to certain limits.'
      }
    }
  ]
};