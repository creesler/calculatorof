/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable App Router
  experimental: {
    appDir: true
  },
  // Disable features that might cause HMR issues
  reactStrictMode: false,
  swcMinify: false,
  images: {
    unoptimized: true,
    domains: ['calculatorof.com']
  },
  // Optimize for development
  webpack: (config, { dev, isServer }) => {
    if (!isServer && dev) {
      // Optimize HMR
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all'
        }
      }
      
      // Disable some watches
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