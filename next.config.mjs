/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
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
};

export default nextConfig;
