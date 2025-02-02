import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
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