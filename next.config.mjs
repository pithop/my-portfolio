/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['my-portfolio-jbew.vercel.app'], // Your Vercel domain
    },
  
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: process.env.NODE_ENV === 'development'
                ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' ws: https://api.github.com https://gitlab.com http://34.29.82.146:11434 https://formspree.io;"
                : "default-src 'self'; script-src 'self' https://va.vercel-scripts.com; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io;"
            }
          ],
        },
      ];
    },
  };
  
  // For bundle analyzer (optional)
  const withBundleAnalyzer = (process.env.ANALYZE === 'true')
    ? (await import('@next/bundle-analyzer')).default({ enabled: true })
    : (config) => config;
  
  export default withBundleAnalyzer(nextConfig);