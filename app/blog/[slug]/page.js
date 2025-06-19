// app/blog/[slug]/page.js
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

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
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container-padding py-20 max-w-3xl mx-auto">
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{new Date(post.date).toLocaleDateString()}</p>
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