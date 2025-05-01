"use client";

export default function BlogSchema({ post, baseURL }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: post.metadata.image
      ? `${baseURL}${post.metadata.image}`
      : `${baseURL}/og?title=${post.metadata.title}`,
    url: `${baseURL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Justin J Daniel",
    },
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(schema)}
    </script>
  );
}
