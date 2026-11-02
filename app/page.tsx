import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";

import SpotlightBackground from "@/components/SpotlightBackground";
import { getPortfolioData } from "@/lib/portfolio";

export default function Home() {
  const data = getPortfolioData();

  return (
    <div className="relative">
      {/* Interactive mouse spotlight background tracking cursor */}
      <SpotlightBackground />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-teal-300 px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 focus-visible:translate-x-0 focus-visible:text-slate-900 z-50 transition"
        >
          Skip to Content
        </a>

        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left sticky sidebar */}
          <Sidebar profile={data.profile} socialLinks={data.socialLinks} />

          {/* Right main scrolling content */}
          <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
            {/* About Section */}
            <About about={data.about} />

            {/* Experience Section */}
            <Experience
              experiences={data.experiences}
              resumeUrl={data.profile.resume_url}
            />

            {/* Projects Section */}
            <Projects projects={data.projects} />

            {/* Certifications Section */}
            <Certifications certifications={data.certifications} />

            {/* Testimonials Section (Final section before footer) */}
            <Testimonials testimonials={data.testimonials} />

          </main>
        </div>
      </div>
    </div>
  );
}
