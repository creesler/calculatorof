/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable features that might cause HMR issues
  reactStrictMode: false, // Temporarily disable for testing
  swcMinify: false,      // Disable minification during development
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
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig 