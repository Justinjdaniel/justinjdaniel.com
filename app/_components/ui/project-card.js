import Link from "next/link";
import StackBadge from "./stack-badge";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        block
        rounded-lg border border-zinc-200 dark:border-zinc-700
        p-6 shadow-sm
        hover:shadow-lg
        hover:border-indigo-400
        transition
        duration-200
        ease-in-out
        bg-white dark:bg-zinc-900
        hover:bg-indigo-50 dark:hover:bg-zinc-800/60
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-indigo-400
      "
      aria-label={`View details for ${project.title}`}
    >
      <h3 className="text-xl font-sans mb-2">{project.title}</h3>
      <p className="mb-4 text-zinc-700 dark:text-zinc-300">
        {project.description}
      </p>
      <div className="mb-4">
        {project.stack.map((tech) => (
          <StackBadge key={tech} tech={tech} />
        ))}
      </div>
      {/* Optional: subtle call-to-action */}
      <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline inline-flex items-center gap-1">
        View Details →
      </span>
    </Link>
  );
}
