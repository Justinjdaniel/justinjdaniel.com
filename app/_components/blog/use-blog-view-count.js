"use client";
import { useEffect, useState } from "react";

export function useBlogViewCount(slug) {
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    if (!slug) return;
    // Increment and fetch view count
    fetch("/api/blog-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data) => setViewCount(data.viewCount ?? null));
  }, [slug]);

  return viewCount;
}
