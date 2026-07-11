const typeStyles = {
  info: "border-blue-400 bg-blue-50 dark:bg-blue-950/40 dark:border-blue-700",
  success:
    "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-700",
  warning:
    "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 dark:border-yellow-700",
  danger: "border-red-400 bg-red-50 dark:bg-red-950/40 dark:border-red-700",
};

/**
 * Callout component
 * @description A visually distinctive callout box with emoji, accent bar, and type-based color.
 * @param {string} emoji - The emoji to display in the callout box.
 * @param {ReactNode} children - The content to display inside the callout box.
 * @param {'info'|'success'|'warning'|'danger'} type - The style of the callout.
 * @returns {JSX.Element}
 * @example
 * <Callout type="info">This is an info callout.</Callout>
 */
export default function Callout({ emoji = "💡", type = "info", children }) {
  return (
    <div
      className={`
        relative flex items-center gap-4 p-5 my-6 rounded-lg shadow-sm
        border-l-4 ${typeStyles[type] ?? typeStyles.info}
        transition-all duration-200 ease-in-out
        animate-in slide-in-from-bottom-2
      `}
      role="note"
    >
      <span
        className="flex-shrink-0 text-2xl select-none leading-none"
        aria-label="callout icon"
        role="img"
        style={{ verticalAlign: "middle" }} // helps with vertical alignment
      >
        {emoji}
      </span>
      <div className="font-semibold flex-1 text-sm text-zinc-800 dark:text-zinc-300 [&>:first-child]:mt-0 [&>:first-child]:mb-0 leading-tight">
        {children}
      </div>
    </div>
  );
}
