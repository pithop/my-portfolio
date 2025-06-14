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
              ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " +
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; " +
                "connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io https://va.vercel-scripts.com https://vitals.vercel-insights.com http://34.29.82.146:11434 https://raw.githubusercontent.com;"
              : "default-src 'self'; " +
                "script-src 'self' https://va.vercel-scripts.com 'unsafe-inline' 'sha256-BbY+Z356ay7DP324EqGw2RXFld0Qy+9Zl8tFgV2fBP8=' 'sha256-/P5tsYcdE2C/nOs1S7jrIymO3HtsVnMg8R9fkbs+ygc='; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: blob: https:; " +
                "font-src 'self' data:; " +
                "connect-src 'self' https://api.github.com https://gitlab.com https://formspree.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://raw.githubusercontent.com http://34.29.82.146:11434; " +
                "frame-src 'self';"
          },
        ],
      },
    ];
  },
};

export default nextConfig;