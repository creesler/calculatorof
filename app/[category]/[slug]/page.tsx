import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import type { CalculatorPage } from '@/types/calculator';
import ShareButtonsWrapper from '../../components/ShareButtonsWrapper';

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

interface CalculatorWithCategory {
  slug: string;
  category: string[];
}

export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const calculators = await db
    .collection('calculators')
    .find({})
    .project({ slug: 1, category: 1 })
    .toArray() as CalculatorWithCategory[];

  // Generate all possible category-slug combinations
  const params = calculators.flatMap((calc: CalculatorWithCategory) => 
    calc.category.map((cat: string) => ({
      category: cat.toLowerCase(),
      slug: calc.slug,
    }))
  );

  return params;
}

async function getCalculator(slug: string) {
  const { db } = await connectToDatabase();
  const calculator = await db.collection('calculators').findOne({ slug });
  return calculator as CalculatorPage | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calculator = await getCalculator(params.slug);
  
  if (!calculator) {
    return {
      title: 'Calculator Not Found',
    };
  }

  const category = calculator.category.find(
    cat => cat.toLowerCase() === params.category.toLowerCase()
  );

  if (!category) {
    return {
      title: 'Calculator Not Found',
    };
  }

  return {
    title: calculator.seo.title,
    description: calculator.seo.description,
    openGraph: {
      title: calculator.seo.ogTitle || calculator.seo.title,
      description: calculator.seo.ogDescription || calculator.seo.description,
      type: 'article',
      url: `https://calculator.of/${params.category}/${calculator.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.seo.title,
      description: calculator.seo.twitterDescription || calculator.seo.description,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const calculator = await getCalculator(params.slug);

  if (!calculator) {
    notFound();
  }

  // Verify that the calculator belongs to the specified category
  const isValidCategory = calculator.category
    .map(cat => cat.toLowerCase())
    .includes(params.category.toLowerCase());

  if (!isValidCategory) {
    notFound();
  }

  // Prepare FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calculator.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <article className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {calculator.title}
            </h1>
            <ShareButtonsWrapper 
              url={`https://calculator.of/${params.category}/${params.slug}`}
              title={calculator.title}
            />
            <p className="text-xl text-gray-600">
              {calculator.shortIntro}
            </p>
          </header>

          {/* Calculator Component */}
          <section className="mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: calculator.calculatorComponent }}
              className="bg-gray-50 rounded-lg p-6 shadow-sm"
            />
          </section>

          {/* Description */}
          <section className="prose max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: calculator.descriptionHtml }} />
          </section>

          {/* FAQs */}
          {calculator.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {calculator.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* External Links */}
          {calculator.externalLinks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                References
              </h2>
              <ul className="space-y-2">
                {calculator.externalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Screenshot */}
          <section>
            <img
              src={calculator.screenshot.imageUrl}
              alt={calculator.screenshot.altText}
              className="rounded-lg shadow-lg w-full"
            />
          </section>

          {/* Metadata */}
          <footer className="mt-8 text-sm text-gray-500">
            {calculator.author && (
              <p>Written by {calculator.author}</p>
            )}
            {calculator.lastUpdated && (
              <p>Last updated: {new Date(calculator.lastUpdated).toLocaleDateString()}</p>
            )}
          </footer>
        </div>
      </article>
    </>
  );
} 