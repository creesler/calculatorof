export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Calculator Categories</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Math Category */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Math</h2>
          <ul className="space-y-2">
            <li>
              <a href="/calculators/fraction" className="text-blue-600 hover:underline">
                Fraction Calculator
              </a>
            </li>
            {/* Add more math calculators here */}
          </ul>
        </div>

        {/* Existing categories... */}
      </div>
    </div>
  )
} 