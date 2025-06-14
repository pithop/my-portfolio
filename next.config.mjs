/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;"
              : "default-src 'self'; " +
                "script-src 'self' https://va.vercel-scripts.com 'unsafe-inline'; " + // Allow unsafe-inline for Vercel Analytics
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: blob:; " +
                "font-src 'self' data:; " +
                "connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io https://va.vercel-scripts.com https://vitals.vercel-insights.com; " +
                "frame-src 'self';"
          },
        ],
      },
    ];
  },
};

export default nextConfig;