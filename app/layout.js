import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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