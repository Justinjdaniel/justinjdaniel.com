import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
console.log(allBlogs);
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">read my blog</h1>

      {allBlogs.length === 0 && <p>No blogs yet.</p>}
      {allBlogs.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {/* {post.title} */}hi
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}