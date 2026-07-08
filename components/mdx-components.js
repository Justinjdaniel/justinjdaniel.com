// "use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import Alert from "./mdx/alert";
import Callout from "./mdx/callout";
import Code from "./mdx/code";
import ConsCard from "./mdx/cons-card";
import CustomLink from "./mdx/custom-link";
import CustomList from "./mdx/custom-list";
import ProsCard from "./mdx/pros-card";
import RoundedImage from "./mdx/rounded-image";
import YouTube from "./mdx/youtube";

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function createHeading(level) {
  return ({ children }) => {
    const slug = slugify(children);
    const Tag = `h${level}`;

    return (
      <Tag
        id={slug}
        className="group relative scroll-mt-20 [&:hover_.anchor-link]:opacity-100"
        style={{ viewTransitionName: `heading-${slug}` }}
      >
        <a
          href={`#${slug}`}
          className="
            anchor-link absolute -left-5 top-1 opacity-0
            text-zinc-500 dark:text-zinc-400
            transition-opacity duration-200
            hover:text-zinc-700 dark:hover:text-zinc-300
            [&>svg]:h-4 [&>svg]:w-4
          "
          aria-label={`Link to section: ${children}`}
        >
          #
        </a>
        {children}
      </Tag>
    );
  };
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  Alert,
  YouTube,
  // CustomButton,
  code: Code,
  ul: ({ children }) => <CustomList ordered={false}>{children}</CustomList>,
  ol: ({ children }) => <CustomList ordered={true}>{children}</CustomList>,
  strong: ({ children }) => (
    <strong className="font-bold text-zinc-900 dark:text-zinc-100">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-zinc-800 dark:text-zinc-200">{children}</em>
  ),
  del: ({ children }) => (
    <del className="line-through text-zinc-600 dark:text-zinc-400">
      {children}
    </del>
  ),
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
  blockquote: ({ children }) => (
    <blockquote className="pl-4 my-4 border-l-4 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 italic">
      {children}
    </blockquote>
  ),
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{
        ...components,
        ...(props.components || {}),
      }}
    />
  );
}
