import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistSans } from 'geist/font/sans';
import JsonLdSchema from '../components/JsonLdSchema';
export const metadata = {
  // Title template will add "| Idriss Chahraoui" to all page titles
  title: {
    template: '%s | Idriss Chahraoui',
    default: 'Idriss Chahraoui - Software Engineer', // Default title for the homepage
  },
  description: "The professional portfolio of Idriss Chahraoui, a Master's student in Software Engineering specializing in Java, Spring Boot, React, and cloud technologies.",
  // Keywords help search engines understand your content
  keywords: ['Idriss Chahraoui', 'Software Engineer', 'Développeur', 'Java', 'Spring Boot', 'React', 'Next.js', 'Portfolio'],
  // Open Graph tags for social media sharing
  openGraph: {
    title: 'Idriss Chahraoui - Software Engineer',
    description: 'Explore the portfolio of Idriss Chahraoui, showcasing projects in web development and AI.',
    url: 'https://my-portfolio-jbew.vercel.app', // Replace with your final domain
    siteName: 'Idriss Chahraoui Portfolio',
    images: [
      {
        url: '/og.jpg', // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR', // Change to fr_FR if French is primary
    type: 'website',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <head>
        {/* We will add structured data here */}
        <JsonLdSchema />
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