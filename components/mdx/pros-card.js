/**
 * ProsCard Component
 * @description This component is used to display a card with a list of pros for a specific technology or topic.
 * @param {string} title - The title of the card.
 * @param {Array<string>} pros - An array of strings representing the pros.
 * @returns {JSX.Element} The ProsCard component.
 * @example
 * <ProsCard title="React" pros={["Fast", "Flexible", "Popular"]} />
 * // Renders a card with the title "React" and a list of pros.
 */
export default function ProsCard({ title, pros = [] }) {
  return (
    <div
      className="
        p-6 my-4 rounded-xl
        bg-zinc-100 dark:bg-zinc-800
        border border-emerald-200/20 dark:border-emerald-800/20
        view-transition-name:[--pros-card]
      "
    >
      {title && (
        <h3 className="mb-4 text-zinc-700 dark:text-zinc-300">
          You might use {title} if...
        </h3>
      )}
      <div className="space-y-2">
        {pros.map((pro) => (
          <div
            key={`pro-${pro.substring(0, 20)}`}
            className="flex items-center gap-2"
          >
            <svg
              className="w-5 h-5 text-emerald-500"
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
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {pro}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
