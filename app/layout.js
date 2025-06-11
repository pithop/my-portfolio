import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Idriss Chahraoui - Software Engineer</title>
        <meta name="description" content="Portfolio of Idriss Chahraoui - Master's student in Software Engineering" />
        <meta property="og:image" content="/og.jpg" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}