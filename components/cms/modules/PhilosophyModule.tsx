"use client";

import type { PhilosophyData } from "../types";

interface Props {
  philosophyForm: PhilosophyData;
  isSaving: boolean;
  onChangeForm: (updater: (prev: PhilosophyData) => PhilosophyData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PhilosophyModule({
  philosophyForm,
  isSaving,
  onChangeForm,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-xl space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#2d3449]/50 pb-4">
        <div>
          <span className="text-xs font-mono text-[#94a3b8]">EDITORIAL PRINCIPLES</span>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Beyond the Code / Philosophy Studio
          </h3>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Update Principle"}
        </button>
      </div>

      {/* Principle Tag & Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">
            Principle Tag Header
          </label>
          <input
            type="text"
            value={philosophyForm.principle_tag}
            onChange={(e) =>
              onChangeForm((prev) => ({
                ...prev,
                principle_tag: e.target.value,
              }))
            }
            required
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#5eead4] focus:border-[#5eead4] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">
            Section Title
          </label>
          <input
            type="text"
            value={philosophyForm.title}
            onChange={(e) =>
              onChangeForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
          />
        </div>
      </div>

      {/* Paragraph 1 */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-[#94a3b8] uppercase">
          Paragraph 1 (The Role of Engineers in the AI Era)
        </label>
        <textarea
          rows={4}
          value={philosophyForm.paragraph1}
          onChange={(e) =>
            onChangeForm((prev) => ({
              ...prev,
              paragraph1: e.target.value,
            }))
          }
          required
          className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none leading-relaxed"
        />
      </div>

      {/* Paragraph 2 */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-[#94a3b8] uppercase">
          Paragraph 2 (Engineering Judgment &amp; Dependability)
        </label>
        <textarea
          rows={4}
          value={philosophyForm.paragraph2}
          onChange={(e) =>
            onChangeForm((prev) => ({
              ...prev,
              paragraph2: e.target.value,
            }))
          }
          required
          className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none leading-relaxed"
        />
      </div>

      {/* Colophon & Copyright */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#2d3449]/40">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">
            Colophon Stack Text
          </label>
          <input
            type="text"
            value={philosophyForm.footer_text}
            onChange={(e) =>
              onChangeForm((prev) => ({
                ...prev,
                footer_text: e.target.value,
              }))
            }
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-xs font-mono text-[#94a3b8] focus:border-[#5eead4] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">
            Copyright Notice
          </label>
          <input
            type="text"
            value={philosophyForm.copyright}
            onChange={(e) =>
              onChangeForm((prev) => ({
                ...prev,
                copyright: e.target.value,
              }))
            }
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-xs font-mono text-[#94a3b8] focus:border-[#5eead4] focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
