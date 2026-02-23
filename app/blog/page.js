// app/blog/page.js
import Link from 'next/link';
import matter from 'gray-matter';

// Helper function to fetch posts from your GitHub repo
async function getPosts() {
  const owner = 'pithop';
  const repo = 'my-portfolio-blog';
  const path = 'posts';
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'request',
    };
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers,
        next: {
          revalidate: 60, // Revalidate cache every 60 seconds
        }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch posts list: ${response.status} ${response.statusText}`);
      return []; // Return empty array to gracefully handle missing/invalid credentials
    }

    const files = await response.json();

    if (!Array.isArray(files)) {
      console.error("Expected an array of files, but got:", files);
      return [];
    }

    const postsData = await Promise.all(
      files
        .filter(file => file.name.endsWith('.md'))
        .map(async (file) => {
          const contentResponse = await fetch(file.download_url);
          const content = await contentResponse.text();
          const { data } = matter(content);
          return {
            slug: file.name.replace('.md', ''),
            title: data.title || 'Untitled Post',
            date: data.date || 'No Date',
            excerpt: data.excerpt || '',
          };
        })
    );

    // Sort posts by date, most recent first
    return postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (err) {
    console.error('Error in getPosts:', err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container-padding py-20">
      <h1 className="text-4xl font-bold mb-12">My Blog</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="bg-glass rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{new Date(post.date).toLocaleDateString()}</p>
              <p className="mb-6">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-indigo-500 hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-10">No blog posts found or failed to load. Check back soon!</p>
      )}
    </div>
  );
}