import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retirement Calculator - Plan Your Future Savings | CalculatorOf',
  description: 'Use our free Retirement Calculator to estimate how much you need to save for retirement. Account for inflation, investment returns, and Social Security to create a comprehensive retirement plan.',
  keywords: [
    'Retirement Calculator',
    'Retirement planning calculator',
    'Retirement savings estimator',
    'How much to save for retirement',
    'Retirement goal calculator',
    'Future retirement calculator',
    'Social Security retirement calculator',
    'Retirement age calculator',
    'Retirement planning tools',
    'Calculate retirement needs'
  ],
  openGraph: {
    title: 'Retirement Calculator - Plan Your Future Savings | Free Online Tool',
    description: 'Calculate how much you need to save for retirement with our free calculator. Account for inflation, Social Security, and investment returns to plan your retirement effectively.',
    url: 'https://calculatorof.com/finance/retirement-calculator',
    siteName: 'Calculator Of',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://calculatorof.com/images/retirement-calculator-og.webp',
        width: 1200,
        height: 630,
        alt: 'Retirement Calculator - Plan Your Future'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator - Plan Your Financial Future',
    description: 'Find out how much you need to save for retirement with our free calculator. Get personalized insights and expert retirement planning tips.',
    images: ['https://calculatorof.com/images/retirement-calculator-twitter.webp']
  },
  alternates: {
    canonical: 'https://calculatorof.com/finance/retirement-calculator',
    languages: {
      'en-US': 'https://calculatorof.com/finance/retirement-calculator'
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
  "headline": "Retirement Calculator: Plan Your Financial Future",
  "description": "Learn how to plan for retirement using our comprehensive calculator. Understand savings goals, investment strategies, and Social Security benefits.",
  "image": [
    "https://calculatorof.com/images/retirement-calculator-hero.webp",
    "https://calculatorof.com/images/retirement-methodology.webp"
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
    "name": "Retirement Planning"
  },
  "educationalLevel": "Beginner",
  "keywords": "Retirement Calculator, Financial planning, Social Security, Investment strategy",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://calculatorof.com/finance/retirement-calculator"
  }
};

// Calculator Schema
export const calculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Retirement Calculator",
  "applicationCategory": "CalculatorApplication",
  "operatingSystem": "Web",
  "description": "Plan your retirement with our comprehensive calculator that considers savings, investments, Social Security, and inflation.",
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
    "Retirement savings goal calculator",
    "Social Security benefit estimation",
    "Inflation adjustment calculations",
    "Investment return projections"
  ]
};

// FAQ Schema
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much money do I need to retire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The amount needed for retirement varies based on your desired lifestyle, expected expenses, and retirement age. A common rule of thumb is to save 10-12 times your annual salary, but our calculator provides a personalized estimate based on your specific situation."
      }
    },
    {
      "@type": "Question",
      "name": "When should I start saving for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best time to start saving for retirement is as early as possible to take advantage of compound interest. Starting in your 20s or early 30s gives your money more time to grow and requires smaller monthly contributions to reach your retirement goals."
      }
    },
    {
      "@type": "Question",
      "name": "How does Social Security affect retirement planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Social Security provides a base level of retirement income, but shouldn't be your only source. The amount you receive depends on your earnings history and the age you start claiming benefits. Our calculator helps you factor in Social Security when planning your retirement savings."
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
      "name": "Retirement Calculator",
      "item": "https://calculatorof.com/finance/retirement-calculator"
    }
  ]
};