import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Calculator.of',
  description: 'Get in touch with Calculator.of team for questions or suggestions.',
};

export default function ContactPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        <div className="space-y-8">
          <p className="text-lg text-gray-600">
            Have questions or suggestions? We'd love to hear from you.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            
            <div className="space-y-4">
              <div>
                <dt className="font-medium text-gray-900">Email:</dt>
                <dd className="mt-1">
                  <a 
                    href="mailto:creesler@gmail.com" 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    creesler@gmail.com
                  </a>
                </dd>
              </div>

              <div>
                <dt className="font-medium text-gray-900">Location:</dt>
                <dd className="mt-1 text-gray-600">United States</dd>
              </div>
            </div>
          </section>

          <section>
            <p className="text-gray-600">
              We aim to respond to all inquiries within 24-48 hours during business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 