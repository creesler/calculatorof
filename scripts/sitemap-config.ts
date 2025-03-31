import fs from 'fs'
import path from 'path'

interface Calculator {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  schema: {
    '@type': string;
    category: string;
  };
}

interface Category {
  name: string;
  slug: string;
  description: string;
  calculators: Calculator[];
}

export const calculatorCategories: Category[] = [
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
      },
      {
        name: '401(k) Calculator',
        slug: '401k-calculator',
        description: 'Project your 401(k) retirement savings',
        keywords: ['401k', 'retirement', 'savings calculator', 'investment growth', 'employer match'],
        schema: {
          '@type': 'FinancialCalculator',
          category: 'Retirement'
        }
      },
      {
        name: 'Retirement Calculator',
        slug: 'retirement-calculator',
        description: 'Plan your retirement savings and income',
        keywords: ['retirement', 'pension', 'savings calculator', 'retirement planning', 'retirement income'],
        schema: {
          '@type': 'FinancialCalculator',
          category: 'Retirement'
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
];

export function getAllCalculatorPaths(): string[] {
  const paths: string[] = [];
  calculatorCategories.forEach((category: Category) => {
    // Add category page
    paths.push(`/${category.slug}`);
    // Add calculator pages
    category.calculators.forEach((calculator: Calculator) => {
      paths.push(`/${category.slug}/${calculator.slug}`);
    });
  });
  return paths;
}

function updateMetadata(metadataPath: string, category: string, calcSlug: string, calcName: string): void {
  try {
    let content = fs.readFileSync(metadataPath, 'utf-8');
    let updated = false;
    const expectedCanonical = `https://calculatorof.com/${category}/${calcSlug}`;
    
    // Update metadata content if needed
    const metadata = {
      title: `${calcName} - Free Online Calculator`,
      description: `Calculate ${calcName.toLowerCase()} with our free online calculator. Easy to use tool.`,
      openGraph: {
        title: calcName,
        description: `Free online ${calcName.toLowerCase()} - easy to use tool`,
      },
      canonical: expectedCanonical
    };

    // Read existing content and parse it using a more compatible regex
    const existingContent = content.match(/metadata:\s*Metadata\s*=\s*{[\s\S]*?}/);
    if (existingContent) {
      let needsUpdate = false;

      // Check if any field needs updating
      if (!content.includes(`title: '${metadata.title}'`)) {
        needsUpdate = true;
      }
      if (!content.includes(`canonical: '${metadata.canonical}'`)) {
        needsUpdate = true;
      }
      if (!content.includes(`title: '${metadata.openGraph.title}'`)) {
        needsUpdate = true;
      }

      if (needsUpdate) {
        // Create new metadata content
        const newMetadata = `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${metadata.title}',
  description: '${metadata.description}',
  openGraph: {
    title: '${metadata.openGraph.title}',
    description: '${metadata.openGraph.description}',
  },
  alternates: {
    canonical: '${metadata.canonical}'
  }
}`;
        fs.writeFileSync(metadataPath, newMetadata);
        console.log(`  ✓ Updated metadata for ${calcName}`);
        updated = true;
      }
    }

    if (!updated) {
      console.log(`  ✓ Metadata already up to date for ${calcName}`);
    }
  } catch (error) {
    console.error(`❌ Error updating metadata file: ${metadataPath}`);
  }
}

export function scanForCalculators(): void {
  console.log('🔍 Starting calculator scan...');
  const appDir = path.join(process.cwd(), 'src', 'app');
  
  // Track statistics
  const stats = {
    totalCalculators: 0,
    newCalculators: 0,
    existingCalculators: 0,
    updatedMetadata: 0
  };

  const categories = fs.readdirSync(appDir).filter(dir => 
    fs.statSync(path.join(appDir, dir)).isDirectory() && 
    !dir.startsWith('_') && !dir.startsWith('.')
  );

  console.log(`Found ${categories.length} potential category directories`);

  categories.forEach(categoryDir => {
    const categoryPath = path.join(appDir, categoryDir);
    const calculators = fs.readdirSync(categoryPath).filter(dir => 
      fs.statSync(path.join(categoryPath, dir)).isDirectory() &&
      dir.endsWith('-calculator')
    );

    if (calculators.length > 0) {
      console.log(`\n📁 Category: ${categoryDir}`);
      console.log(`Found ${calculators.length} calculator(s)`);
    }

    // Find or create category in calculatorCategories
    let category = calculatorCategories.find(c => c.slug === categoryDir);
    if (!category) {
      console.log(`📌 New category detected: ${categoryDir}`);
      category = {
        name: categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1),
        slug: categoryDir,
        description: `${categoryDir.charAt(0).toUpperCase() + categoryDir.slice(1)} related calculators`,
        calculators: []
      };
      calculatorCategories.push(category);
    }

    // Update calculators
    calculators.forEach(calcDir => {
      stats.totalCalculators++;
      
      const calcSlug = calcDir;
      const calcName = calcDir
        .replace(/-calculator$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Calculator';

      // Check if calculator exists
      const existingCalc = category.calculators.find(c => c.slug === calcSlug);
      if (!existingCalc) {
        console.log(`  ➕ New calculator found: ${calcName}`);
        stats.newCalculators++;
        
        const newCalc: Calculator = {
          name: calcName,
          slug: calcSlug,
          description: `Calculate ${calcName.toLowerCase()}`,
          keywords: [calcName, ...calcName.split(' ')],
          schema: {
            '@type': category.slug === 'finance' ? 'FinancialCalculator' : 'WebApplication',
            category: calcName.replace(' Calculator', '')
          }
        };
        category.calculators.push(newCalc);

        // Generate metadata file if it doesn't exist
        const metadataPath = path.join(categoryPath, calcDir, 'metadata.ts');
        if (!fs.existsSync(metadataPath)) {
          const metadata = `import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${calcName} - Free Online Calculator',
  description: '${newCalc.description} with our free online calculator. Easy to use tool.',
  openGraph: {
    title: '${calcName}',
    description: 'Free online ${calcName.toLowerCase()} - easy to use tool',
  },
  alternates: {
    canonical: 'https://calculatorof.com/${category.slug}/${calcSlug}'
  }
}`;
          fs.writeFileSync(metadataPath, metadata);
          console.log(`  ✓ Generated metadata for ${calcName}`);
          stats.updatedMetadata++;
        }
      } else {
        stats.existingCalculators++;
      }

      // Update metadata for all calculators
      const metadataPath = path.join(categoryPath, calcDir, 'metadata.ts');
      if (fs.existsSync(metadataPath)) {
        updateMetadata(metadataPath, category.slug, calcSlug, calcName);
      }

      // Check if page.tsx exists
      const pagePath = path.join(categoryPath, calcDir, 'page.tsx');
      if (!fs.existsSync(pagePath)) {
        console.log(`  ℹ️ Note: page.tsx not found for ${calcName} - please create it manually`);
      }
    });
  });

  console.log('\n📊 Scan Summary:');
  console.log(`Total Calculators: ${stats.totalCalculators}`);
  console.log(`New Calculators: ${stats.newCalculators}`);
  console.log(`Existing Calculators: ${stats.existingCalculators}`);
  console.log(`Updated Metadata Files: ${stats.updatedMetadata}`);
}

// Call scanForCalculators before exporting
scanForCalculators(); 