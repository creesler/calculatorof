import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Income Calculator - Estimate Your Monthly Income | CalculatorOf",
  description: "Use our free Retirement Income Calculator to estimate your monthly income based on your savings, expected return rate, and withdrawal period. Get expert insights and step-by-step guidance.",
  keywords: [
    "Retirement Income Calculator",
    "Retirement savings calculator",
    "Retirement withdrawal estimator",
    "How much can I withdraw in retirement?",
    "Retirement income planning",
    "Retirement financial calculator",
    "401k withdrawal calculator",
    "Best retirement income strategies",
    "Retirement planning tools",
    "Calculate retirement income online"
  ],

  openGraph: {
    title: "Retirement Income Calculator - Estimate Your Monthly Income | Free Online Tool",
    description: "Easily calculate your retirement income based on savings, investment returns, and withdrawal strategy. Get personalized insights and financial planning advice.",
    url: "https://calculatorof.com/retirement/retirement-income-calculator",
    siteName: "Calculator Of",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://calculatorof.com/images/retirement-income-calculator-og.webp",
        width: 1200,
        height: 630,
        alt: "Retirement Income Calculator - Estimate Monthly Income"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Retirement Income Calculator - Plan Your Future",
    description: "Find out how much you can withdraw monthly with our free retirement income calculator. Get step-by-step insights and expert tips.",
    images: ["https://calculatorof.com/images/retirement-income-calculator-twitter.webp"]
  },

  alternates: {
    canonical: "https://calculatorof.com/retirement/retirement-income-calculator",
    languages: {
      'en-US': 'https://calculatorof.com/retirement/retirement-income-calculator'
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

// Structured Data (Schema.org)

// Article Schema
export const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Retirement Income Calculator: Plan Your Future",
  "description": "Learn how to estimate your retirement income using our free calculator. Explore withdrawal strategies, investment returns, and financial planning insights.",
  "image": [
    "https://calculatorof.com/images/retirement-income-calculator-hero.webp",
    "https://calculatorof.com/images/retirement-income-methodology.webp"
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
    "name": "Retirement Income Calculation"
  },
  "educationalLevel": "Beginner",
  "keywords": "Retirement Income Calculator, Retirement planning, 401k calculator, pension withdrawal",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://calculatorof.com/retirement/retirement-income-calculator"
  }
};

// Calculator Schema
export const calculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Retirement Income Calculator",
  "applicationCategory": "CalculatorApplication",
  "operatingSystem": "Web",
  "description": "Easily estimate your monthly retirement income based on your savings, expected returns, and withdrawal period.",
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
    "Accurate retirement income estimation",
    "Customizable withdrawal period",
    "Adjustable investment return rate"
  ]
};

// FAQ Schema
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my retirement income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can calculate your estimated monthly retirement income by dividing your total savings by the number of months in retirement and factoring in your expected return rate."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 4% rule for retirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 4% rule suggests withdrawing 4% of your savings annually to make your money last at least 30 years."
      }
    },
    {
      "@type": "Question",
      "name": "How much savings do I need to retire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The amount depends on your expenses, expected retirement duration, and investment returns. Many financial planners recommend 25 times your annual expenses."
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
      "name": "Retirement Calculators",
      "item": "https://calculatorof.com/retirement"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Retirement Income Calculator",
      "item": "https://calculatorof.com/retirement/retirement-income-calculator"
    }
  ]
};
