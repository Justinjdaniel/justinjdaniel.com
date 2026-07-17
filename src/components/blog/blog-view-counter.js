"use client";

import { useEffect, useState } from "react";
import { incrementBlogView } from "@/app/actions/blog-views";
import BookDoodleIcon from "@/components/icons/doodle-library-hand-drawn-vectors/book";

/**
 * Increment and display a blog post's view count.
 * @param {Object} props - The component props.
 * @param {string} props.slug - The blog post slug used to identify the post.
 * @return {JSX.Element|null} The formatted view count, or `null` while unavailable.
 */
export default function BlogViewCounter({ slug }) {
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    let active = true;

    async function incrementAndSetView() {
      try {
        const updatedCount = await incrementBlogView(slug);
        if (active && typeof updatedCount === "number") {
          setViewCount(updatedCount);
        }
      } catch (error) {
        console.error("Failed to increment/fetch view count:", error);
      }
    }

    incrementAndSetView();

    return () => {
      active = false;
    };
  }, [slug]);

  if (viewCount === null) {
    return null;
  }

  return (
    <span className="ml-4 animate-in fade-in duration-300" title="View count">
      <BookDoodleIcon className="w-6 h-6 mr-0.5 inline-block" />
      {viewCount.toLocaleString()} views
    </span>
  );
}
