// app/blog/[slug]/page.js
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Idriss Chahraoui's Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: ['/og.jpg'], // You can dynamically generate these too!
    },
  };
}
// Helper function to fetch a single post
async function getPost(slug) {
  const owner = 'pithop';
  const repo = 'my-portfolio-blog';
  const path = `posts/${slug}.md`;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
          'User-Agent': 'request'
        },
        next: {
          revalidate: 60, // Revalidate cache every 60 seconds
        }
      }
    );

    if (!response.ok) {
      return null; // Post not found
    }

    const file = await response.json();
    const contentResponse = await fetch(file.download_url);
    const content = await contentResponse.text();
    const { data, content: mdContent } = matter(content);

    const processedContent = await remark().use(html).process(mdContent);
    const contentHtml = processedContent.toString();

    return { ...data, contentHtml };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-padding py-32 max-w-3xl mx-auto">
      <article className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <span className="mx-3">•</span>
          <span>By Idriss Chahraoui</span>
        </div>
        <div
          className="prose dark:prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <div className="mt-16 text-center">
        <Link href="/blog" className="inline-flex items-center text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
          <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}