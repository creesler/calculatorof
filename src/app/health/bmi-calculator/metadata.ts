import { Metadata } from 'next'
import { siteConfig } from '../../seo-config'

// BMI Calculator structured data
const bmiCalculatorStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'BMI Calculator',
  'applicationCategory': 'HealthApplication',
  'operatingSystem': 'Web',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  },
  'description': 'Calculate your Body Mass Index (BMI) with our free online calculator. Get instant health insights and weight recommendations.',
  'url': 'https://calculatorof.com/health/bmi-calculator',
  'provider': {
    '@type': 'Organization',
    'name': 'CalculatorOf.com',
    'url': 'https://calculatorof.com'
  },
  'screenshot': 'https://calculatorof.com/images/bmicalculator.jpg',
  'featureList': 'Calculate BMI, Determine weight category, Get healthy weight range',
  'softwareHelp': 'https://calculatorof.com/contact',
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.8',
    'ratingCount': '156',
    'bestRating': '5',
    'worstRating': '1'
  }
};

// Article structured data
const bmiArticleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Understanding Body Mass Index (BMI)',
  'description': 'Learn how BMI is calculated, what the different categories mean, and how to interpret your results.',
  'image': 'https://calculatorof.com/images/bmicalculator.jpg',
  'datePublished': '2023-01-15',
  'dateModified': new Date().toISOString().split('T')[0],
  'author': {
    '@type': 'Organization',
    'name': 'CalculatorOf.com',
    'url': 'https://calculatorof.com'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'CalculatorOf.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://calculatorof.com/images/calculatorof.png'
    }
  },
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://calculatorof.com/health/bmi-calculator'
  }
};

// BreadcrumbList structured data
const bmiBreadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://calculatorof.com'
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Health Calculators',
      'item': 'https://calculatorof.com/health'
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'name': 'BMI Calculator',
      'item': 'https://calculatorof.com/health/bmi-calculator'
    }
  ]
};

// FAQ structured data
const bmiFaqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'What is BMI?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Body Mass Index (BMI) is a numerical value of your weight in relation to your height. It is a commonly used method to categorize whether a person has a healthy body weight for their height. The formula is BMI = weight(kg) / height²(m).'
      }
    },
    {
      '@type': 'Question',
      'name': 'What are the BMI categories?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'BMI categories are: Underweight (less than 18.5), Normal weight (18.5 to 24.9), Overweight (25 to 29.9), and Obesity (30 or greater).'
      }
    },
    {
      '@type': 'Question',
      'name': 'What is a healthy BMI range?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A BMI between 18.5 and 24.9 is considered healthy for most adults. However, this range may not be suitable for all body types and ethnicities. Some people may be healthy at BMIs slightly outside this range depending on factors like muscle mass, age, and body composition.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Why might BMI not be accurate for everyone?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'BMI doesn\'t distinguish between weight from muscle and weight from fat. Athletes with high muscle mass might have a high BMI but be healthy. Similarly, elderly people might have a normal BMI but low muscle mass. BMI also doesn\'t account for differences in body composition between different ethnic groups.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How often should I check my BMI?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'For most adults, checking BMI once or twice a year is sufficient unless you\'re actively trying to lose or gain weight. If you\'re on a weight management program, you might want to check more frequently to track progress, but avoid obsessive monitoring as weight naturally fluctuates.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What\'s the difference between BMI and body fat percentage?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'BMI is calculated solely from height and weight, while body fat percentage measures the actual proportion of fat in your body. Body fat percentage is more accurate for assessing health risks but requires specialized equipment to measure properly. BMI is easier to calculate and serves as a useful screening tool.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Can children use this BMI calculator?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'This calculator is designed for adults. For children and teens (ages 2-19), BMI is calculated the same way but interpreted differently. Children\'s BMI should be assessed using age and sex-specific percentiles rather than the fixed categories used for adults. Please consult a pediatrician for proper assessment of a child\'s BMI.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How is BMI calculated?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'BMI is calculated using the formula: BMI = weight(kg) / height²(m). In imperial units, the formula is: BMI = 703 × weight(lb) / height²(in). Our calculator automatically handles the conversion based on your selected unit system, so you don\'t need to convert measurements manually.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What health risks are associated with a high BMI?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A BMI in the overweight or obese range is associated with increased risk of several health conditions, including: type 2 diabetes, heart disease, stroke, certain cancers, sleep apnea, osteoarthritis, fatty liver disease, kidney disease, and pregnancy complications. However, BMI alone cannot predict an individual\'s health risks.'
      }
    },
    {
      '@type': 'Question',
      'name': 'What health risks are associated with a low BMI?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A BMI below 18.5 (underweight) is associated with health risks such as: malnutrition, vitamin deficiencies, anemia, osteoporosis, decreased immune function, fertility issues, and complications from surgery. Being underweight can be a sign of underlying health conditions and should be discussed with a healthcare provider.'
      }
    },
    {
      '@type': 'Question',
      'name': 'How can I achieve a healthy BMI?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Achieving a healthy BMI involves balanced nutrition, regular physical activity, and healthy lifestyle habits. Focus on eating a variety of nutrient-dense foods, controlling portion sizes, staying hydrated, getting regular exercise (both cardio and strength training), managing stress, and getting adequate sleep. Consult with healthcare professionals before starting any weight management program.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Does BMI vary by age and gender?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'While the standard BMI categories are the same for adult men and women, body composition naturally changes with age. Older adults typically have more body fat than younger adults at the same BMI. Some health organizations suggest slightly higher BMI ranges may be acceptable for older adults. For children and teens, BMI is age and gender-specific.'
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'BMI Calculator - Free Body Mass Index Calculator | CalculatorOf.com',
  description: 'Calculate your Body Mass Index (BMI) with our free online calculator. Easy to use tool for measuring body composition and health. Get instant results and health insights.',
  keywords: [
    'BMI calculator',
    'body mass index',
    'weight calculator',
    'health calculator',
    'BMI chart',
    'healthy weight',
    'BMI formula',
    'obesity calculator',
    'weight health tool',
    'free BMI calculator'
  ],
  openGraph: {
    title: 'BMI Calculator - Free Body Mass Index Calculator',
    description: 'Calculate your Body Mass Index (BMI) with our free online calculator. Get instant health insights and weight recommendations.',
    url: 'https://calculatorof.com/health/bmi-calculator',
    type: 'website',
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://calculatorof.com/images/bmicalculator.jpg',
        width: 800,
        height: 400,
        alt: 'BMI Calculator Tool',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator - Free Body Mass Index Tool',
    description: 'Calculate your Body Mass Index (BMI) with our free online calculator. Get instant health insights.',
    images: ['https://calculatorof.com/images/bmicalculator.jpg'],
    creator: '@calculatorof',
    site: '@calculatorof',
  },
  alternates: {
    canonical: 'https://calculatorof.com/health/bmi-calculator',
    languages: {
      'en-US': 'https://calculatorof.com/health/bmi-calculator',
    },
  },
  category: 'health',
  other: {
    'structured-data': [
      JSON.stringify(bmiCalculatorStructuredData),
      JSON.stringify(bmiFaqStructuredData),
      JSON.stringify(bmiArticleStructuredData),
      JSON.stringify(bmiBreadcrumbStructuredData)
    ]
  }
}