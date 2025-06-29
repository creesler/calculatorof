import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Calculator.of',
  description: 'Terms and conditions for using Calculator.of calculators and services.',
};

export default function TermsPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-500 mb-4">Last updated: 6/29/2025</p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using CalculatorOf.com, you accept and agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600">
              Permission is granted to temporarily use our calculators for personal, non-commercial use only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600">
              The calculators are provided "as is". We make no warranties about the accuracy of results.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 