"use client";

import { useEffect, useState } from "react";
import type { ProfileData, SocialLinkData } from "@/lib/portfolio";
import { SocialIcon } from "./SocialIcon";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "testimonials", label: "Testimonials" },
];

interface SidebarProps {
  profile: ProfileData;
  socialLinks: SocialLinkData[];
}

export default function Sidebar({ profile, socialLinks }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Name, Title & Tagline */}
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="/">{profile.name}</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {profile.title}
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-slate-400">
          {profile.summary}
        </p>

        {/* Navigation Indicator & Jump Links */}
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    className={`group flex items-center py-3 ${isActive ? "active text-slate-200" : ""
                      }`}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span
                      className={`nav-indicator mr-4 h-px transition-all motion-reduce:transition-none ${isActive
                          ? "w-16 bg-slate-200"
                          : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200"
                        }`}
                    />
                    <span
                      className={`nav-text text-xs font-bold uppercase tracking-widest ${isActive
                          ? "text-slate-200"
                          : "text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                        }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social Links */}
      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        {socialLinks.map((social) => (
          <li key={social.id} className="mr-5 shrink-0 text-xs">
            <a
              className="block text-slate-400 hover:text-slate-200 transition-colors"
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${social.label || social.name} (opens in a new tab)`}
              title={social.label || social.name}
            >
              <span className="sr-only">{social.label || social.name}</span>
              <SocialIcon name={social.name} className="h-6 w-6" />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
