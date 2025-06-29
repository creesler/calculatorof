'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">CalculatorOf</span>
              <span className="ml-1 text-yellow-400 text-2xl">●</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Free online calculators for every need
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">CONTACT</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:creesler@gmail.com" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  creesler@gmail.com
                </a>
              </li>
              <li className="text-gray-600">
                United States
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} CalculatorOf.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 