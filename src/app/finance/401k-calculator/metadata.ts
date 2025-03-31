import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '401(k) Calculator - Estimate Your Retirement Savings | CalculatorOf',
  description: 'Use our free 401(k) Calculator to estimate your retirement savings based on contributions, employer match, and investment returns. Get expert insights and maximize your retirement planning.',
  keywords: [
    '401k Calculator',
    'Retirement savings calculator',
    '401k contribution calculator',
    'Employer match calculator',
    'Retirement planning tools',
    '401k investment calculator',
    'Retirement account calculator',
    '401k growth calculator',
    '401k compound interest calculator',
    'Retirement investment planning'
  ],
  openGraph: {
    title: '401(k) Calculator - Plan Your Retirement Savings | Free Online Tool',
    description: 'Easily calculate your 401(k) growth potential with our free calculator. Account for employer match, contribution limits, and investment returns to optimize your retirement savings.',
    url: 'https://calculatorof.com/finance/401k-calculator',
    siteName: 'Calculator Of',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://calculatorof.com/images/401k-calculator-og.webp',
        width: 1200,
        height: 630,
        alt: '401(k) Calculator - Estimate Retirement Savings'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '401(k) Calculator - Maximize Your Retirement Savings',
    description: 'Plan your retirement with our free 401(k) calculator. Get personalized insights on contributions, employer match, and investment growth.',
    images: ['https://calculatorof.com/images/401k-calculator-twitter.webp']
  },
  alternates: {
    canonical: 'https://calculatorof.com/finance/401k-calculator',
    languages: {
      'en-US': 'https://calculatorof.com/finance/401k-calculator'
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
}

// Structured Data (Schema.org)

// Article Schema
export const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "401(k) Calculator: Optimize Your Retirement Savings",
  "description": "Learn how to maximize your retirement savings using our 401(k) calculator. Understand contribution strategies, employer matching, and investment growth potential.",
  "image": [
    "https://calculatorof.com/images/401k-calculator-hero.webp",
    "https://calculatorof.com/images/401k-methodology.webp"
  ],
  "author": {
    "@type": "Organization",
    "name": "CalculatorOf.com",
    "url": "https://calculatorof.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CalculatorOf.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://calculatorof.com/logo.png"
    }
  },
  "datePublished": "2025-03-31",
  "dateModified": "2025-03-31",
  "about": {
    "@type": "Thing",
    "name": "401(k) Retirement Planning"
  },
  "educationalLevel": "Beginner",
  "keywords": "401k Calculator, Retirement planning, Employer match, Investment returns",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://calculatorof.com/finance/401k-calculator"
  }
};

// Calculator Schema
export const calculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "401(k) Calculator",
  "applicationCategory": "CalculatorApplication",
  "operatingSystem": "Web",
  "description": "Calculate your potential 401(k) retirement savings with customizable contributions, employer match, and investment returns.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  },
  "featureList": [
    "Contribution calculator with employer match",
    "Investment return projections",
    "Annual contribution limit tracking",
    "Retirement savings visualization"
  ]
};

// FAQ Schema
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does a 401(k) calculator work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 401(k) calculator estimates your retirement savings by considering your current age, retirement age, salary, contribution percentage, employer match, and expected investment return rate."
      }
    },
    {
      "@type": "Question",
      "name": "What is employer matching in a 401(k)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employer matching is when your employer contributes additional money to your 401(k) based on your contributions, typically matching 50-100% of your contributions up to a certain percentage of your salary."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I contribute to my 401(k)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial experts typically recommend contributing at least enough to get your full employer match, ideally 10-15% of your salary. The IRS sets annual contribution limits that may affect your maximum contribution."
      }
    }
  ]
};

// BreadcrumbList Schema
export const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://calculatorof.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Finance Calculators",
      "item": "https://calculatorof.com/finance"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "401(k) Calculator",
      "item": "https://calculatorof.com/finance/401k-calculator"
    }
  ]
};