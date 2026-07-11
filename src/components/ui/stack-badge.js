export default function StackBadge({ tech }) {
  return (
    <span className="inline-block bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2">
      {tech}
    </span>
  );
}
