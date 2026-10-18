"use client";

import type { AboutData } from "../types";

interface Props {
  aboutData: AboutData;
  initialAbout: AboutData;
  isSaving: boolean;
  onChange: (updated: AboutData) => void;
  onDiscard: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AboutModule({
  aboutData,
  initialAbout,
  isSaving,
  onChange,
  onDiscard,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* ── Live Preview ─────────────────────────────────────────── */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#dae2fd] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5eead4] text-[18px]">visibility</span>
            <span>Real-Time Preview</span>
          </h2>
          <span className="text-xs font-mono text-[#94a3b8]">Live Reflection</span>
        </div>

        <div className="p-6 rounded-2xl bg-[#171f33]/60 border border-[#2d3449]/60 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2d3449]/40">
            <span className="font-mono text-xs uppercase tracking-wider text-[#5eead4] font-medium">
              Portfolio · About Me
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/20">
              SQLITE SYNC
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#bbcac5] leading-relaxed">
            <p className="line-clamp-4">{aboutData.paragraph1}</p>
            <p className="line-clamp-4">{aboutData.paragraph2}</p>
            <p className="line-clamp-3">{aboutData.paragraph3}</p>
          </div>

          {/* Client Stats Widget Preview */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#131b2e] border border-[#2d3449] shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#222a3d]">
              <span className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
                Client Stats &amp; Impact
              </span>
              <span className="font-mono text-[10px] text-[#5eead4] font-medium">
                {aboutData.stat_experience || "4+ Yrs"} Experience
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 pt-1 text-left">
              {[
                { label: "Shipped Projects", value: aboutData.stat_projects || "12+", color: "text-[#e2e8f0]" },
                { label: "Active Users",     value: aboutData.stat_users || "50K+",   color: "text-[#e2e8f0]" },
                { label: "System Uptime",   value: aboutData.stat_uptime || "99.99%", color: "text-[#5eead4]" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <span className="font-mono text-[10px] text-[#94a3b8] block">{label}</span>
                  <span className={`font-mono text-xs font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit Form ────────────────────────────────────────────── */}
      <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#2d3449]/50 pb-4">
          <div>
            <span className="text-xs font-mono text-[#94a3b8]">SECTION CONTENT</span>
            <h3 className="text-lg font-semibold text-[#dae2fd]">
              Edit About Narrative &amp; Client Stats
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDiscard}
              className="px-3.5 py-1.5 rounded-lg border border-[#2d3449] hover:bg-[#171f33] text-xs font-mono text-[#dae2fd] transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Section"}
            </button>
          </div>
        </div>

        {/* Narrative paragraphs */}
        {(
          [
            { name: "paragraph1" as const, label: "Paragraph 1: Background & Origins",               rows: 3 },
            { name: "paragraph2" as const, label: "Paragraph 2: Engineering Philosophy & Tooling",   rows: 4 },
            { name: "paragraph3" as const, label: "Paragraph 3: Current Research & Interests",       rows: 3 },
          ] as const
        ).map(({ name, label, rows }) => (
          <div key={name} className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide">
              {label}
            </label>
            <textarea
              name={name}
              rows={rows}
              value={aboutData[name]}
              onChange={(e) => onChange({ ...aboutData, [name]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>
        ))}

        {/* Client Stats & Impact Metric Controls */}
        <div className="pt-2 border-t border-[#2d3449]/40 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#5eead4] font-medium block">
            Client Stats &amp; Impact Controls
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                { name: "stat_projects"   as const, label: "Shipped Projects (e.g. 12+)",     mono: true,  accent: false, placeholder: "12+" },
                { name: "stat_users"      as const, label: "Active Users (e.g. 50K+)",         mono: true,  accent: false, placeholder: "50K+" },
                { name: "stat_uptime"     as const, label: "System Uptime (e.g. 99.99%)",      mono: true,  accent: true,  placeholder: "99.99%" },
                { name: "stat_experience" as const, label: "Engineering Tenure (e.g. 4+ Yrs)", mono: true,  accent: true,  placeholder: "4+ Yrs" },
              ] as const
            ).map(({ name, label, accent, placeholder }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-xs font-mono text-[#94a3b8] uppercase">{label}</label>
                <input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  value={aboutData[name] || ""}
                  onChange={(e) => onChange({ ...aboutData, [name]: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono focus:border-[#5eead4] focus:outline-none ${
                    accent ? "text-[#5eead4]" : "text-[#dae2fd]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
