"use client";

import { useState } from "react";
import Link from "next/link";
import type { AboutData } from "@/lib/portfolio";

interface CMSAboutClientProps {
  initialAbout: AboutData;
}

export default function CMSAboutClient({ initialAbout }: CMSAboutClientProps) {
  const [formData, setFormData] = useState<AboutData>(initialAbout);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/cms/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMessage({
          type: "success",
          text: "About section & telemetry parameters saved to SQLite database!",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: json.error || "Failed to update About section",
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Network or server error while saving changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setFormData(initialAbout);
    setStatusMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans antialiased flex flex-col selection:bg-[#5eead4] selection:text-[#00675b]">
      {/* Header matching Stitch CMS design */}
      <header className="sticky top-0 z-50 h-16 border-b border-[#2d3449]/60 bg-[#060e20]/95 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5eead4] animate-pulse shadow-[0_0_10px_#5eead4]" />
            <span className="font-mono text-sm tracking-wide font-medium text-[#dae2fd]">
              NATAN YIDNKEACHEW{" "}
              <span className="text-[#5eead4] font-semibold">//</span> CMS STUDIO
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#131b2e] border border-[#2d3449]/40">
            <span className="w-2 h-2 rounded-full bg-[#5eead4]" />
            <span className="font-mono text-xs text-[#bbcac5]">
              Database: <span className="text-[#5eead4] font-medium">SQLite (Live)</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#94a3b8] hover:text-[#dae2fd] hover:bg-[#131b2e] transition-colors"
          >
            <span>View Live Site</span>
            <span className="material-symbols-outlined text-[15px]">north_east</span>
          </Link>

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            type="button"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#5eead4] hover:bg-[#b5fff0] text-[#00675b] text-xs font-mono font-semibold transition-all shadow-[0_0_16px_-4px_rgba(94,234,212,0.3)] active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSaving ? "sync" : "cloud_upload"}
            </span>
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Sub-nav / Section Bar */}
      <div className="border-b border-[#2d3449]/60 bg-[#060e20]/60 px-6 py-2.5 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <nav className="flex items-center gap-1.5">
            {/* Active About Section Tab */}
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-2 bg-[#222a3d] text-[#5eead4] font-medium shadow-sm border border-[#5eead4]/30"
            >
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>About Section</span>
            </button>

            {/* Inactive placeholders for upcoming CMS tabs */}
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 text-[#94a3b8]/40 cursor-not-allowed"
              title="Next CMS Module"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Projects</span>
            </button>
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 text-[#94a3b8]/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Experience</span>
            </button>
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 text-[#94a3b8]/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Certifications</span>
            </button>
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 text-[#94a3b8]/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">memory</span>
              <span>Skills &amp; Writing</span>
            </button>
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 text-[#94a3b8]/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Philosophy</span>
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#94a3b8] pl-4 border-l border-[#2d3449]/40">
            <span className="text-[#5eead4]">●</span>
            <span>Module 1/6: About Active</span>
          </div>
        </div>
      </div>

      {/* Main CMS Form Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {/* Status Toast Alert */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl font-mono text-xs flex items-center justify-between border ${
              statusMessage.type === "success"
                ? "bg-[#5eead4]/10 text-[#5eead4] border-[#5eead4]/30"
                : "bg-red-950/40 text-red-300 border-red-800/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {statusMessage.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-[#94a3b8] hover:text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Preview Card of About Section */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#dae2fd] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5eead4] text-[18px]">
                  visibility
                </span>
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
                <p className="line-clamp-4">{formData.paragraph1}</p>
                <p className="line-clamp-4">{formData.paragraph2}</p>
                <p className="line-clamp-3">{formData.paragraph3}</p>
              </div>

              {/* Preview Telemetry Widget */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#131b2e] border border-[#2d3449] shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#222a3d]">
                  <span className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
                    Runtime Node
                  </span>
                  <span className="font-mono text-[10px] text-[#5eead4] font-medium">
                    {formData.runtime_version}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 pt-1 text-left">
                  <div>
                    <span className="font-mono text-[10px] text-[#94a3b8] block">
                      Target QPS
                    </span>
                    <span className="font-mono text-xs text-[#e2e8f0] font-semibold">
                      {formData.target_qps}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#94a3b8] block">
                      Consensus
                    </span>
                    <span className="font-mono text-xs text-[#e2e8f0] font-semibold">
                      {formData.consensus}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#94a3b8] block">
                      p99 Latency
                    </span>
                    <span className="font-mono text-xs text-[#5eead4] font-semibold">
                      {formData.p99_latency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Edit Controls & Fields */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d3449]/50 pb-4">
              <div>
                <span className="text-xs font-mono text-[#94a3b8]">SECTION CONTENT</span>
                <h3 className="text-lg font-semibold text-[#dae2fd]">
                  Edit About Narrative &amp; Telemetry
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDiscard}
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

            {/* Paragraph 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide flex items-center justify-between">
                <span>Paragraph 1: Background &amp; Origins</span>
                <span className="text-[11px] text-[#859490]">
                  {formData.paragraph1.length} chars
                </span>
              </label>
              <textarea
                name="paragraph1"
                rows={3}
                value={formData.paragraph1}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none transition-colors"
              />
            </div>

            {/* Paragraph 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide flex items-center justify-between">
                <span>Paragraph 2: Engineering Philosophy &amp; Tooling</span>
                <span className="text-[11px] text-[#859490]">
                  {formData.paragraph2.length} chars
                </span>
              </label>
              <textarea
                name="paragraph2"
                rows={4}
                value={formData.paragraph2}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none transition-colors"
              />
            </div>

            {/* Paragraph 3 */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide flex items-center justify-between">
                <span>Paragraph 3: Current Research &amp; Interests</span>
                <span className="text-[11px] text-[#859490]">
                  {formData.paragraph3.length} chars
                </span>
              </label>
              <textarea
                name="paragraph3"
                rows={3}
                value={formData.paragraph3}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none transition-colors"
              />
            </div>

            {/* Telemetry Architecture Node Specs */}
            <div className="pt-2 border-t border-[#2d3449]/40 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5eead4] font-medium block">
                Telemetry Widget Metric Controls
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Runtime Version Tag
                  </label>
                  <input
                    type="text"
                    name="runtime_version"
                    value={formData.runtime_version}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#5eead4] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Target QPS Throughput
                  </label>
                  <input
                    type="text"
                    name="target_qps"
                    value={formData.target_qps}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Consensus Protocol Engine
                  </label>
                  <input
                    type="text"
                    name="consensus"
                    value={formData.consensus}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    p99 Latency Threshold
                  </label>
                  <input
                    type="text"
                    name="p99_latency"
                    value={formData.p99_latency}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#5eead4] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
