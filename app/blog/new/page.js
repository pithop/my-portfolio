'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/save-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Post saved successfully!');
        router.push('/blog');
      } else {
        setError(data.error || 'Failed to save post');
      }
    } catch (err) {
      setError('Failed to save post: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-padding py-12">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>

      {error && <div className="text-red-500 mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-lg">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            required
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-2 text-lg">Content (Plain Text)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 font-mono"
            required
            placeholder="Write your content..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            required
            placeholder="Enter password"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/blog')}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Draft'}
          </button>
        </div>
      </form>
    </div>
  );
}