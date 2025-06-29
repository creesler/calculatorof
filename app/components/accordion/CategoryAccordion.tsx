'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Calculator {
  title: string;
  slug: string;
  shortIntro?: string;
  seo: {
    description: string;
  };
}

interface CategoryAccordionProps {
  category: string;
  calculators: Calculator[];
}

export default function CategoryAccordion({ category, calculators }: CategoryAccordionProps) {
  const [expandedCategory, setExpandedCategory] = useState(false);
  const [expandedCalcs, setExpandedCalcs] = useState<{ [key: string]: boolean }>({});

  const toggleCalculator = (slug: string) => {
    setExpandedCalcs(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm">
      {/* Category Header */}
      <button
        onClick={() => setExpandedCategory(!expandedCategory)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          {capitalizeFirstLetter(category)} Calculators
        </h2>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            expandedCategory ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Calculators List */}
      <div className={`transition-all duration-200 ease-in-out ${
        expandedCategory ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        {calculators.map((calc, index) => (
          <div 
            key={calc.slug} 
            className={`border-b border-gray-200 last:border-b-0 ${
              expandedCalcs[calc.slug] ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            {/* Calculator Header */}
            <div className="flex items-center justify-between px-6 py-3">
              <button
                onClick={() => toggleCalculator(calc.slug)}
                className="flex-1 flex items-center text-left"
              >
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-400 mr-3 transition-transform duration-200 ${
                    expandedCalcs[calc.slug] ? 'transform rotate-180' : ''
                  }`}
                />
                <h3 className="text-base font-medium text-gray-900">
                  {calc.title}
                </h3>
              </button>
              <Link
                href={`/${category}/${calc.slug}`}
                className="ml-4 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Calculator
              </Link>
            </div>

            {/* Calculator Description */}
            <div className={`transition-all duration-200 ease-in-out ${
              expandedCalcs[calc.slug] 
                ? 'max-h-[500px] opacity-100' 
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              <div className="px-6 py-3 pl-13 border-t border-gray-100">
                <p className="text-gray-600 ml-7">
                  {calc.shortIntro || calc.seo.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 