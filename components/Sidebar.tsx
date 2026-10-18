"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

const socialLinks = [
  {
    name: "GitHub",
    icon: "code",
    href: "https://github.com/cipherWizard31",
    label: "GitHub Profile",
  },
  {
    name: "LinkedIn",
    icon: "share",
    href: "https://linkedin.com/in/natanyidnekachew",
    label: "LinkedIn Profile",
  },
  {
    name: "Telegram",
    icon: "terminal",
    href: "https://t.me/CipherWizard",
    label: "Telegram / Channel",
  },
  {
    name: "Email",
    icon: "mail",
    href: "mailto:natanyidnkeachew@gmail.com",
    label: "Email Inquiries",
  },
  {
    name: "Substack",
    icon: "article",
    href: "https://cipherwizard.substack.com",
    label: "Engineering Substack",
  },
];

export default function Sidebar() {
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
      // update hash without abrupt jump
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-16 pt-10 pb-8">
      <div className="flex flex-col">
        {/* Name and Tagline */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#dae2fd]">
            <a
              href="#"
              className="hover:text-[#b5fff0] transition-colors duration-200"
            >
              Natan Yidnekachew
            </a>
          </h1>
          <h2 className="mt-3 text-lg sm:text-xl font-medium tracking-tight text-[#b5fff0]">
            Backend Engineer &amp; Distributed Systems Enthusiast
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-normal text-[#94a3b8]">
            I build robust, scalable server architectures, distributed databases,
            high-throughput microservices, and high-performance backend systems.
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

      {/* Social links & Profile Avatar */}
      <div className="mt-10 lg:mt-0 flex items-center justify-between">
        <ul aria-label="Social and contact links" className="flex items-center gap-5">
          {socialLinks.map((social) => (
            <li key={social.name}>
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

        {/* Profile Avatar / Indicator */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#5eead4]/40 bg-[#171f33] shadow-inner flex items-center justify-center">
          <Image
            src="/profile.webp"
            alt="Natan Yidnekachew"
            width={36}
            height={36}
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if image fails to load
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
