import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import type { CalculatorPage } from '@/types/calculator';

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
      url: `https://calculator.of/calculators/${calculator.slug}`,
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

function ShareButtons({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4 mb-8">
      <p className="text-gray-600 mr-2">Share this calculator with your Friends/Family</p>
      
      {/* Twitter/X Share */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-800"
        title="Share on Twitter/X"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-800"
        title="Share on Facebook"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
        </svg>
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-800"
        title="Share on LinkedIn"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Email Share */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this calculator: ${url}`)}`}
        className="text-gray-600 hover:text-gray-800"
        title="Share via Email"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          // You might want to add a toast notification here
        }}
        className="text-gray-600 hover:text-gray-800"
        title="Copy Link"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
    </div>
  );
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
            <ShareButtons url={pageUrl} title={calculator.title} />
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
                      {formatText(faq.question)}
                    </h3>
                    <div className="text-gray-600">
                      {formatText(faq.answer).split(/\\n|\n/).map((line, i) => (
                        <p key={i} className="mb-2">{line.trim()}</p>
                      ))}
                    </div>
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
          <footer className="mt-12 text-sm text-gray-500">
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