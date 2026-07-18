import BackButton from "@/components/buttons/back-button";
import ScrollReveal from "@/components/effects/scroll-reveal";
import LightBulbIcon from "@/components/icons/doodle-library-hand-drawn-vectors/light-bulb";
import ProjectCard from "@/components/ui/project-card";
import { getProjects } from "@/lib/data/get-projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <section className="z-10 antialiased max-w-2xl m-4 mt-16 md:mx-auto">
      <BackButton />
      <div className="flex items-center mb-6">
        <LightBulbIcon className="w-14 h-14 md:w-14 md:h-14 text-zinc-900 dark:text-zinc-100" />
        <h2 className="text-4xl md:text-4xl font-sans text-zinc-900 dark:text-zinc-100">
          Projects
        </h2>
      </div>

      <ScrollReveal className="grid gap-8" staggerDelay={120}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ScrollReveal>
    </section>
  );
}
