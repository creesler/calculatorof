import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI Calculator - Return on Investment Calculator',
  description: 'Free online ROI calculator to calculate return on investment and payback period. Simple and easy to use investment calculator.',
  openGraph: {
    title: 'ROI Calculator',
    description: 'Calculate return on investment and payback period easily',
    images: [{
      url: '/images/roi-calc.jpg',
      width: 1200,
      height: 630,
    }],
  },
  alternates: {
    canonical: 'https://calculatorof.com/finance/roi-calculator'
  }
}

export default function ROICalculator() {
  return (
    <div>
      {/* Your existing ROI calculator JSX */}
    </div>
  )
} 