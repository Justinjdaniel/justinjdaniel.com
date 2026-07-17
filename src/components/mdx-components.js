// MARK: - Imports
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Alert from "./mdx/alert";
import Callout from "./mdx/callout";
import ConsCard from "./mdx/cons-card";
import CustomLink from "./mdx/custom-link";
import CustomList from "./mdx/custom-list";
import ProsCard from "./mdx/pros-card";
import RoundedImage from "./mdx/rounded-image";
import YouTube from "./mdx/youtube";

// MARK: - Helper Functions

/**
 * Traverses React tree children to flatten and extract pure text content.
 * Supports stringifying numeric and bigint values and explicit property-presence checks.
 *
 * @param {import("react").ReactNode} children - Component children nodes.
 * @returns {string} Flattened text string.
 */
function getTextContent(children) {
  if (typeof children === "string") return children;
  if (typeof children === "number" || typeof children === "bigint")
    return children.toString();
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (
    children &&
    typeof children === "object" &&
    children.props &&
    "children" in children.props
  ) {
    return getTextContent(children.props.children);
  }
  return "";
}

/**
 * Standard slugification method for safe element IDs and URL references.
 *
 * @param {string} str - Raw input string.
 * @returns {string} Slugified lower-cased result.
 */
function slugify(str) {
  const slug = str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
  return slug || "heading";
}

// Track duplicate slugs per document/render dynamically.
// We use a global registry that we can reset or clean up,
// or track duplicates per render sequence. Since Next.js rendering
// is synchronous per request/page render, we reset it or map it.
let slugRegistry = {};

/**
 * Resets the slug registry.
 */
export function resetSlugRegistry() {
  slugRegistry = {};
}

/**
 * Generates a unique slug for a heading text.
 *
 * @param {string} textContent - Heading raw content.
 * @returns {string} Unique slug within document sequence.
 */
function generateUniqueSlug(textContent) {
  const baseSlug = slugify(textContent);
  if (!slugRegistry[baseSlug]) {
    slugRegistry[baseSlug] = 1;
    return baseSlug;
  }
  const suffix = slugRegistry[baseSlug];
  slugRegistry[baseSlug] += 1;
  return `${baseSlug}-${suffix}`;
}

/**
 * Dynamic React wrapper function generator for markdown headings with anchor links.
 *
 * @param {number} level - Heading scale depth (e.g., 1-6).
 * @returns {import("react").FC} Render-ready React component.
 */
function createHeading(level) {
  return ({ children, id }) => {
    const textContent = getTextContent(children);
    // Preserve explicit heading IDs when provided, otherwise generate a unique one.
    const slug = id || generateUniqueSlug(textContent);
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
            focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded
            [&>svg]:h-4 [&>svg]:w-4
          "
          aria-label={`Link to section: ${textContent}`}
        >
          #
        </a>
        {children}
      </Tag>
    );
  };
}

// MARK: - Config & Constants
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

const options = {
  theme: "one-dark-pro",
  keepBackground: true,
};

// MARK: - Render

/**
 * CustomMDX wraps next-mdx-remote and formats custom elements, images, lists, and highlighting.
 *
 * @component
 * @param {Object} props - MDX properties.
 * @param {string} props.source - Unrendered MDX raw payload.
 * @param {Object} [props.components] - Inline react components list.
 * @returns {import("react").JSX.Element}
 */
export function CustomMDX(props) {
  // Reset the slug registry at the beginning of rendering CustomMDX
  resetSlugRegistry();

  return (
    <MDXRemote
      {...props}
      components={{
        ...components,
        ...(props.components || {}),
      }}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, options]],
        },
      }}
    />
  );
}
