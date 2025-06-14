// app/blog/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import matter from 'gray-matter'; // Make sure you have this installed

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const owner = 'pithop';
        const repo = 'my-portfolio-blog';
        const path = 'posts';
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        // Fetch list of files from GitHub API
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: token ? { Authorization: `token ${token}` } : {}
          }
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const files = await response.json();
        const postsData = [];

        for (const file of files) {
          if (file.type === 'dir') continue;
          
          // Use our proxy to fetch the content
          const proxyUrl = `/api/github-content?path=${owner}/${repo}/main/${file.path}`;
          const contentResponse = await fetch(proxyUrl);
          
          if (!contentResponse.ok) {
            console.error(`Failed to fetch content for ${file.name}`);
            continue;
          }
          
          const content = await contentResponse.text();
          const { data } = matter(content);
          postsData.push({
            slug: file.name.replace('.md', ''),
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
          });
        }

        setPosts(postsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="container-padding py-20 text-center">Loading blog posts...</div>;
  if (error) return <div className="container-padding py-20 text-center">Error: {error}</div>;

  return (
    <div className="container-padding py-20">
      <h1 className="text-4xl font-bold mb-12">My Blog</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="bg-glass rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{post.date}</p>
              <p className="mb-6">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-indigo-500 hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      ) : !loading && (
        <p className="text-center py-10">No blog posts found. Check back soon!</p>
      )}
    </div>
  );
}