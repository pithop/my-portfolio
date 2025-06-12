'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function BlogHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 w-full p-4 bg-glass shadow-md z-10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">
          ← Back to Portfolio
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/blog/new" className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            New Post
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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