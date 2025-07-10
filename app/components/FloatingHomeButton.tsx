'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingHomeButton() {
  const pathname = usePathname();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {pathname !== '/' && (
        <Link
          href="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:-translate-y-1"
          title="Go to Home"
          aria-label="Go to homepage"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      )}
      <button
        onClick={scrollToTop}
        className="bg-gray-700 hover:bg-gray-800 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:-translate-y-1"
        title="Scroll to Top"
        aria-label="Scroll to top of page"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
} 