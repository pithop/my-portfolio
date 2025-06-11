import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', '@tsparticles/react']
  }
};

// Conditionally apply analyzer
export default process.env.ANALYZE === 'true' 
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;