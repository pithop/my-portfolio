/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // Optimizes for Docker containers
    images: {
        domains: ['https://my-portfolio-jbew.vercel.app/'], // Your Vercel domain
    },
    
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://34.29.82.146"
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