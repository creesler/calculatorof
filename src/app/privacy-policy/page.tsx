'use client'

import FloatingButtons from '@/components/FloatingButtons'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <FloatingButtons />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Information We Collect</h2>
          <p>We do not collect any personal information from our users. Our calculators operate entirely client-side.</p>
          
          <h2>2. How We Use Information</h2>
          <p>Since we don't collect personal information, we don't use or share any user data.</p>
          
          <h2>3. Cookies</h2>
          <p>We use only essential cookies necessary for the website's functionality.</p>
          
          {/* Add more sections as needed */}
        </div>
      </main>
    </div>
  )
} 