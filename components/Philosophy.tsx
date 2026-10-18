import type { PhilosophyData } from "@/lib/portfolio";

interface PhilosophyProps {
  philosophy: PhilosophyData;
}

export default function Philosophy({ philosophy }: PhilosophyProps) {
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
            {philosophy.principle_tag}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-[#e2e8f0] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#5eead4] text-[22px]">
            psychology
          </span>
          <span>{philosophy.title}</span>
        </h3>

        <div className="text-sm md:text-base text-[#bbcac5] leading-relaxed space-y-4">
          <p>{philosophy.paragraph1}</p>
          <p>{philosophy.paragraph2}</p>
        </div>
      </div>

      {/* Editorial Colophon from DB */}
      <footer className="mt-16 pt-8 border-t border-[#2d3449]/30 text-xs font-mono text-[#94a3b8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>{philosophy.footer_text}</p>
        <p>{philosophy.copyright}</p>
      </footer>
    </section>
  );
}
