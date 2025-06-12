import matter from 'gray-matter';
import Link from 'next/link';

export default async function BlogPage() {
  const owner = 'pithop'; // Replace with your GitHub username
  const repo = 'my-portfolio-blog'; // Replace with your repository name
  const path = 'posts';
  const token = process.env.GITHUB_TOKEN;

  try {
    if (!token) {
      throw new Error('GITHUB_TOKEN is not set');
    }
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const files = await response.json();

    const posts = await Promise.all(
      files.map(async (file) => {
        if (file.type === 'dir') return null;
        const contentResponse = await fetch(file.download_url);
        if (!contentResponse.ok) {
          console.error(`Failed to fetch content for ${file.name}`);
          return null;
        }
        const content = await contentResponse.text();
        const { data } = matter(content);
        return {
          slug: file.name.replace('.md', ''),
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
        };
      })
    );

    const filteredPosts = posts.filter((post) => post !== null);

    return (
      <div className="container-padding py-20">
        <h1 className="text-4xl font-bold mb-12">My Blog</h1>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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
        ) : (
          <p>No blog posts yet. Check back soon!</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return <div>Failed to load blog posts. Please try again later.</div>;
  }
}