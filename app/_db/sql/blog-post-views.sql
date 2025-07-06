-- Create table for blog post view counts
CREATE TABLE IF NOT EXISTS blog_post_views (
  slug TEXT PRIMARY KEY,
  view_count INTEGER NOT NULL DEFAULT 0
);
