import type { ExperienceData } from "@/lib/portfolio";
import { Arrow } from "./Arrow";

interface ExperienceProps {
  experiences: ExperienceData[];
  resumeUrl: string;
}

export default function Experience({ experiences, resumeUrl }: ExperienceProps) {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Experience
        </h2>
      </div>

      <div>
        <ol className="group/list">
          {experiences.map((exp) => (
            <li key={exp.id} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                {/* Hover spotlight card backdrop */}
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                {/* Period / Timeline Date */}
                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                  aria-label={exp.period}
                >
                  {exp.period}
                </header>

                {/* Content */}
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                      <a
                        className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                        href={exp.company_url || "#"}
                        target={exp.company_url ? "_blank" : undefined}
                        rel={exp.company_url ? "noreferrer noopener" : undefined}
                        aria-label={`${exp.role} at ${exp.company} (opens in a new tab)`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                        <span>
                          {exp.role} ·{" "}
                          <span className="inline-block">
                            {exp.company}
                            {exp.company_url && <Arrow external />}
                          </span>
                        </span>
                      </a>
                    </div>
                  </h3>

                  {exp.tagline && (
                    <div className="text-xs font-mono text-slate-500 mt-1" aria-hidden="true">
                      {exp.tagline}
                    </div>
                  )}

                  <p className="mt-2 text-sm leading-normal text-slate-400">
                    {exp.description}
                  </p>

                  {/* Skills / Technology Pills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                      {exp.skills.map((skill) => (
                        <li key={skill} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            {skill}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* View Full Résumé Link */}
        <div className="mt-12">
          <a
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold group/link text-base"
            href={resumeUrl || "/resume.pdf"}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View Full Résumé (opens in a new tab)"
          >
            <span>
              View Full{" "}
              <span className="inline-block">
                Résumé
                <Arrow external />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
