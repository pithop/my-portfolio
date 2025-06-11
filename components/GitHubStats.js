'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GitHubStats() {
  const [stats, setStats] = useState({ publicRepos: 0, followers: 0 });
  const username = 'pithop';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('GitHub API error');
        const data = await response.json();
        setStats({
          publicRepos: data.public_repos || 0,
          followers: data.followers || 0,
        });
      } catch (error) {
        console.error('GitHub stats fetch error:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div
      className="bg-glass p-4 rounded-lg shadow-lg max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-2">GitHub Stats</h3>
      <p>Public Repos: {stats.publicRepos}</p>
      <p>Followers: {stats.followers}</p>
    </motion.div>
  );
}