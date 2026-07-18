"use client";

import { useEffect, useState } from "react";
import { incrementBlogView } from "@/app/actions/blog-views";
import BookDoodleIcon from "@/components/icons/doodle-library-hand-drawn-vectors/book";

// Module-level cache to keep a stable visit identifier per slug across component re-renders/StrictMode mounts
const clientVisitIds = new Map();

function getOrCreateVisitId(slug) {
  if (!clientVisitIds.has(slug)) {
    clientVisitIds.set(slug, Math.random().toString(36).substring(2, 15));
  }
  return clientVisitIds.get(slug);
}

export default function BlogViewCounter({ slug }) {
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    let active = true;
    // Clear the previous view count immediately on slug changes
    setViewCount(null);

    const visitId = getOrCreateVisitId(slug);

    async function incrementAndSetView() {
      try {
        const updatedCount = await incrementBlogView(slug, visitId);
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
