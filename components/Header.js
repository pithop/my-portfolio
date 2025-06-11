'use client';

import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <header className="fixed top-0 w-full p-4 bg-glass shadow-md z-10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <ul className="flex space-x-6">
          {['about-content', 'experience', 'projects', 'skills', 'github', 'contact'].map((section) => (
            <li key={section}>
              <a href={`#${section}`} className="hover:text-blue-500 transition-colors">
                {t(`${section}Title`)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <button onClick={() => changeLanguage('en')} className="hover:underline">EN</button>
          <button onClick={() => changeLanguage('fr')} className="hover:underline">FR</button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'dark' ? '☀️' : '🌙') : ' '}
          </button>
        </div>
      </nav>
    </header>
  );
}