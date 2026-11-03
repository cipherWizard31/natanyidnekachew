import Link from "next/link";
import SpotlightBackground from "@/components/SpotlightBackground";
import { Arrow } from "@/components/Arrow";
import { getPortfolioData } from "@/lib/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Natan Yidnekachew",
  description: "A complete archive of all things I've built, contributed to, and experimented with.",
};

function formatLinkText(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname.replace(/\/$/, "");
    if (!path || path === "") {
      return host;
    }
    // E.g. github.com/cipherWizard31/SongBookApp -> github.com/.../SongBookApp or host + path if short
    const full = `${host}${path}`;
    return full.length > 32 ? `${host}/...${path.slice(path.lastIndexOf("/"))}` : full;
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  }
}

export default function ArchivePage() {
  const data = getPortfolioData();
  const profileName = data.profile?.name || "Natan Yidnekachew";
  const projects = data.projects || [];

  return (
    <div className="relative min-h-screen">
      {/* Interactive spotlight cursor effect */}
      <SpotlightBackground />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-24">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-teal-300 px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 focus-visible:translate-x-0 focus-visible:text-slate-900 z-50 transition"
        >
          Skip to Content
        </a>

        {/* Back Link */}
        <Link
          href="/"
          className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300 text-sm hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
          {profileName}
        </Link>

        {/* Page Title */}
        <h1 id="content" className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          All Projects
        </h1>

        {/* Responsive Table */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur">
              <tr>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Project</th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                  Made at
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                  Built with
                </th>
                <th className="py-4 text-sm font-semibold text-slate-200">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300/10">
              {projects.map((project) => {
                const year = project.year || "2024";
                const madeAt = project.made_at || "Personal";
                const hasUrl = Boolean(project.url && project.url.trim() !== "");
                const linkText = hasUrl ? formatLinkText(project.url) : "";

                return (
                  <tr
                    key={project.id}
                    className="border-b border-slate-300/10 last:border-none transition hover:bg-slate-800/50"
                  >
                    {/* Year */}
                    <td className="py-4 pr-4 align-top text-sm font-mono text-slate-400">
                      {year}
                    </td>

                    {/* Project Name (with mobile-only made_at and built_with fallback) */}
                    <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                      <div>
                        <div className="block sm:hidden">
                          {hasUrl ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link"
                            >
                              <span>
                                {project.title}{" "}
                                <span className="inline-block">
                                  <Arrow external />
                                </span>
                              </span>
                            </a>
                          ) : (
                            <span>{project.title}</span>
                          )}
                        </div>
                        <div className="hidden sm:block">
                          {project.title}
                        </div>
                      </div>

                      {/* Mobile-only made_at & built-with tags */}
                      <div className="mt-1 block lg:hidden">
                        {madeAt && (
                          <div className="text-xs font-normal text-slate-400">
                            {madeAt}
                          </div>
                        )}
                        {project.skills && project.skills.length > 0 && (
                          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technologies used">
                            {project.skills.map((skill) => (
                              <li key={skill}>
                                <div className="flex items-center rounded-full bg-teal-400/10 px-2.5 py-0.5 text-xs font-medium leading-5 text-teal-300">
                                  {skill}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>

                    {/* Made At (Desktop) */}
                    <td className="hidden py-4 pr-4 align-top text-sm text-slate-400 lg:table-cell">
                      {madeAt}
                    </td>

                    {/* Built With (Desktop) */}
                    <td className="hidden py-4 pr-4 align-top lg:table-cell">
                      {project.skills && project.skills.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                          {project.skills.map((skill) => (
                            <li key={skill}>
                              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                {skill}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>

                    {/* Link */}
                    <td className="py-4 align-top text-sm">
                      {hasUrl ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 font-mono text-xs group/link"
                          aria-label={`${project.title} (opens in a new tab)`}
                        >
                          <span className="inline-block truncate max-w-[200px] sm:max-w-[260px]">
                            {linkText}{" "}
                            <span className="inline-block">
                              <Arrow external />
                            </span>
                          </span>
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
