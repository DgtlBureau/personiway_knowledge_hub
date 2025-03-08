/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'onesight.solutions',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cochranesupply.com',
        pathname: '/media/catalog/product/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*/',
        destination: '/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/(.*)',
        destination: 'https://hub.personiway.com/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'thebrightbyte.com',
          },
        ],
      },
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
