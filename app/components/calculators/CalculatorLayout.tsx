interface CalculatorLayoutProps {
  title: string;
  description: React.ReactNode;
  calculator: React.ReactNode;
}

export default function CalculatorLayout({
  title,
  description,
  calculator
}: CalculatorLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Description Section */}
      <div className="mb-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <div className="prose prose-blue max-w-none">
          {description}
        </div>
      </div>

      {/* Calculator Section */}
      <div className="mt-12">
        {calculator}
      </div>
    </div>
  );
} 