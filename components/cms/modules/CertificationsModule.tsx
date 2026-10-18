"use client";

import type { CertificationData } from "../types";

interface Props {
  certificationsList: CertificationData[];
  certForm: CertificationData;
  selectedCertId: string | null;
  newCertSkill: string;
  isSaving: boolean;
  onSelectCert: (cert: CertificationData) => void;
  onCreateNewCert: () => void;
  onDeleteCert: (id: string) => void;
  onChangeForm: (updater: (prev: CertificationData) => CertificationData) => void;
  onDiscard: () => void;
  onSubmit: (e: React.FormEvent) => void;
  setNewCertSkill: (val: string) => void;
  onAddCertSkill: () => void;
  onRemoveCertSkill: (skill: string) => void;
}

export default function CertificationsModule({
  certificationsList,
  certForm,
  selectedCertId,
  newCertSkill,
  isSaving,
  onSelectCert,
  onCreateNewCert,
  onDeleteCert,
  onChangeForm,
  onDiscard,
  onSubmit,
  setNewCertSkill,
  onAddCertSkill,
  onRemoveCertSkill,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#dae2fd]">Verified Credentials</h2>
            <span className="text-xs font-mono text-[#94a3b8]">{certificationsList.length} entries</span>
          </div>
          <button
            type="button"
            onClick={onCreateNewCert}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4] transition-colors border border-[#5eead4]/30"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>+ New Cert</span>
          </button>
        </div>

        <div className="space-y-3">
          {certificationsList.map((cert) => {
            const isSelected = selectedCertId === cert.id;
            return (
              <div
                key={cert.id}
                onClick={() => onSelectCert(cert)}
                className={`p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#222a3d] border-[#5eead4]/40 shadow-[0_0_20px_-6px_rgba(94,234,212,0.15)]"
                    : "bg-[#131b2e] border-[#2d3449]/40 hover:bg-[#171f33]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#5eead4]/20 text-[#5eead4]">
                      {cert.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-[#94a3b8]">{cert.year}</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#5eead4]">
                    {cert.icon || "verified"}
                  </span>
                </div>

                <h4
                  className={`text-sm font-semibold transition-colors ${
                    isSelected ? "text-[#5eead4]" : "text-[#dae2fd]"
                  }`}
                >
                  {cert.title}
                </h4>

                <p className="text-xs text-[#94a3b8] mt-0.5">{cert.issuer}</p>

                <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#94a3b8]">
                  <span className="truncate max-w-[200px] text-[#859490]">{cert.code}</span>
                  {certificationsList.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCert(cert.id);
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete credential"
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

      <form
        onSubmit={onSubmit}
        className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-[#2d3449]/50 pb-4">
          <div>
            <span className="text-xs font-mono text-[#94a3b8]">
              CREDENTIAL RECORD · {certForm.code || certForm.id}
            </span>
            <h3 className="text-lg font-semibold text-[#dae2fd]">
              Edit: {certForm.title || "Untitled Credential"}
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
              {isSaving ? "Saving..." : "Save Credential"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Certification Title</label>
            <input
              type="text"
              value={certForm.title}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Issuing Authority</label>
            <input
              type="text"
              value={certForm.issuer}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, issuer: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Credential Serial / ID</label>
            <input
              type="text"
              value={certForm.code}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, code: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Year Issued</label>
            <input
              type="text"
              value={certForm.year}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, year: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Category Tag</label>
            <input
              type="text"
              value={certForm.category}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#5eead4] focus:border-[#5eead4] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Domain Track</label>
            <input
              type="text"
              value={certForm.track}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, track: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Validity Period</label>
            <input
              type="text"
              value={certForm.validity}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, validity: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Material Icon Name</label>
            <input
              type="text"
              value={certForm.icon}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#5eead4] focus:border-[#5eead4] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">Official Registry Verification Link</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={certForm.verify_url}
              onChange={(e) => onChangeForm((prev) => ({ ...prev, verify_url: e.target.value }))}
              required
              className="flex-1 px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
            <a
              href={certForm.verify_url}
              target="_blank"
              rel="noreferrer noopener"
              className="px-3.5 py-2 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4] transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Test ↗</span>
            </a>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#94a3b8] uppercase">Lightbox Verification Description</label>
          <textarea
            rows={3}
            value={certForm.description}
            onChange={(e) =>
              onChangeForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            required
            className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-[#94a3b8] uppercase block">
            Verified Competencies &amp; Syllabi
          </label>
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[#0b1326] border border-[#2d3449]">
            {certForm.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-xs font-mono text-[#5eead4] border border-[#5eead4]/30"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => onRemoveCertSkill(skill)}
                  className="hover:text-red-400"
                >
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </span>
            ))}

            <div className="inline-flex items-center gap-1">
              <input
                type="text"
                placeholder="Add competency..."
                value={newCertSkill}
                onChange={(e) => setNewCertSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddCertSkill();
                  }
                }}
                className="bg-transparent text-xs font-mono text-[#dae2fd] px-2 py-1 focus:outline-none w-32"
              />
              <button
                type="button"
                onClick={onAddCertSkill}
                className="text-xs font-mono text-[#5eead4] hover:underline"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
