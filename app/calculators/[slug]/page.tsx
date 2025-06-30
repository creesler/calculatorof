import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import type { CalculatorPage } from '@/types/calculator';
import ShareButtonsWrapper from '@/app/components/ShareButtonsWrapper';

export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const calculators = await db
    .collection('calculators')
    .find({})
    .project({ slug: 1 })
    .toArray();

  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
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

  return {
    title: calculator.seo.title,
    description: calculator.seo.description,
    openGraph: {
      title: calculator.seo.ogTitle || calculator.seo.title,
      description: calculator.seo.ogDescription || calculator.seo.description,
      type: 'article',
      url: `https://calculatorof.com/calculators/${calculator.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.seo.title,
      description: calculator.seo.twitterDescription || calculator.seo.description,
    },
  };
}

function formatText(text: string): string {
  // Replace literal newlines with spaces
  return text.replace(/\\n/g, ' ').replace(/\n/g, ' ').trim();
}

export default async function CalculatorPage({ params }: Props) {
  const calculator = await getCalculator(params.slug);

  if (!calculator) {
    notFound();
  }

  const pageUrl = `https://calculatorof.com/calculators/${params.slug}`;

  // Format text content
  const formattedDescription = calculator.descriptionHtml
    .split(/\\n|\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('</p><p>');

  // Prepare FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calculator.faqs.map(faq => ({
      '@type': 'Question',
      name: formatText(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: formatText(faq.answer),
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
            <ShareButtonsWrapper url={pageUrl} title={calculator.title} />
          </header>

          {/* Calculator Component */}
          <section className="mb-12">
            <div
              dangerouslySetInnerHTML={{ 
                __html: calculator.calculatorComponent
                  .split(/\\n|\n/)
                  .map(line => line.trim())
                  .filter(line => line.length > 0)
                  .join('</p><p>')
              }}
              className="bg-gray-50 rounded-lg p-6 shadow-sm prose max-w-none"
            />
          </section>

          {/* Description */}
          <section className="prose max-w-none mb-12">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: `<p>${formattedDescription}</p>`
              }}
            />
          </section>
        </div>
      </article>
    </>
  );
}