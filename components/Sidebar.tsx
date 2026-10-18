"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProfileData, SocialLinkData } from "@/lib/portfolio";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "writing", label: "Skills & Writing" },
  { id: "philosophy", label: "Philosophy" },
];

interface SidebarProps {
  profile: ProfileData;
  socialLinks: SocialLinkData[];
}

export default function Sidebar({ profile, socialLinks }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      // If user has scrolled to the bottom of the page, activate the last section
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      // Check section bounding rects relative to viewport
      const threshold = window.innerHeight * 0.35;
      let currentSection = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSection = item.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(targetId);
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-16 pt-10 pb-8">
      <div className="flex flex-col">
        {/* Name and Tagline from SQLite DB */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#dae2fd]">
            <a
              href="#"
              className="hover:text-[#b5fff0] transition-colors duration-200"
            >
              {profile.name}
            </a>
          </h1>
          <h2 className="mt-3 text-lg sm:text-xl font-medium tracking-tight text-[#b5fff0]">
            {profile.title}
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-normal text-[#94a3b8]">
            {profile.summary}
          </p>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block mt-16" aria-label="In-page navigation">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="group">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center py-1 transition-all duration-200 ${
                      isActive
                        ? "text-[#b5fff0] font-semibold"
                        : "text-[#bbcac5] hover:text-[#b5fff0]"
                    }`}
                  >
                    <span
                      className={`mr-4 h-px transition-all duration-200 ${
                        isActive
                          ? "w-16 bg-[#b5fff0]"
                          : "w-8 bg-[#859490]/50 group-hover:w-16 group-hover:bg-[#b5fff0]"
                      }`}
                    />
                    <span className="font-mono text-xs tracking-widest uppercase">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social links & Profile Avatar from DB */}
      <div className="mt-10 lg:mt-0 flex items-center justify-between">
        <ul aria-label="Social and contact links" className="flex items-center gap-5">
          {socialLinks.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-[#94a3b8] hover:text-[#b5fff0] transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-[22px] leading-none align-middle">
                  {social.icon}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Profile Avatar using DB image URL */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#5eead4]/40 bg-[#171f33] shadow-inner flex items-center justify-center">
          <Image
            src={profile.avatar_url}
            alt={profile.name}
            width={36}
            height={36}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
          <span className="material-symbols-outlined text-[#003730] text-[18px] absolute pointer-events-none -z-10">
            person
          </span>
        </div>
      </div>
    </header>
  );
}
