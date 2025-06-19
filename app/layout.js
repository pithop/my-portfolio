import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Idriss Chahraoui - Software Engineer</title>
        <meta name="description" content="Portfolio of Idriss Chahraoui - Master's student in Software Engineering" />
        <meta property="og:image" content="/og.jpg" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        {/* Preload Vercel Analytics script */}
        <link rel="preload" href="https://va.vercel-scripts.com/v1/script.debug.js" as="script" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
        <ScrollProgressBar />
          <Header />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}