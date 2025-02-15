import ShareButtons from '@/components/ShareButtons'

return (
  <div className="min-h-screen bg-gray-50 relative">
    <FloatingButtons />

    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Pet Food Calculator</h1>
        <ShareButtons 
          title="Pet Food Calculator - CalculatorOf.com"
          description="Calculate the right amount of food for your pet with this free online calculator. Get personalized feeding recommendations."
        />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleCalculate} className="space-y-4">
          {/* ... rest of your existing code ... */}
        </form>
      </div>
    </main>
  </div>
) 