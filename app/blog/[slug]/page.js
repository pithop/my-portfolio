// app/blog/[slug]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const owner = 'pithop';
        const repo = 'my-portfolio-blog';
        const filePath = `posts/${slug}.md`;
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
          {
            headers: token ? { Authorization: `token ${token}` } : {}
          }
        );
        
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const file = await response.json();
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();
        const { data, content: mdContent } = matter(content);

        const processedContent = await remark().use(html).process(mdContent);
        const contentHtml = processedContent.toString();

        setPost({ ...data, contentHtml });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="container-padding py-20 text-center">Loading...</div>;
  if (error) return <div className="container-padding py-20 text-center">Error: {error}</div>;
  if (!post) return <div className="container-padding py-20 text-center">Post not found</div>;

  return (
    <div className="container-padding py-20 max-w-3xl mx-auto">
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{post.date}</p>
        <div
          className="prose dark:prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <div className="mt-12 text-center">
        <Link href="/blog" className="text-indigo-500 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}