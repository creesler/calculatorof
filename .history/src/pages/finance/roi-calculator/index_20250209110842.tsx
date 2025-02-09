import { NextSeo } from 'next-seo'

export default function ROICalculator() {
  return (
    <>
      <NextSeo
        title="ROI Calculator - Free Investment Return Calculator"
        description="Calculate your Return on Investment (ROI) and payback period with our free online ROI calculator. Simple and accurate investment planning tool."
        canonical="https://calculatorof.com/finance/roi-calculator"
        openGraph={{
          url: 'https://calculatorof.com/finance/roi-calculator',
          title: 'ROI Calculator - Investment Return Calculator',
          description: 'Free online ROI calculator for investment planning',
          images: [
            {
              url: '/images/roi-calculator.jpg',
              width: 1200,
              height: 630,
              alt: 'ROI Calculator',
            },
          ],
        }}
      />
      {/* Keep existing calculator JSX */}
    </>
  )
} 