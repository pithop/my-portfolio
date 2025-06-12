import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { title, content, password } = await req.json();

    // Verify password
    if (password !== process.env.BLOG_PASSWORD) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    // Generate slug and metadata
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const date = new Date().toISOString().split('T')[0];
    const excerpt = content.substring(0, 100);

    // Construct markdown content
    const markdownContent = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
---

${content}
`;

    // GitHub API details
    const owner = 'pithop';
    const repo = 'my-portfolio-blog';
    const path = `posts/${slug}.md`;
    const token = process.env.GITHUB_TOKEN;

    // Check if GITHUB_TOKEN is set
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is not set' }, { status: 500 });
    }

    // Encode markdown content to base64
    const base64Content = Buffer.from(markdownContent, 'utf8').toString('base64');

    // GitHub API URL
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // Create new file in GitHub
    const response = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add new post: ${title}`,
        content: base64Content,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Post saved successfully' });
    } else {
      const errorData = await response.text();
      return NextResponse.json({ error: `Failed to save post: ${errorData}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in save-post route:', error);
    return NextResponse.json({ error: `Failed to save post: ${error.message}` }, { status: 500 });
  }
}
