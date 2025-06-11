/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // Optimizes for Docker containers
    images: {
      domains: ['https://my-portfolio-jbew.vercel.app/'], // Your Vercel domain
    },
    // Enable internationalized routing
    i18n: {
      locales: ['en', 'fr'],
      defaultLocale: 'en',
    },
    // Enable HTTPS security headers
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload'
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