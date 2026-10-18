"use client";

import Image from "next/image";
import type { ProjectData } from "../types";

interface Props {
  projectsList: ProjectData[];
  projectForm: ProjectData;
  selectedProjectId: number | null;
  newProjectTag: string;
  isSaving: boolean;
  isUploadingImage: boolean;
  onSelect: (p: ProjectData) => void;
  onCreate: () => void;
  onFormChange: (updated: ProjectData) => void;
  onTagChange: (val: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDiscard: () => void;
  onDelete: (id: number) => void;
}

export default function ProjectsModule({
  projectsList,
  projectForm,
  selectedProjectId,
  newProjectTag,
  isSaving,
  isUploadingImage,
  onSelect,
  onCreate,
  onFormChange,
  onTagChange,
  onAddTag,
  onRemoveTag,
  onImageChange,
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
            <h2 className="text-base font-semibold text-[#dae2fd]">Systems &amp; Repositories</h2>
            <span className="text-xs font-mono text-[#94a3b8]">{projectsList.length} entries</span>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4] transition-colors border border-[#5eead4]/30"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>+ New Project</span>
          </button>
        </div>

        <div className="space-y-3">
          {projectsList.map((project) => {
            const isSelected = selectedProjectId === project.id;
            return (
              <div
                key={project.id}
                onClick={() => onSelect(project)}
                className={`p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#222a3d] border-[#5eead4]/40 shadow-[0_0_20px_-6px_rgba(94,234,212,0.15)]"
                    : "bg-[#131b2e] border-[#2d3449]/40 hover:bg-[#171f33]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#5eead4]/20 text-[#5eead4]">
                      #{project.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#94a3b8] bg-[#0b1326]">
                      {project.skills[0] || "SYSTEM"}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#94a3b8]">★ {project.stars}</span>
                </div>

                <h4 className={`text-sm font-semibold transition-colors ${isSelected ? "text-[#5eead4]" : "text-[#dae2fd]"}`}>
                  {project.title}
                </h4>
                <p className="text-xs text-[#bbcac5] mt-1 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#94a3b8]">
                  <span className="truncate max-w-[200px]">{project.url}</span>
                  {projectsList.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete project"
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
              {projectForm.id === 0 ? "NEW PROJECT ENTRY" : `PROJECT SPEC · #${projectForm.id}`}
            </span>
            <h3 className="text-lg font-semibold text-[#dae2fd]">
              Edit: {projectForm.title || "Untitled Project"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onDiscard}
              className="px-3.5 py-1.5 rounded-lg border border-[#2d3449] hover:bg-[#171f33] text-xs font-mono text-[#dae2fd] transition-colors">
              Discard
            </button>
            <button type="submit" disabled={isSaving}
              className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Project Title</label>
            <input type="text" value={projectForm.title} required className={inputCls}
              onChange={(e) => onFormChange({ ...projectForm, title: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Repository Link</label>
            <input type="url" value={projectForm.url} required className={`${inputCls} font-mono`}
              onChange={(e) => onFormChange({ ...projectForm, url: e.target.value })} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">Architecture Description</label>
          <textarea rows={3} value={projectForm.description} required
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none"
            onChange={(e) => onFormChange({ ...projectForm, description: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">GitHub Stars Count</label>
            <input type="text" value={projectForm.stars} className={`${inputCls} font-mono`}
              onChange={(e) => onFormChange({ ...projectForm, stars: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Forks Count</label>
            <input type="text" value={projectForm.forks} className={`${inputCls} font-mono`}
              onChange={(e) => onFormChange({ ...projectForm, forks: e.target.value })} />
          </div>
        </div>

        {/* Technologies tag pill input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#94a3b8] uppercase block">Technologies &amp; Tags</label>
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[#0b1326] border border-[#2d3449]">
            {projectForm.skills.map((skill) => (
              <span key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-xs font-mono text-[#5eead4] border border-[#5eead4]/30">
                <span>{skill}</span>
                <button type="button" onClick={() => onRemoveTag(skill)} className="hover:text-red-400">
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </span>
            ))}
            <div className="inline-flex items-center gap-1">
              <input type="text" placeholder="Add tag..." value={newProjectTag}
                onChange={(e) => onTagChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAddTag(); } }}
                className="bg-transparent text-xs font-mono text-[#dae2fd] px-2 py-1 focus:outline-none w-24" />
              <button type="button" onClick={onAddTag} className="text-xs font-mono text-[#5eead4] hover:underline">
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Image upload */}
        <div className="space-y-2 pt-2 border-t border-[#2d3449]/40">
          <label className="text-xs font-mono text-[#94a3b8] uppercase block">
            Project Thumbnail (Hashed Storage)
          </label>
          <div className="p-4 rounded-xl bg-[#0b1326] border border-[#2d3449] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-14 rounded-lg bg-[#222a3d] border border-[#2d3449] overflow-hidden shrink-0">
                <Image
                  src={projectForm.image_url}
                  alt={projectForm.image_alt || projectForm.title}
                  width={80}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-mono text-[#dae2fd] truncate max-w-[240px]">
                  {projectForm.image_url}
                </div>
                <div className="text-[11px] font-mono text-[#94a3b8]">
                  Stored with random hash in /public/uploads/
                </div>
              </div>
            </div>
            <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#e2e8f0] transition-colors border border-[#2d3449]">
              <span>{isUploadingImage ? "Hashing & Uploading..." : "Replace File"}</span>
              <input type="file" accept="image/*" onChange={onImageChange}
                className="hidden" disabled={isUploadingImage} />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
