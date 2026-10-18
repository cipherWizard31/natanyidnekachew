import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import SkillsWriting from "@/components/SkillsWriting";
import Philosophy from "@/components/Philosophy";
import { getPortfolioData } from "@/lib/portfolio";

export default function Home() {
  const data = getPortfolioData();

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
          {/* Rebranded Sidebar powered by SQLite */}
          <Sidebar profile={data.profile} socialLinks={data.socialLinks} />

          {/* Main content sections powered by SQLite */}
          <main className="lg:w-1/2 lg:py-16 pt-8 pb-16 relative">
            {/* About Section */}
            <About about={data.about} />

            {/* Projects Section */}
            <Projects projects={data.projects} />

            {/* Experience Section */}
            <Experience
              experiences={data.experiences}
              resumeUrl={data.profile.resume_url}
            />

            {/* Certifications Section */}
            <Certifications certifications={data.certifications} />

            {/* Skills & Writing Section */}
            <SkillsWriting
              skillCategories={data.skillCategories}
              articles={data.articles}
            />

            {/* Philosophy Section */}
            <Philosophy philosophy={data.philosophy} />
          </main>
        </div>
      </div>
    </div>
  );
}
