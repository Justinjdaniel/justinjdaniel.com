import BlogSchema from "@/_components/blog/blog-schema";
import BackButton from "@/_components/buttons/back-button";
import BackToTopButton from "@/_components/buttons/back-to-top";
import { CustomMDX } from "@/_components/mdx-components";
import ScrollProgress from "@/_components/ui/scroll-progress";
import { getBlogPosts } from "@/_db/blog";
import { formatDate } from "@/_utils/format-date";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const baseURL = "https://justinjdaniel.com";

export async function generateMetadata({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image ? `${baseURL}${image}` : `${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseURL}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="z-10 antialiased max-w-2xl m-4 mt-16 md:mx-auto px-2">
      <BackButton />
      <ScrollProgress />
      <BlogSchema post={post} baseURL={baseURL} />

      <article className="prose prose-zinc dark:prose-invert max-w-none w-full animate-in fade-in slide-in-from-bottom-2 duration-700 pb-8">
        <h1 className="text-3xl font-bold tracking-tight !mt-0 !mb-4 text-pretty">
          {post.metadata.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          <Suspense fallback={<div className="h-5" />}>
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt)}
            </time>
          </Suspense>
        </div>

        {post.metadata.image && (
          <Image
            alt={`${post.metadata.title} cover image`}
            src={post.metadata.image}
            width={1200}
            height={630}
            priority
            className="rounded-lg object-cover aspect-[2/1] mb-10"
          />
        )}

        <div className="[&>*:first-child]:!mt-0">
          <CustomMDX source={post.content} />
        </div>
      </article>

      <BackToTopButton />
    </section>
  );
}
