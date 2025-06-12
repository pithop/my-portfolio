import Providers from '@/components/Providers';
import BlogHeader from '@/components/BlogHeader';

export default function BlogLayout({ children }) {
  return (
    <Providers>
      <BlogHeader />
      {children}
    </Providers>
  );
}