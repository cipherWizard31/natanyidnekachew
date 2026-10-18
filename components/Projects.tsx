import Image from "next/image";

interface ProjectItem {
  title: string;
  url: string;
  description: string;
  stars: string;
  forks: string;
  skills: string[];
  image: string;
  imageAlt: string;
}

const projects: ProjectItem[] = [
  {
    title: "Kaspian: Distributed In-Memory Cache",
    url: "https://github.com/cipherWizard31",
    description:
      "Distributed, horizontally partitioned caching engine with consistent ring hashing, LRU eviction, and partial RESP3 wire protocol compatibility. Handles over 1.2M QPS across a 5-node cluster with auto-rebalancing upon node failovers and thread-safe lock striping.",
    stars: "840+",
    forks: "92",
    skills: ["Go", "Distributed Hashing", "RESP", "Netpoll", "Docker"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWUOAIkLX1dQpePIL5yeXPwY7cvpLlEQUNbSc3gz5N70wH2HuAbEBpQOoWx__lHP_We3YiqhPsS28r0wC9nUSD_2wgII2nvVLrmju9pIz0GsA1EZfJGC9oUmUBy0ZHnKB7TCEiiywd8u4s8GctTq3X-hVSofUErNEgBrIIu0sOMrd2GFZRgTn0gkXs5lNPHa6yr9i00kLLqCaai_cOFpoCWqod4_Ybuz-PCEwSqY9ONsN6Gr9DTnfTvg",
    imageAlt: "Distributed in-memory cache architecture topology",
  },
  {
    title: "RaftStore: Fault-Tolerant Consensus Engine",
    url: "https://github.com/cipherWizard31",
    description:
      "An educational yet battle-hardened implementation of the Raft distributed consensus protocol in Rust. Features asynchronous leader election terms, append-only log replication, automated snapshotting, and a rigorous Jepsen-inspired network partition chaos test matrix.",
    stars: "1.4k",
    forks: "134",
    skills: ["Rust", "Async (Tokio)", "Raft", "Distributed Systems", "TLA+"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYXBCZHoh9HYhRNUl9fd3iPXxNmTiK8j2MwxbldrTpdNaxsSTteNxoxwCgLLBn05bK06Tpfs4eHG-vhGqTLSv4GlHiGxp4HXFOJTix6X8s7ubojork5qCVTT4rexqQPrR4ka88bQE31KhzVRKdvpoWjKT-NtCN8jxElzXXf0-HTniNPpYBaYh-vaFlz1aJZwHoZrTcfambhF313L5hMxvDiPg4gRlijnDPGZ0DVu_pHADbDRMTCax85Q",
    imageAlt: "Raft consensus log replication visual scheme",
  },
  {
    title: "FlowGate: eBPF-Powered API Gateway",
    url: "https://github.com/cipherWizard31",
    description:
      "Ultra-high throughput reverse proxy and L4/L7 load balancer leveraging Linux eBPF maps for zero-context-switch packet routing and real-time distributed DDoS filtering before network packets traverse into user space.",
    stars: "620+",
    forks: "45",
    skills: ["C", "eBPF", "Go", "Linux Kernel", "Grafana", "OpenTelemetry"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEtC08QI3M2fDy1oBPXSQIy-VwiG2UnSFrIoBGMSgVwCrTHCssDwKRsVQLw74LiXblQ8c3U5WdBeCQH9wGwtRrnVUi8upCkhCScjXtGv8vx_0oiQ8b1IcW_v7YYiZWh4sDV2FZemde2xPYco6t4UONaPpvK8srAaUp4Tqk4oqOIU6anL57WBba6nG6I97CcMFo6qjniMl1DBhd-nOCprJwu9iEeoScTOJ7q-dUi8ccIybu5s7tmnWjsQ",
    imageAlt: "FlowGate Linux kernel eBPF packet routing interface",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="mb-16 md:mb-24 scroll-mt-16 lg:scroll-mt-24"
    >
      {/* Mobile Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md bg-[#0b1326]/80 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none lg:bg-transparent">
        <h2 className="text-sm uppercase tracking-widest text-[#e2e8f0] font-bold lg:sr-only flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block"></span>
          Projects
        </h2>
      </div>

      <div className="mt-4 lg:mt-0 flex flex-col gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group relative rounded-xl p-6 bg-[#171f33]/30 hover:bg-[#171f33]/80 border border-[#2d3449]/40 hover:border-[#5eead4]/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="flex flex-col-reverse sm:flex-row sm:gap-6">
              {/* Left Column: Info & Stats */}
              <div className="sm:w-2/3">
                <h3 className="text-lg font-semibold text-[#e2e8f0] flex items-center gap-1 group-hover:text-[#5eead4] transition-colors duration-200">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="focus:outline-none"
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>{project.title}</span>
                  </a>
                  <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 text-[#94a3b8] group-hover:text-[#5eead4]">
                    arrow_outward
                  </span>
                </h3>

                <p className="mt-2.5 text-sm text-[#bbcac5] leading-relaxed">
                  {project.description}
                </p>

                {/* Stars and Forks Counters */}
                <div className="mt-3 flex items-center gap-4 text-[#94a3b8]">
                  <span className="flex items-center gap-1 font-mono text-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#5eead4]">
                      star
                    </span>
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#94a3b8]">
                      fork_right
                    </span>
                    {project.forks}
                  </span>
                </div>

                {/* Tech Badges */}
                <ul
                  aria-label="Technologies used"
                  className="mt-4 flex flex-wrap gap-1.5"
                >
                  {project.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1 rounded-full bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/20 font-mono text-xs font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Visual Thumbnail */}
              <div className="sm:w-1/3 mb-4 sm:mb-0 shrink-0">
                <div className="relative rounded-lg overflow-hidden h-36 sm:h-full bg-[#222a3d] border border-[#2d3449]/60 shadow-md">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={400}
                    height={250}
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Archive Link */}
      <div className="mt-8">
        <a
          href="https://github.com/cipherWizard31"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#e2e8f0] hover:text-[#5eead4] transition-colors duration-200 group"
        >
          <span className="font-medium">View Full Project Archive</span>
          <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform duration-200">
            arrow_forward
          </span>
        </a>
      </div>
    </section>
  );
}
