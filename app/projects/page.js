import BackButton from "@/_components/buttons/back-button";
import LightBulbIcon from "@/_components/icons/doodle-library-hand-drawn-vectors/light-bulb";
import ProjectCard from "@/_components/ui/project-card";
import { projects } from "@/_data/projects";

export default function ProjectsPage() {
  return (
    <section className="z-10 antialiased max-w-2xl m-4 mt-16 md:mx-auto">
      <BackButton />
      <div className="flex items-center mb-6">
        <LightBulbIcon className="w-14 h-14 md:w-14 md:h-14 text-zinc-900 dark:text-zinc-100" />
        <h2 className="text-4xl md:text-4xl font-sans text-zinc-900 dark:text-zinc-100">
          Projects
        </h2>
      </div>

      <div className="grid gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
