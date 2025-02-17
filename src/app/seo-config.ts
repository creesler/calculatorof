export const siteConfig = {
  name: 'CalculatorOf.com',
  title: 'Free Online Calculators for Finance, Health, Math & More',
  description: 'Free online calculators for finance, health, pets, and math. Easy-to-use tools for ROI, BMI, loan payments, calories, pet food portions, and more.',
  url: 'https://calculatorof.com',
  ogImage: '/images/calculatorof.png',
  links: {
    twitter: 'https://twitter.com/calculatorof',
  },
  keywords: [
    'calculator',
    'online calculator',
    'free calculator',
    'finance calculator',
    'health calculator',
    'math calculator',
    'ROI calculator',
    'BMI calculator',
    'loan calculator',
    'calorie calculator',
    'pet food calculator',
    'percentage calculator',
    'scientific calculator',
    'fraction calculator'
  ],
  authors: [
    {
      name: 'CalculatorOf Team',
      url: 'https://calculatorof.com',
    },
  ],
  creator: 'CalculatorOf.com',
}

export const calculatorCategories = [
  {
    name: 'Finance',
    slug: 'finance',
    description: 'Financial calculators for investments and loans',
    calculators: [
      {
        name: 'ROI Calculator',
        slug: 'roi-calculator',
        description: 'Calculate Return on Investment',
        keywords: ['ROI', 'return on investment', 'investment calculator', 'profit calculator'],
        schema: {
          '@type': 'FinancialCalculator',
          category: 'Investment'
        }
      },
      {
        name: 'Loan Calculator',
        slug: 'loan-calculator',
        description: 'Calculate loan payments and interest',
        keywords: ['loan', 'mortgage', 'payment calculator', 'interest calculator'],
        schema: {
          '@type': 'FinancialCalculator',
          category: 'Loan'
        }
      }
    ]
  },
  {
    name: 'Health',
    slug: 'health',
    description: 'Health and fitness related calculators',
    calculators: [
      {
        name: 'BMI Calculator',
        slug: 'bmi-calculator',
        description: 'Calculate Body Mass Index',
        keywords: ['BMI', 'body mass index', 'weight calculator', 'health calculator'],
        schema: {
          '@type': 'HealthCalculator',
          category: 'BMI'
        }
      },
      {
        name: 'Calorie Calculator',
        slug: 'calorie-calculator',
        description: 'Calculate daily calorie needs',
        keywords: ['calorie', 'nutrition', 'diet calculator', 'weight loss'],
        schema: {
          '@type': 'HealthCalculator',
          category: 'Nutrition'
        }
      }
    ]
  },
  {
    name: 'Pet',
    slug: 'pet',
    description: 'Pet care calculators',
    calculators: [
      {
        name: 'Pet Food Calculator',
        slug: 'pet-food-calculator',
        description: 'Calculate pet food portions',
        keywords: ['pet food', 'dog food', 'cat food', 'portion calculator'],
        schema: {
          '@type': 'WebApplication',
          category: 'PetCare'
        }
      }
    ]
  },
  {
    name: 'Math',
    slug: 'math',
    description: 'Mathematical calculators',
    calculators: [
      {
        name: 'Percentage Calculator',
        slug: 'percentage-calculator',
        description: 'Calculate percentages',
        keywords: ['percentage', 'percent calculator', 'ratio calculator'],
        schema: {
          '@type': 'WebApplication',
          category: 'Mathematics'
        }
      },
      {
        name: 'Scientific Calculator',
        slug: 'scientific-calculator',
        description: 'Advanced mathematical calculations',
        keywords: ['scientific', 'advanced math', 'trigonometry', 'algebra'],
        schema: {
          '@type': 'WebApplication',
          category: 'Mathematics'
        }
      },
      {
        name: 'Fraction Calculator',
        slug: 'fraction-calculator',
        description: 'Calculate and simplify fractions',
        keywords: ['fractions', 'math', 'simplify fractions', 'fraction to decimal'],
        schema: {
          '@type': 'WebApplication',
          category: 'Mathematics'
        }
      }
    ]
  }
]

export function getCalculatorBySlug(slug: string) {
  for (const category of calculatorCategories) {
    const calculator = category.calculators.find(calc => calc.slug === slug)
    if (calculator) {
      return { ...calculator, category }
    }
  }
  return null
}

export function getAllCalculatorPaths() {
  const paths: string[] = []
  calculatorCategories.forEach(category => {
    category.calculators.forEach(calculator => {
      paths.push(`/${category.slug}/${calculator.slug}`)
    })
  })
  return paths
}

export function generateSEOMetadata(calculator: any, category: any) {
  return {
    title: `${calculator.name} - Free Online Calculator | CalculatorOf.com`,
    description: `Free online ${calculator.description.toLowerCase()}. Easy to use, accurate results, and no registration required.`,
    keywords: [...calculator.keywords, ...siteConfig.keywords],
    openGraph: {
      title: `${calculator.name} - CalculatorOf.com`,
      description: calculator.description,
      url: `${siteConfig.url}/${category.slug}/${calculator.slug}`,
      type: 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.name,
      description: calculator.description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${category.slug}/${calculator.slug}`,
    }
  }
}