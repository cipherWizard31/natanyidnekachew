export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-label="Engineering Philosophy"
      className="mb-16 md:mb-24 scroll-mt-16 lg:scroll-mt-24"
    >
      {/* Mobile Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md bg-[#0b1326]/80 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none lg:bg-transparent">
        <h2 className="text-sm uppercase tracking-widest text-[#e2e8f0] font-bold lg:sr-only flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block"></span>
          Philosophy
        </h2>
      </div>

      <div className="mt-4 lg:mt-0 p-6 md:p-8 rounded-xl bg-[#171f33]/30 border border-[#2d3449]/40 shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#5eead4]/5 to-transparent pointer-events-none -mr-16 -mt-16" />

        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5eead4] font-medium">
            ENGINEERING PRINCIPLE / 01
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-[#e2e8f0] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#5eead4] text-[22px]">
            psychology
          </span>
          <span>Beyond the Code</span>
        </h3>

        <div className="text-sm md:text-base text-[#bbcac5] leading-relaxed space-y-4">
          <p>
            AI is changing how software is built, but writing code has never been
            the whole job of an engineer. Building reliable software requires
            understanding ambiguous problems, making{" "}
            <span className="text-[#5eead4] font-medium">architectural trade-offs</span>,
            reasoning about security and performance, validating results, and taking
            responsibility for systems in production.
          </p>

          <p>
            AI can accelerate implementation, but its output still needs direction,
            verification, and sound{" "}
            <span className="text-[#5eead4] font-medium">engineering judgment</span>.
            The future belongs not to developers who compete with AI at generating code,
            but to engineers who use it effectively while mastering the fundamentals that{" "}
            <span className="text-[#5eead4] font-medium">make software dependable</span>.
          </p>
        </div>
      </div>

      {/* Editorial Colophon */}
      <footer className="mt-16 pt-8 border-t border-[#2d3449]/30 text-xs font-mono text-[#94a3b8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          Crafted with Next.js, TypeScript &amp; Tailwind CSS. Hosted on Vercel.
        </p>
        <p>© 2026 Natan Yidnekachew. All rights reserved.</p>
      </footer>
    </section>
  );
}
