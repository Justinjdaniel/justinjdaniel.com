import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/_components/buttons/back-button";
import BackToTopButton from "@/_components/buttons/back-to-top";
import DesktopIcon from "@/_components/icons/doodle-library-hand-drawn-vectors/desktop";
import DrawSVG from "@/_components/icons/draw-svg";
import ScrollProgress from "@/_components/ui/scroll-progress";
import StackBadge from "@/_components/ui/stack-badge";
import { projects } from "@/_data/projects";

function MediaGallery({ media }) {
  return (
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {media.map((item) =>
        item.type === "image" ? (
          <div
            key={item.src}
            className="relative group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 shadow hover:shadow-lg transition"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={224}
              className="w-full h-56 object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </div>
        ) : (
          <div
            key={item.src}
            className="relative group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 shadow hover:shadow-lg transition"
          >
            <video
              src={item.src}
              controls
              className="w-full h-56 object-cover transition-transform duration-200 group-hover:scale-105"
              aria-label={item.alt}
            >
              <track
                kind="captions"
                src={item.captions || null}
                srcLang="en"
                label="English captions"
                default
              />
            </video>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </div>
        ),
      )}
    </div>
  );
}

export default function ProjectInfoPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <section className="z-10 antialiased max-w-2xl m-4 mt-16 md:mx-auto">
      <BackButton />
      <ScrollProgress />
      <div className="relative z-10 antialiased max-w-3xl mx-auto my-20 p-6 px-8 bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6 ">
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="inline-block transition-transform group-hover:-rotate-12 group-hover:scale-110"
                />
                <span className="underline">GitHub</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <DrawSVG>
                  <DesktopIcon className="w-8 h-8 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                </DrawSVG>
                <span className="underline">Demo</span>
              </a>
            )}
          </div>
        </div>
        <h1 className="text-4xl font-bold font-sans tracking-tight mb-2 text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h1>
        <p className="mb-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {project.description}
        </p>
        <p className="mb-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {project.about}
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {project.stack.map((tech) => (
            <StackBadge
              key={tech}
              tech={tech}
              className="transition-transform duration-150 hover:scale-110 active:scale-95"
            />
          ))}
        </div>
        {/* Media Gallery */}
        {project.media?.length > 0 && <MediaGallery media={project.media} />}
        {/* Extra Info */}
        {(project.extra?.launched || project.extra?.role) && (
          <div className="flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
            {project.extra.launched && (
              <div className="flex items-center gap-2">
                {/* <FaCalendarAlt className="text-indigo-400" /> */}
                <span>
                  <span className="font-medium">Launched:</span>{" "}
                  {project.extra.launched}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <BackToTopButton />
    </section>
  );

  // return (
  //   <section className="relative z-10 antialiased max-w-3xl mx-auto mt-20 px-4 py-8 bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
  //     <ScrollProgress />
  //     <BackButton />

  //   </section>
  // );
}
