import type { AboutData } from "@/lib/portfolio";

interface AboutProps {
  about: AboutData;
}

export default function About({ about }: AboutProps) {
  return (
    <section
      id="about"
      aria-label="About me"
      className="mb-16 md:mb-24 scroll-mt-16 lg:scroll-mt-24"
    >
      {/* Mobile Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md bg-[#0b1326]/80 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none lg:bg-transparent">
        <h2 className="text-sm uppercase tracking-widest text-[#e2e8f0] font-bold lg:sr-only flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block"></span>
          About
        </h2>
      </div>

      {/* Bio Copy from SQLite DB */}
      <div className="mt-4 lg:mt-0 space-y-4 text-base text-[#bbcac5] leading-relaxed">
        <p>{about.paragraph1}</p>
        <p>{about.paragraph2}</p>
        <p>{about.paragraph3}</p>
      </div>

      {/* Live Telemetry / Core Architecture Callout Widget from SQLite DB */}
      <div className="mt-6 p-4 rounded-xl bg-[#171f33]/70 border border-[#2d3449]/60 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#2d3449]/40">
          <span className="font-mono text-xs text-[#94a3b8] uppercase tracking-wider flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5eead4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5eead4]"></span>
            </span>
            Runtime Architecture Node
          </span>
          <span className="font-mono text-xs text-[#5eead4] font-medium bg-[#5eead4]/10 px-2 py-0.5 rounded-full border border-[#5eead4]/20">
            {about.runtime_version}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3 pt-1 text-left">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#94a3b8] uppercase tracking-wide">
              Target QPS
            </span>
            <span className="font-mono text-base md:text-lg text-[#e2e8f0] font-semibold">
              {about.target_qps}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#94a3b8] uppercase tracking-wide">
              Consensus
            </span>
            <span className="font-mono text-base md:text-lg text-[#e2e8f0] font-semibold">
              {about.consensus}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#94a3b8] uppercase tracking-wide">
              p99 Latency
            </span>
            <span className="font-mono text-base md:text-lg text-[#5eead4] font-semibold">
              {about.p99_latency}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
