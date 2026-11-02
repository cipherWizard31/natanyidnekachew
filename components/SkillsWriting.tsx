import type { SkillCategoryData, ArticleData } from "@/lib/portfolio";
import { Arrow } from "./Arrow";

interface SkillsWritingProps {
  skillCategories: SkillCategoryData[];
  articles: ArticleData[];
}

export default function SkillsWriting({
  skillCategories,
  articles,
}: SkillsWritingProps) {
  return (
    <section
      id="writing"
      aria-label="Writing and technical arsenal"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Writing &amp; Skills
        </h2>
      </div>

      {/* Writing list */}
      {articles && articles.length > 0 && (
        <div className="mb-14">
          <ul className="group/list">
            {articles.map((article) => (
              <li key={article.id} className="mb-10">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  {/* Spotlight background */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                  {/* Year header */}
                  <header
                    className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                    aria-label={article.year}
                  >
                    {article.year}
                  </header>

                  {/* Title & info */}
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium leading-snug text-slate-200">
                      <div>
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                          href={article.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${article.title} (opens in a new tab)`}
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                          <span>
                            {article.title}{" "}
                            <span className="inline-block">
                              <Arrow external />
                            </span>
                          </span>
                        </a>
                      </div>
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span>{article.publication}</span>
                      {article.read_time && (
                        <>
                          <span>·</span>
                          <span>{article.read_time}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technical Arsenal skills tags grouped by category */}
      {skillCategories && skillCategories.length > 0 && (
        <div className="pt-4 border-t border-slate-800/80">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-6">
            Technical Arsenal
          </h3>
          <div className="space-y-5">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="text-xs font-mono text-slate-400 block mb-2 font-medium">
                  {cat.title}
                </span>
                <ul className="flex flex-wrap" aria-label={`Skills in ${cat.title}`}>
                  {cat.skills.map((skill) => (
                    <li key={skill} className="mr-1.5 mt-2">
                      <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                        {skill}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
