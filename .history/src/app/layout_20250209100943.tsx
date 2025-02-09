import { DefaultSeo } from 'next-seo'
import { defaultSEO } from './seo-config'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <DefaultSeo {...defaultSEO} />
      </head>
      <body>{children}</body>
    </html>
  )
} 