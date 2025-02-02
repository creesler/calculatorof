import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center">
          {!imageError ? (
            <Image
              src="/images/calculatorof.png"
              alt="ROI Calculator Logo"
              width={200}
              height={100}
              className="mr-4"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-[200px] h-[100px] bg-gray-200 flex items-center justify-center mr-4">
              <span className="text-gray-600">ROI</span>
            </div>
          )}
          <h1 className="text-xl font-bold">ROI Calculator</h1>
        </nav>
      </header>
      {children}
      <footer className="bg-gray-100 mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} ROI Calculator. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
} 