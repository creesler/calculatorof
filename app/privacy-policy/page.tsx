import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Calculator.of',
  description: 'Privacy policy for Calculator.of - Learn how we handle your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-500 mb-4">Last updated: 6/29/2025</p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600">
              We do not collect any personal information from our users. Our calculators operate entirely client-side.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Information</h2>
            <p className="text-gray-600">
              Since we don't collect personal information, we don't use or share any user data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies</h2>
            <p className="text-gray-600">
              We use only essential cookies necessary for the website's functionality.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 