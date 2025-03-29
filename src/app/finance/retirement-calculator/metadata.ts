import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator 2025: Find Your Perfect Savings Number | CalculatorOf",
  description: "Calculate exactly how much you need to retire comfortably. Our free retirement calculator factors in inflation (3.2% avg), Social Security benefits, and market returns (7% historical avg) to give you personalized results in minutes.",
  keywords: [
    "retirement calculator",
    "401k calculator",
    "how much to retire",
    "retirement savings goal",
    "early retirement calculator",
    "retirement planning tool",
    "best retirement calculator",
    "retirement income calculator",
    "when can I retire",
    "retirement nest egg calculator"
  ],
  openGraph: {
    title: "Free Retirement Calculator: Plan Your Ideal Retirement | CalculatorOf",
    description: "Discover how much you need to save for retirement based on your age, income, and goals. Our advanced tool accounts for inflation, taxes, and investment returns.",
    url: "https://calculatorof.com/retirement/calculator",
    siteName: "CalculatorOf",
    images: [
      {
        url: "/images/retirement-calculator-preview.webp",
        width: 1200,
        height: 630,
        alt: "Retirement calculator interface showing personalized savings projections"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Calculator: Find Your Magic Number",
    description: "Calculate your ideal retirement savings in 2 minutes - no registration required",
    creator: "@CalculatorOf",
    images: ["/images/retirement-calculator-preview.webp"]
  },
  alternates: {
    canonical: "https://calculatorof.com/retirement/calculator"
  },
  other: {
    'application/ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Retirement Calculator",
        "url": "https://calculatorof.com/retirement/calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Inflation-adjusted projections",
          "Social Security integration",
          "Multiple scenario comparison",
          "Printable results"
        ]
      },
      {
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
            "name": "Financial Calculators",
            "item": "https://calculatorof.com/financial"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Retirement Calculator",
            "item": "https://calculatorof.com/retirement/calculator"
          }
        ]
      }
    ])
  }
};