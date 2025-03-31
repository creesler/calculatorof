/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['calculatorof.com']
  },
  // Optimize build
  webpack: (config, { dev, isServer }) => {
    // Only apply these optimizations in development
    if (!isServer && dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all'
        }
      }
      
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git'],
        poll: false,
        followSymlinks: false,
      }
    }
    return config
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig