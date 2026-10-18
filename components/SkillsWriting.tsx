interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Core Languages",
    skills: ["Go", "Rust", "Python", "C", "SQL", "Bash"],
  },
  {
    title: "Storage & Data Systems",
    skills: [
      "PostgreSQL",
      "Redis",
      "Apache Kafka",
      "ScyllaDB / Cassandra",
      "MongoDB",
      "ClickHouse",
    ],
  },
  {
    title: "Cloud & Low-Level Infra",
    skills: [
      "Docker",
      "Kubernetes",
      "Linux (eBPF, systemd)",
      "Terraform",
      "AWS",
      "CI/CD Telemetry",
    ],
  },
  {
    title: "System Architecture",
    skills: [
      "Distributed Systems",
      "Concurrency Patterns",
      "Microservices",
      "Event-Driven",
      "gRPC / Protobuf",
    ],
  },
];

interface Article {
  year: string;
  title: string;
  publication: string;
  url: string;
  readTime: string;
}

const articles: Article[] = [
  {
    year: "2024",
    title: "Demystifying Raft Consensus: Building a Replicated State Machine in Rust",
    publication: "Systems Engineering Digest",
    url: "https://cipherwizard.substack.com",
    readTime: "8 min read",
  },
  {
    year: "2024",
    title: "Zero-Copy Socket Buffers and Kernel-Bypass Networking with eBPF",
    publication: "Substack / Distributed Musings",
    url: "https://cipherwizard.substack.com",
    readTime: "6 min read",
  },
  {
    year: "2023",
    title: "Why Mechanical Sympathy Still Dictates P99 Latency at Scale",
    publication: "Backend Weekly",
    url: "https://cipherwizard.substack.com",
    readTime: "11 min read",
  },
];

export default function SkillsWriting() {
  return (
    <section
      id="writing"
      aria-label="Skills and Technical Writing"
      className="mb-16 md:mb-24 scroll-mt-16 lg:scroll-mt-24"
    >
      {/* Mobile Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md bg-[#0b1326]/80 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none lg:bg-transparent">
        <h2 className="text-sm uppercase tracking-widest text-[#e2e8f0] font-bold lg:sr-only flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block"></span>
          Skills &amp; Writing
        </h2>
      </div>

      <div className="mt-4 lg:mt-0 space-y-6">
        {/* Technical Arsenal Card */}
        <div className="p-6 rounded-xl bg-[#171f33]/30 border border-[#2d3449]/40 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-[#e2e8f0] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5eead4] text-[20px]">
              terminal
            </span>
            <span>Technical Arsenal</span>
          </h3>

          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#94a3b8] block mb-2">
                  {category.title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isArchitecture = category.title === "System Architecture";
                    return (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full font-mono text-xs transition-colors ${
                          isArchitecture
                            ? "bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/25 font-medium"
                            : "bg-[#222a3d] text-[#e2e8f0] border border-[#2d3449]/70 hover:border-[#5eead4]/40"
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Technical Writing */}
        <div className="p-6 rounded-xl bg-[#171f33]/30 border border-[#2d3449]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#e2e8f0] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5eead4] text-[20px]">
                article
              </span>
              <span>Technical Writing &amp; Publications</span>
            </h3>
            <span className="font-mono text-xs text-[#94a3b8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4]"></span>
              Substack
            </span>
          </div>

          <div className="space-y-3">
            {articles.map((art, idx) => (
              <a
                key={idx}
                href={art.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block p-3.5 rounded-lg bg-[#131b2e]/60 hover:bg-[#171f33] border border-[#2d3449]/40 hover:border-[#5eead4]/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-[#e2e8f0] group-hover:text-[#5eead4] transition-colors flex items-center gap-1">
                      <span>{art.title}</span>
                      <span className="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#94a3b8] group-hover:text-[#5eead4]">
                        arrow_outward
                      </span>
                    </h4>
                    <p className="font-mono text-xs text-[#94a3b8] mt-1 flex items-center gap-2">
                      <span>{art.publication}</span>
                      <span className="w-1 h-1 rounded-full bg-[#94a3b8]/50"></span>
                      <span>{art.readTime}</span>
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#94a3b8] shrink-0">
                    {art.year}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="https://cipherwizard.substack.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-[#e2e8f0] hover:text-[#5eead4] transition-colors duration-200 group"
            >
              <span>Read on Substack</span>
              <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform duration-200">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
