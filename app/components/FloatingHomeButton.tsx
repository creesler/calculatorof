'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingHomeButton() {
  const pathname = usePathname();

  // Don't show the button on the home page
  if (pathname === '/') {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed bottom-6 right-6 bg-yellow-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-50 group hover:bg-yellow-600"
      aria-label="Go to homepage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </Link>
  );
} 