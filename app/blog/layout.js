import BlogHeader from '@/components/BlogHeader';

export default function BlogLayout({ children }) {
  return (
    <>
      <BlogHeader />
      {children}
    </>
  );
}