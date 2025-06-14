import { headers } from 'next/headers';
import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  // Generate nonce for production only
  const nonce = process.env.NODE_ENV === 'production' 
    ? Buffer.from(crypto.randomBytes(16)).toString('base64')
    : undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Idriss Chahraoui - Software Engineer</title>
        <meta name="description" content="Portfolio of Idriss Chahraoui - Master's student in Software Engineering" />
        <meta property="og:image" content="/og.jpg" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        
        {/* Add nonce to CSP header */}
        {nonce && (
          <meta httpEquiv="Content-Security-Policy" content={`script-src 'nonce-${nonce}' 'self' https://va.vercel-scripts.com;`} />
        )}
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Analytics nonce={nonce} />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}