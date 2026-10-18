export default function About() {
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

      {/* Bio Copy */}
      <div className="mt-4 lg:mt-0 space-y-4 text-base text-[#bbcac5] leading-relaxed">
        <p>
          Back in 2021 when I was 13, I spun up my first self-hosted Redis instance and Go server,
          immediately captivated by the invisible machinery that quietly coordinates the modern
          Internet. Fast-forward to today: at 16, I&apos;ve had the distinct privilege of architecting
          high-throughput distributed microservices, engineering low-latency database engines, and
          actively contributing to open-source distributed systems.
        </p>

        <p>
          My engineering philosophy centers around mechanical sympathy and structural simplicity. I
          am fundamentally obsessed with concurrent pipelines, consensus protocols (
          <span className="text-[#e2e8f0] font-medium">Raft, Paxos</span>), zero-allocation memory
          layouts, gRPC over HTTP/2, and crafting blazingly resilient services in{" "}
          <span className="text-[#5eead4] font-medium">Go</span>,{" "}
          <span className="text-[#5eead4] font-medium">Rust</span>, and{" "}
          <span className="text-[#e2e8f0] font-medium">Python</span>. I believe backends should be
          deterministic, auditable, and capable of operating without intervention under severe
          network partitioning.
        </p>

        <p>
          Currently, I am deep into researching distributed stream processors, zero-copy socket
          buffers, and kernel-bypass networking via{" "}
          <span className="text-[#e2e8f0] font-medium">eBPF</span>. When I&apos;m not profiling memory
          allocations or tracing latency spikes with FlameGraphs, you&apos;ll find me tearing down
          database papers or simulating partition scenarios with Jepsen.
        </p>
      </div>

      {/* Live Telemetry / Core Architecture Callout Widget */}
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
            v0.9.4-stable
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3 pt-1 text-left">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#94a3b8] uppercase tracking-wide">
              Target QPS
            </span>
            <span className="font-mono text-base md:text-lg text-[#e2e8f0] font-semibold">
              1.2M+
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#94a3b8] uppercase tracking-wide">
              Consensus
            </span>
            <span className="font-mono text-base md:text-lg text-[#e2e8f0] font-semibold">
              Raft (Rust)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[#94a3b8] uppercase tracking-wide">
              p99 Latency
            </span>
            <span className="font-mono text-base md:text-lg text-[#5eead4] font-semibold">
              &lt; 0.8ms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
