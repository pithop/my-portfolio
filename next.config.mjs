/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['my-portfolio-jbew.vercel.app'],
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
                : "default-src 'self'; " +
                  "script-src 'self' https://va.vercel-scripts.com " +
                  "'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s=' " +
                  "'sha256-ouVZk5wMSzq8VLW3LwColE3RefBzyA8GXDMId9oaKts=' " +
                  "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' " +
                  "'sha256-ZUahdCk+bXYXjhhRw6PLCrDlvJ1wlcdDgUs2mzfxMLs=' " +
                  "'sha256-VWhQ0QIMbQp6qEOiQDqi13c1aXcVGoaJWCk1321lmN4=' " +
                  "'sha256-U9bzHGzJ8ofMp/hL2mcg3CP8hWF5NkBkxKRePTbwAuA=' " +
                  "'sha256-N892DVQDcTd0ZDKXLpKs7sxE0PTasRZWexGa5QYmwSo=' " +
                  "'sha256-9QtASrjSVh4jz733gqmzB7U50NN2j7uvQbOEbHbPEE8=' " +
                  "'sha256-UKWRd3hxWZNWsFSMG0Of6oz4c4g8f78BuglqWjGMaqU='; " +
                  "style-src 'self' 'unsafe-inline'; " +  // Add 'unsafe-inline' here
                  "img-src 'self'; " +
                  "font-src 'self'; " +
                  "connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io;"
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;