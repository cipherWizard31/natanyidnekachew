"use client";

import type { ExperienceData } from "../types";

interface Props {
  experiencesList: ExperienceData[];
  experienceForm: ExperienceData;
  selectedExperienceId: number | null;
  newExpSkill: string;
  isSaving: boolean;
  onSelect: (exp: ExperienceData) => void;
  onCreate: () => void;
  onFormChange: (updated: ExperienceData) => void;
  onSkillInputChange: (val: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDiscard: () => void;
  onDelete: (id: number) => void;
}

export default function ExperienceModule({
  experiencesList,
  experienceForm,
  selectedExperienceId,
  newExpSkill,
  isSaving,
  onSelect,
  onCreate,
  onFormChange,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
  onSubmit,
  onDiscard,
  onDelete,
}: Props) {
  const inputCls =
    "w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ── Sidebar list ─────────────────────────────────────────── */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#dae2fd]">Career Positions</h2>
            <span className="text-xs font-mono text-[#94a3b8]">{experiencesList.length} entries</span>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4] transition-colors border border-[#5eead4]/30"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>+ New Role</span>
          </button>
        </div>

        <div className="space-y-3">
          {experiencesList.map((exp) => {
            const isSelected = selectedExperienceId === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => onSelect(exp)}
                className={`p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#222a3d] border-[#5eead4]/40 shadow-[0_0_20px_-6px_rgba(94,234,212,0.15)]"
                    : "bg-[#131b2e] border-[#2d3449]/40 hover:bg-[#171f33]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#5eead4]/20 text-[#5eead4]">
                    {exp.period}
                  </span>
                </div>

                <h4 className={`text-sm font-semibold transition-colors ${isSelected ? "text-[#5eead4]" : "text-[#dae2fd]"}`}>
                  {exp.role} · {exp.company}
                </h4>
                <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">{exp.tagline}</p>
                <p className="text-xs text-[#bbcac5] mt-2 line-clamp-2 leading-relaxed">{exp.description}</p>

                <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#94a3b8]">
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-[#0b1326] text-[10px]">{s}</span>
                    ))}
                    {exp.skills.length > 3 && (
                      <span className="text-[10px]">+{exp.skills.length - 3}</span>
                    )}
                  </div>
                  {experiencesList.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDelete(exp.id); }}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete role"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Edit form ─────────────────────────────────────────────── */}
      <form
        onSubmit={onSubmit}
        className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-[#2d3449]/50 pb-4">
          <div>
            <span className="text-xs font-mono text-[#94a3b8]">
              {experienceForm.id === 0 ? "NEW ROLE ENTRY" : "EXPERIENCE RECORD"}
            </span>
            <h3 className="text-lg font-semibold text-[#dae2fd]">
              Edit: {experienceForm.role || "Untitled Position"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onDiscard}
              className="px-3.5 py-1.5 rounded-lg border border-[#2d3449] hover:bg-[#171f33] text-xs font-mono text-[#dae2fd] transition-colors">
              Discard
            </button>
            <button type="submit" disabled={isSaving}
              className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Role Title</label>
            <input type="text" value={experienceForm.role} required className={inputCls}
              onChange={(e) => onFormChange({ ...experienceForm, role: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Company Name</label>
            <input type="text" value={experienceForm.company} required className={inputCls}
              onChange={(e) => onFormChange({ ...experienceForm, company: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Time Period</label>
            <input type="text" value={experienceForm.period} required className={`${inputCls} font-mono`}
              onChange={(e) => onFormChange({ ...experienceForm, period: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Tagline Sub-Title</label>
            <input type="text" value={experienceForm.tagline} className={`${inputCls} font-mono`}
              onChange={(e) => onFormChange({ ...experienceForm, tagline: e.target.value })} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">
            Role Engineering Summary &amp; Key Achievements
          </label>
          <textarea rows={4} value={experienceForm.description} required
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none leading-relaxed"
            onChange={(e) => onFormChange({ ...experienceForm, description: e.target.value })} />
        </div>

        {/* Skills pill input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#94a3b8] uppercase block">
            Technologies Used &amp; Key Tools
          </label>
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[#0b1326] border border-[#2d3449]">
            {experienceForm.skills.map((skill) => (
              <span key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-xs font-mono text-[#5eead4] border border-[#5eead4]/30">
                <span>{skill}</span>
                <button type="button" onClick={() => onRemoveSkill(skill)} className="hover:text-red-400">
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </span>
            ))}
            <div className="inline-flex items-center gap-1">
              <input type="text" placeholder="Add tech..." value={newExpSkill}
                onChange={(e) => onSkillInputChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAddSkill(); } }}
                className="bg-transparent text-xs font-mono text-[#dae2fd] px-2 py-1 focus:outline-none w-24" />
              <button type="button" onClick={onAddSkill} className="text-xs font-mono text-[#5eead4] hover:underline">
                + Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
