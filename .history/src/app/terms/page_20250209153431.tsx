export default function Terms() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="prose max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using CalculatorOf.com, you accept and agree to be bound by these Terms and Conditions.</p>
        
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily use our calculators for personal, non-commercial use only.</p>
        
        <h2>3. Disclaimer</h2>
        <p>The calculators are provided "as is". We make no warranties about the accuracy of results.</p>
        
        {/* Add more sections as needed */}
      </div>
    </main>
  )
} 