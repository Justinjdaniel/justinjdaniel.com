// MARK: - Imports
import React from "react";

// MARK: - Config & Constants
const xIcon = (
  <svg
    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
    viewBox="0 0 20 20"
    aria-hidden="true"
    role="img"
    title="X mark icon"
  >
    <path
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      fill="currentColor"
    />
  </svg>
);

// MARK: - Helper Functions

/**
 * Adds an icon to list items and applies list styling throughout nested React children.
 *
 * @param {import("react").ReactNode} children - React children containing the list structure to decorate.
 * @param {import("react").ReactNode} icon - Icon to display before each list item.
 * @return {import("react").ReactNode} The decorated React children.
 */
function injectIcon(children, icon) {
  return React.Children.map(children, (child) => {
    if (!child || !React.isValidElement(child)) return child;

    if (child.type === "ul") {
      return React.cloneElement(child, {
        className: `${child.props.className || ""} list-none pl-0 space-y-2`,
        children: injectIcon(child.props.children, icon),
      });
    }

    if (child.type === "li") {
      return (
        <li
          {...child.props}
          className={`${child.props.className || ""} flex items-start gap-2 text-zinc-700 dark:text-zinc-300 font-medium`}
        >
          {icon}
          <span className="flex-1">{child.props.children}</span>
        </li>
      );
    }

    if (child.props?.children) {
      return React.cloneElement(child, {
        children: injectIcon(child.props.children, icon),
      });
    }

    return child;
  });
}

// MARK: - Render

/**
 * Renders a card containing caveats or a fallback list of child content.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Subject or technology name displayed in the heading.
 * @param {Array<string>} [props.cons=[]] - Caveat descriptions to display.
 * @param {import("react").ReactNode} [props.children] - Fallback content whose list items are decorated with the X icon.
 * @returns {import("react").JSX.Element} The rendered caveat card.
 */
export default function ConsCard({ title, cons = [], children }) {
  return (
    <div
      className="
        p-6 my-4 rounded-xl
        bg-zinc-100 dark:bg-zinc-800
        border border-red-200/20 dark:border-red-900/20
      "
    >
      {title && (
        <h3 className="mb-4 text-zinc-700 dark:text-zinc-300">
          You might not use {title} if...
        </h3>
      )}
      {cons && cons.length > 0 ? (
        <div className="space-y-2">
          {cons.map((con) => (
            <div key={`con-${con}`} className="flex items-start gap-2">
              {xIcon}
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {con}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">{injectIcon(children, xIcon)}</div>
      )}
    </div>
  );
}
