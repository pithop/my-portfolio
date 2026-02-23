import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import CustomCursor from '../components/CustomCursor';
import NoiseOverlay from '../components/NoiseOverlay';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from 'geist/font/sans';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});
import JsonLdSchema from '../components/JsonLdSchema';

// SEO: Define base metadata for the entire site
export const metadata = {
  title: {
    template: '%s | Idriss Chahraoui',
    default: 'Idriss Chahraoui - Software Engineer',
  },
  description: "The professional portfolio of Idriss Chahraoui, a Master's student in Software Engineering specializing in Java, Spring Boot, React, and cloud technologies.",
  // Keywords help search engines understand your content
  keywords: ['Idriss Chahraoui', 'Software Engineer', 'Développeur', 'Java', 'Spring Boot', 'React', 'Next.js', 'Portfolio', 'Montpellier'],
  authors: [{ name: 'Idriss Chahraoui', url: 'https://www.chahraouiidriss.fr.eu.org' }],
  creator: 'Idriss Chahraoui',
  // Open Graph tags for social media sharing
  openGraph: {
    title: 'Idriss Chahraoui - Software Engineer',
    description: 'Explore the portfolio of Idriss Chahraoui, showcasing projects in web development and AI.',
    url: 'https://www.chahraouiidriss.fr.eu.org',
    siteName: 'Idriss Chahraoui Portfolio',
    images: [
      {
        url: 'https://www.chahraouiidriss.fr.eu.org/og.jpg', // Ensure this image exists in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idriss Chahraoui - Software Engineer',
    description: 'Portfolio of a Software Engineer specializing in Java, React, and Cloud.',
    creator: '@pithop', // Your Twitter handle
    images: ['https://www.chahraouiidriss.fr.eu.org/og.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${GeistSans.variable} ${outfit.variable} font-sans`}>
      <head>
        {/* Adds structured data for Google */}
        <JsonLdSchema />
      </head>
      <body suppressHydrationWarning>
        <NoiseOverlay />
        <CustomCursor />
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
