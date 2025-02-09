import Link from 'next/link'
import { FaCalculator } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <FaCalculator className="mr-2" /> Calculator Website
        </p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* Math Category */}
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Math</h2>
          <div className="space-y-2">
            <Link href="/calculators/fraction" className="text-blue-600 hover:text-blue-800">
              Fraction Calculator
            </Link>
            {/* Keep existing math calculators */}
          </div>
        </div>

        {/* Keep existing categories and their calculators */}
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Finance</h2>
          <div className="space-y-2">
            <Link href="/calculators/loan" className="text-blue-600 hover:text-blue-800">
              Loan Calculator
            </Link>
          </div>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Health</h2>
          <div className="space-y-2">
            <Link href="/calculators/bmi" className="text-blue-600 hover:text-blue-800">
              BMI Calculator
            </Link>
            <Link href="/calculators/calorie" className="text-blue-600 hover:text-blue-800">
              Calorie Calculator
            </Link>
          </div>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Others</h2>
          <div className="space-y-2">
            <Link href="/calculators/percentage" className="text-blue-600 hover:text-blue-800">
              Percentage Calculator
            </Link>
            <Link href="/calculators/scientific" className="text-blue-600 hover:text-blue-800">
              Scientific Calculator
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 