import Image from "next/image";
import type { ProjectData } from "@/lib/portfolio";
import { Arrow } from "./Arrow";

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-label="What I've Built"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          What I&apos;ve Built
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {projects.map((project) => (
            <li key={project.id} className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                {/* Spotlight background on hover */}
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                {/* Right / Main Info Column */}
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    <a
                      className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} (opens in a new tab)`}
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      <span>
                        {project.title}{" "}
                        <span className="inline-block">
                          <Arrow external />
                        </span>
                      </span>
                    </a>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-slate-400">
                    {project.description}
                  </p>

                  {/* Stars / Forks metrics if available */}
                  {(project.stars || project.forks) && (
                    <div className="mt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
                      {project.stars && (
                        <span className="inline-flex items-center gap-1 hover:text-slate-200">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3.5 h-3.5 text-slate-400"
                            aria-hidden="true"
                          >
                            <path d="M12 .7 15.46 7.7l7.73 1.12-5.6 5.46 1.33 7.7L12 18.35l-6.92 3.63 1.32-7.7L.8 8.82 8.54 7.7z" />
                          </svg>
                          <span>{project.stars}</span>
                        </span>
                      )}
                      {project.forks && (
                        <span className="inline-flex items-center gap-1 hover:text-slate-200">
                          <svg
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-3.5 h-3.5 text-slate-400"
                            aria-hidden="true"
                          >
                            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h4.5A2.25 2.25 0 0012.5 6.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm6.5-2.122a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8 10.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v1.628a.75.75 0 001.5 0v-1.628z" />
                          </svg>
                          <span>{project.forks}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tech stack tags */}
                  {project.skills && project.skills.length > 0 && (
                    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                      {project.skills.map((skill) => (
                        <li key={skill} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            {skill}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Left Thumbnail Column */}
                {project.image_url && (
                  <div className="z-10 sm:order-1 sm:col-span-2 sm:translate-y-1">
                    <Image
                      alt={project.image_alt || project.title}
                      loading="lazy"
                      width={200}
                      height={48}
                      src={project.image_url}
                      className="aspect-video w-full object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* View Full Project Archive Link */}
        <div className="mt-12">
          <a
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold group/link text-base"
            href="https://github.com/cipherWizard31"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View Full Project Archive (opens in a new tab)"
          >
            <span>
              View Full Project{" "}
              <span className="inline-block">
                Archive
                <Arrow external />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
