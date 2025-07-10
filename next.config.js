/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
        ],
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle www subdomain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.calculatorof.com',
            },
          ],
          destination: '/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig 