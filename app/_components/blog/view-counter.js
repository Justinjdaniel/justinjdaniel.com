"use client";
import { useEffect, useState } from "react";

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const incrementAndFetch = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}/increment-view`, {
          method: "POST",
        });
        const data = await res.json();
        if (res.ok) {
          setViews(data.views);
        } else {
          setError(data.error || "Failed to fetch views");
        }
      } catch (_error) {
        setError("Network error");
      }
    };
    incrementAndFetch();
  }, [slug]);

  if (error) {
    return (
      <span className="text-xs text-red-500" title={error}>
        Views unavailable
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
      <svg
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block align-middle mr-1"
        aria-hidden="true"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
      {views === null
        ? <span>Loading...</span>
        : <span>{views.toLocaleString()} views</span>}
    </span>
  );
}
