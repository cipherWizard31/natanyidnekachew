import type { AboutData } from "@/lib/portfolio";

interface AboutProps {
  about: AboutData;
}

export default function About({ about }: AboutProps) {
  return (
    <section
      id="about"
      aria-label="About"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>

      <div className="space-y-4 leading-normal text-slate-400">
        {about.paragraph1 && <p>{about.paragraph1}</p>}
        {about.paragraph2 && <p>{about.paragraph2}</p>}
        {about.paragraph3 && <p>{about.paragraph3}</p>}
      </div>

      {/* Engineering Impact / Telemetry Pill Bar */}
      {(about.stat_experience || about.stat_projects || about.stat_uptime || about.stat_users || about.target_qps || about.consensus || about.p99_latency) && (
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="font-mono text-xs uppercase text-slate-500">{about.stat_experience_label || "Experience"}</div>
            <div className="font-medium text-slate-200 mt-1">{about.stat_experience || "6+ Yrs"}</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase text-slate-500">{about.stat_apps_label || "Apps Built"}</div>
            <div className="font-medium text-teal-300 mt-1">{about.stat_projects || about.target_qps || "12+"}</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase text-slate-500">{about.stat_tech_label || "Tech"}</div>
            <div className="font-medium text-slate-200 mt-1">{about.stat_users || about.consensus || "50K+"}</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase text-slate-500">{about.stat_users_label || "Total Users"}</div>
            <div className="font-medium text-teal-300 mt-1">{about.stat_uptime || about.p99_latency || "99.99%"}</div>
          </div>
        </div>
      )}
    </section>
  );
}
