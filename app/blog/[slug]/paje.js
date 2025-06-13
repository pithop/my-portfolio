import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function PostPage({ params }) {
  const owner = 'pithop'; // Replace with your GitHub username
  const repo = 'my-portfolio-blog'; // Replace with your repository name
  const filePath = `posts/${params.slug}.md`;
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const file = await response.json();
  const contentResponse = await fetch(file.download_url);
  const content = await contentResponse.text();
  const { data, content: mdContent } = matter(content);

  const processedContent = await remark().use(html).process(mdContent);
  const contentHtml = processedContent.toString();

  return (
    <div className="container-padding py-20 max-w-3xl mx-auto">
      <article>
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{data.date}</p>
        <div
          className="prose dark:prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
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