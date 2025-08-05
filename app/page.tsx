import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator.of - Free Online Calculators',
  description: 'Collection of free online calculators for various purposes. Easy to use, accurate, and always free.',
  openGraph: {
    title: 'Calculator.of - Free Online Calculators',
    description: 'Collection of free online calculators for various purposes. Easy to use, accurate, and always free.',
    type: 'website',
    url: 'https://www.calculatorof.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator.of - Free Online Calculators',
    description: 'Collection of free online calculators for various purposes. Easy to use, accurate, and always free.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calculator.of
        </h1>
        <p className="text-xl text-gray-600">
          Collection of free online calculators for various purposes. Easy to use, accurate, and always free.
        </p>
      </div>
    </div>
  );
}