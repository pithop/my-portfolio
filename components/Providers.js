'use client';

import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

export default function Providers({ children }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}