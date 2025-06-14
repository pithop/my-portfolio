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
                  "script-src 'self' https://va.vercel-scripts.com " +
                  // Added the new missing hash from the error message:
                  "'sha256-Sb/MAzhP4yaBlSgQFTRCV+uCERNZstQb2P/foiU7bzc=' " + 
                  "'sha256-pbG3g4i5TYFiHwYV6L0nc5U41lJx8+QpHjHWzqiWwro=' " +
                  "'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s=' " +
                  "'sha256-ouVZk5wMSzq8VLW3LwColE3RefBzyA8GXDMId9oaKts=' " +
                  "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' " +
                  "'sha256-ZUahdCk+bXYXjhhRw6PLCrDlvJ1wlcdDgUs2mzfxMLs=' " +
                  "'sha256-VWhQ0QIMbQp6qEOiQDqi13c1aXcVGoaJWCk1321lmN4=' " +
                  "'sha256-U9bzHGzJ8ofMp/hL2mcg3CP8hWF5NkBkxKRePTbwAuA=' " +
                  "'sha256-N892DVQDcTd0ZDKXLpKs7sxE0PTasRZWexGa5QYmwSo=' " +
                  "'sha256-9QtASrjSVh4jz733gqmzB7U50NN2j7uvQbOEbHbPEE8=' " +
                  "'sha256-UKWRd3hxWZNWsFSMG0Of6oz4c4g8f78BuglqWjGMaqU=' " +
                  "'sha256-6qv3akp7aecxLcWBTKIxHhd1cc0h+TTTuN0bcyNm/SI=' " +
                  "'sha256-LWh5mpBXtX7DIebg74gt+xZNBWlMULGhyinwFd+gmQc=' " +
                  "'sha256-WlQClIzOyMLDx8A+W8TgOPh6Un664jFvCkdTa6rbw8o='; " +
                  "style-src 'self' 'unsafe-inline'; " +
                  "img-src 'self' data: blob:; " +
                  "font-src 'self' data:; " +
                  // Added Vercel domains for connections:
                  "connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io https://va.vercel-scripts.com https://vitals.vercel-insights.com; " +
                  "frame-src 'self';"
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;