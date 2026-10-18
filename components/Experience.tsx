interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  tagline: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "2024 — PRESENT",
    role: "Founding Backend Engineer",
    company: "ApexStream",
    companyUrl: "https://github.com/cipherWizard31",
    tagline: "Distributed Event Streaming Engine",
    description:
      "Spearheaded the core asynchronous messaging engine handling 450k+ events/sec with sub-millisecond p99 latency across distributed clusters. Implemented custom zero-copy binary serialization in Go and integrated Raft consensus for fault-tolerant state machine replication, ensuring zero data loss during simulated cluster splits.",
    skills: ["Go", "Raft", "gRPC", "Redis", "eBPF", "Kubernetes", "Prometheus"],
  },
  {
    period: "2023 — 2024",
    role: "Backend & Systems Contributor",
    company: "OpenCompute & HyperKV",
    companyUrl: "https://github.com/cipherWizard31",
    tagline: "High Performance Storage Systems",
    description:
      "Designed an LSM-tree storage engine in Rust featuring an append-only write-ahead log (WAL) and concurrent tiered memtable compaction algorithms. Authored a high-precision benchmark suite using Criterion.rs demonstrating a 3.2x write throughput improvement over conventional B-tree implementations under extreme load.",
    skills: ["Rust", "LSM-Tree", "RocksDB", "Linux Internals", "Criterion.rs"],
  },
  {
    period: "2022 — 2023",
    role: "Junior Infrastructure Intern",
    company: "CloudForge Labs",
    companyUrl: "https://github.com/cipherWizard31",
    tagline: "Cloud Reliability & Automation",
    description:
      "Automated CI/CD telemetry pipelines across staging environments, safely migrated production PostgreSQL schemas with zero downtime using pg_repack, and engineered distributed rate limiting microservices leveraging the token bucket algorithm in Redis cluster shards.",
    skills: ["Python", "PostgreSQL", "Redis", "Docker", "Terraform", "GitHub Actions"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="mb-16 md:mb-24 scroll-mt-16 lg:scroll-mt-24"
    >
      {/* Mobile Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md bg-[#0b1326]/80 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none lg:bg-transparent">
        <h2 className="text-sm uppercase tracking-widest text-[#e2e8f0] font-bold lg:sr-only flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block"></span>
          Experience
        </h2>
      </div>

      <div className="mt-4 lg:mt-0 flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group relative rounded-xl p-6 bg-[#171f33]/30 hover:bg-[#171f33]/80 border border-[#2d3449]/40 hover:border-[#5eead4]/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="flex flex-col sm:flex-row sm:gap-6">
              {/* Timeline Header */}
              <header className="sm:w-1/4 mb-1 sm:mb-0 shrink-0">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-medium">
                  {exp.period}
                </span>
              </header>

              {/* Content */}
              <div className="sm:w-3/4">
                <h3 className="text-lg font-semibold text-[#e2e8f0] flex items-center gap-1 group-hover:text-[#5eead4] transition-colors duration-200">
                  <span>
                    {exp.role} · {exp.company}
                  </span>
                  <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 text-[#94a3b8] group-hover:text-[#5eead4]">
                    arrow_outward
                  </span>
                </h3>

                <p className="font-mono text-xs text-[#94a3b8] mt-0.5">
                  {exp.tagline}
                </p>

                <p className="mt-3 text-sm text-[#bbcac5] leading-relaxed">
                  {exp.description}
                </p>

                {/* Tech Pills */}
                <ul
                  aria-label="Technologies used"
                  className="mt-4 flex flex-wrap gap-1.5"
                >
                  {exp.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1 rounded-full bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/20 font-mono text-xs font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Résumé / CV Link */}
      <div className="mt-8">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#e2e8f0] hover:text-[#5eead4] transition-colors duration-200 group"
        >
          <span className="font-medium">View Full Résumé / CV</span>
          <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform duration-200">
            arrow_forward
          </span>
        </a>
      </div>
    </section>
  );
}
