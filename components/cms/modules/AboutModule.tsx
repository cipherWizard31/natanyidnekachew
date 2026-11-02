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
                {aboutData.stat_experience || "6+ Yrs"} {aboutData.stat_experience_label || "Experience"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 pt-1 text-left">
              {[
                { label: aboutData.stat_apps_label || "Apps Built",  value: aboutData.stat_projects || "12+", color: "text-[#e2e8f0]" },
                { label: aboutData.stat_tech_label || "Tech",        value: aboutData.stat_users || "50K+",   color: "text-[#e2e8f0]" },
                { label: aboutData.stat_users_label || "Total Users", value: aboutData.stat_uptime || "99.99%", color: "text-[#5eead4]" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <span className="font-mono text-[10px] text-[#94a3b8] block truncate">{label}</span>
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
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#5eead4] font-medium block">
              About Section Stats &amp; Impact Controls
            </span>
            <p className="text-xs text-[#94a3b8] mt-1">
              Customize both the labels and values shown in the stats bar on your portfolio About section.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                labelName: "stat_experience_label" as const,
                labelTitle: "Stat 1 Label",
                labelDefault: "Experience",
                valName: "stat_experience" as const,
                valTitle: "Stat 1 Value",
                valDefault: "6+ Yrs",
                accent: false,
              },
              {
                labelName: "stat_apps_label" as const,
                labelTitle: "Stat 2 Label",
                labelDefault: "Apps Built",
                valName: "stat_projects" as const,
                valTitle: "Stat 2 Value",
                valDefault: "12+",
                accent: true,
              },
              {
                labelName: "stat_tech_label" as const,
                labelTitle: "Stat 3 Label",
                labelDefault: "Tech",
                valName: "stat_users" as const,
                valTitle: "Stat 3 Value",
                valDefault: "50K+",
                accent: false,
              },
              {
                labelName: "stat_users_label" as const,
                labelTitle: "Stat 4 Label",
                labelDefault: "Total Users",
                valName: "stat_uptime" as const,
                valTitle: "Stat 4 Value",
                valDefault: "99.99%",
                accent: true,
              },
            ].map(({ labelName, labelTitle, labelDefault, valName, valTitle, valDefault, accent }) => (
              <div key={labelName} className="p-3.5 rounded-xl bg-[#0b1326]/80 border border-[#2d3449] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[#94a3b8] uppercase">{labelTitle}</label>
                  <input
                    type="text"
                    placeholder={labelDefault}
                    value={aboutData[labelName] ?? ""}
                    onChange={(e) => onChange({ ...aboutData, [labelName]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-[#94a3b8] uppercase">{valTitle}</label>
                  <input
                    type="text"
                    placeholder={valDefault}
                    value={aboutData[valName] ?? ""}
                    onChange={(e) => onChange({ ...aboutData, [valName]: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm font-mono focus:border-[#5eead4] focus:outline-none ${
                      accent ? "text-[#5eead4]" : "text-[#dae2fd]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
