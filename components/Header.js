'use client';

import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <header className="fixed top-0 w-full p-4 bg-glass shadow-md z-10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {['aboutcontent', 'experience', 'projects', 'skills', 'github', 'blog', 'contact'].map((section) => (
            <li key={section}>
              <a 
                href={section === 'blog' ? '/blog' : `#${section}`}
                className="hover:text-blue-500 transition-colors"
              >
                {t(`${section}Title`)}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Language and Theme Toggle */}
        <div className="flex space-x-4">
          <button onClick={() => changeLanguage('en')} className="hover:underline hidden sm:block">EN</button>
          <button onClick={() => changeLanguage('fr')} className="hover:underline hidden sm:block">FR</button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'dark' ? '☀️' : '🌙') : ' '}
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-glass rounded-lg shadow-lg p-4">
          <ul className="space-y-4">
            {['aboutcontent', 'experience', 'projects', 'skills', 'github', 'blog', 'contact'].map((section) => (
              <li key={section}>
                <a 
                  href={section === 'blog' ? '/blog' : `#${section}`}
                  className="block py-2 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`${section}Title`)}
                </a>
              </li>
            ))}
            <li className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button onClick={() => changeLanguage('en')} className="hover:underline">EN</button>
              <button onClick={() => changeLanguage('fr')} className="hover:underline">FR</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}