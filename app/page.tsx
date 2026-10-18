import Sidebar from "@/components/Sidebar";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0b1326] text-[#bbcac5] selection:bg-[#5eead4] selection:text-[#00675b]">
      {/* Background ambient radial glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background:
            "radial-gradient(600px at 50% 50%, rgba(94, 234, 212, 0.06), transparent 80%)",
        }}
      />

      <div className="mx-auto min-h-screen max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-12">
          {/* Rebranded Sidebar */}
          <Sidebar />

          {/* Main content sections */}
          <main className="lg:w-1/2 lg:py-16 pt-8 pb-16 relative">
            {/* About Section */}
            <About />

            <section
              id="experience"
              className="mb-16 scroll-mt-16 lg:scroll-mt-24 p-6 rounded-xl bg-[#171f33]/40 border border-[#2d3449]/50"
            >
              <h2 className="text-xl font-bold text-[#dae2fd] mb-3">Experience</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">Experience section slot.</p>
            </section>

            <section
              id="projects"
              className="mb-16 scroll-mt-16 lg:scroll-mt-24 p-6 rounded-xl bg-[#171f33]/40 border border-[#2d3449]/50"
            >
              <h2 className="text-xl font-bold text-[#dae2fd] mb-3">Projects</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">Projects section slot.</p>
            </section>

            <section
              id="writing"
              className="mb-16 scroll-mt-16 lg:scroll-mt-24 p-6 rounded-xl bg-[#171f33]/40 border border-[#2d3449]/50"
            >
              <h2 className="text-xl font-bold text-[#dae2fd] mb-3">Skills &amp; Writing</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">Skills &amp; Writing section slot.</p>
            </section>

            <section
              id="certifications"
              className="mb-16 scroll-mt-16 lg:scroll-mt-24 p-6 rounded-xl bg-[#171f33]/40 border border-[#2d3449]/50"
            >
              <h2 className="text-xl font-bold text-[#dae2fd] mb-3">Certifications</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">Certifications section slot.</p>
            </section>

            <section
              id="philosophy"
              className="mb-16 scroll-mt-16 lg:scroll-mt-24 p-6 rounded-xl bg-[#171f33]/40 border border-[#2d3449]/50"
            >
              <h2 className="text-xl font-bold text-[#dae2fd] mb-3">Philosophy</h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed">Philosophy section slot.</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
