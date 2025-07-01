export interface CalculatorPage {
  title: string;
  slug: string;
  category: string[];
  seo: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterDescription?: string;
  };
  shortIntro: string;
  calculatorComponent: string;
  descriptionHtml: string;
  keywords: string[];
  internalLinkAnchors?: string[];
  faqs: { question: string; answer: string }[];
  externalLinks: { label: string; url: string }[];
  screenshot: { imageUrl: string; altText: string };
  author?: string;
  lastUpdated?: string;
  customStructuredData?: Record<string, any>;
  _customStructuredDataRaw?: string;
} 