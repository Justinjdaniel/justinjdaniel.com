// MARK: - Imports
import React from "react";

// MARK: - Config & Constants
const checkIcon = (
  <svg
    className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
    title="Checkmark icon"
  >
    <path
      d="M22 11.08V12a10 10 0 11-5.93-9.14"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4L12 14.01l-3-3"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// MARK: - Helper Functions

/**
 * Injects a React icon element recursively into a list structure.
 *
 * @param {import("react").ReactNode} children - Component nested child nodes.
 * @param {import("react").ReactNode} icon - SVG/HTML icon payload to display on items.
 * @returns {import("react").ReactNode} Modified virtual DOM node structure.
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
 * ProsCard Component - displays a summary list of positive features or topics.
 *
 * @component
 * @param {Object} props - Component property arguments.
 * @param {string} [props.title] - Name of subject/technology.
 * @param {Array<string>} [props.pros=[]] - List items.
 * @param {import("react").ReactNode} [props.children] - Children list fallback.
 * @returns {import("react").JSX.Element}
 */
export default function ProsCard({ title, pros = [], children }) {
  return (
    <div
      className="
        p-6 my-4 rounded-xl
        bg-zinc-100 dark:bg-zinc-800
        border border-emerald-200/20 dark:border-emerald-800/20
      "
    >
      {title && (
        <h3 className="mb-4 text-zinc-700 dark:text-zinc-300">
          You might use {title} if...
        </h3>
      )}
      {pros && pros.length > 0 ? (
        <div className="space-y-2">
          {pros.map((pro) => (
            <div
              key={`pro-${pro.substring(0, 20)}`}
              className="flex items-start gap-2"
            >
              {checkIcon}
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {pro}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">{injectIcon(children, checkIcon)}</div>
      )}
    </div>
  );
}
