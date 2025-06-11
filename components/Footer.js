'use client';

import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="p-4 bg-glass text-center mt-8">
      <p>{t('copyright')}</p>
    </footer>
  );
}