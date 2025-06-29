import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const SITE_URL = 'https://calculatorof.com';

// Define the CalculatorPage interface
interface CalculatorPage {
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
}

// Validate required fields
function validateCalculatorPage(data: any): { isValid: boolean; error?: string } {
  if (!data.title) return { isValid: false, error: "Title is required" };
  if (!data.slug) return { isValid: false, error: "Slug is required" };
  if (!data.seo?.title) return { isValid: false, error: "SEO title is required" };
  if (!data.seo?.description) return { isValid: false, error: "SEO description is required" };
  if (!Array.isArray(data.category)) return { isValid: false, error: "Category must be an array" };
  if (!data.shortIntro) return { isValid: false, error: "Short intro is required" };
  if (!data.calculatorComponent) return { isValid: false, error: "Calculator component is required" };
  if (!data.descriptionHtml) return { isValid: false, error: "Description HTML is required" };
  if (!Array.isArray(data.keywords)) return { isValid: false, error: "Keywords must be an array" };
  if (!Array.isArray(data.faqs)) return { isValid: false, error: "FAQs must be an array" };
  if (!Array.isArray(data.externalLinks)) return { isValid: false, error: "External links must be an array" };
  if (!data.screenshot?.imageUrl) return { isValid: false, error: "Screenshot image URL is required" };
  if (!data.screenshot?.altText) return { isValid: false, error: "Screenshot alt text is required" };

  return { isValid: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validation = validateCalculatorPage(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error, status: 400 },
        { status: 400 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Insert the calculator page
    const result = await db.collection('calculators').insertOne(body);

    if (!result.insertedId) {
      return NextResponse.json(
        { error: "Failed to insert calculator", status: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error creating calculator:', error);
    return NextResponse.json(
      { error: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
} 