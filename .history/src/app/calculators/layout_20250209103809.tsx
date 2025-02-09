import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calculators | CalculatorOf.com',
  description: 'Free online calculators for every need'
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="py-2 px-6 bg-white border-b">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold">CalculatorOf</span>
          <span className="text-yellow-400 text-2xl">●</span>
        </Link>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 