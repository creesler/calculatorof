import { DefaultSeo } from 'next-seo'
import { defaultSEO } from './seo-config'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DefaultSeo {...defaultSEO} />
        {children}
      </body>
    </html>
  )
} 