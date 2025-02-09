export default function Contact() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8">
          Have questions or suggestions? We'd love to hear from you.
        </p>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@calculatorof.com" className="text-blue-600 hover:underline">
                contact@calculatorof.com
              </a>
            </p>
            <p>
              <strong>Location:</strong> United States
            </p>
            {/* Add more contact information as needed */}
          </div>
        </div>
      </div>
    </main>
  )
} 