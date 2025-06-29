'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">
                Calculator<span className="text-yellow-500">.</span>of
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 