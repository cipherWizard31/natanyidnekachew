"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AboutData, ProjectData, ExperienceData } from "@/lib/portfolio";

interface CMSClientProps {
  initialAbout: AboutData;
  initialProjects: ProjectData[];
  initialExperiences: ExperienceData[];
}

export default function CMSClient({
  initialAbout,
  initialProjects,
  initialExperiences,
}: CMSClientProps) {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<"projects" | "experience" | "about">("experience");

  // About form state
  const [aboutData, setAboutData] = useState<AboutData>(initialAbout);
  const [isSavingAbout, setIsSavingAbout] = useState(false);

  // Projects state
  const [projectsList, setProjectsList] = useState<ProjectData[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    initialProjects.length > 0 ? initialProjects[0].id : null
  );

  const selectedProject =
    projectsList.find((p) => p.id === selectedProjectId) ||
    projectsList[0] || {
      id: 0,
      title: "",
      url: "",
      description: "",
      stars: "0",
      forks: "0",
      skills: [],
      image_url: "/uploads/4866c795c48c7e8f3ffd46fe9e20876d.webp",
      image_alt: "",
      display_order: projectsList.length + 1,
    };

  const [projectForm, setProjectForm] = useState<ProjectData>(selectedProject);
  const [newProjectTag, setNewProjectTag] = useState("");
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Experience state
  const [experiencesList, setExperiencesList] = useState<ExperienceData[]>(initialExperiences);
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(
    initialExperiences.length > 0 ? initialExperiences[0].id : null
  );

  const selectedExperience =
    experiencesList.find((e) => e.id === selectedExperienceId) ||
    experiencesList[0] || {
      id: 0,
      period: "2024 — PRESENT",
      role: "",
      company: "",
      company_url: "https://github.com/cipherWizard31",
      tagline: "",
      description: "",
      skills: [],
      display_order: experiencesList.length + 1,
    };

  const [experienceForm, setExperienceForm] = useState<ExperienceData>(selectedExperience);
  const [newExpSkill, setNewExpSkill] = useState("");
  const [isSavingExperience, setIsSavingExperience] = useState(false);

  // Feedback Toast
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // -------------------------------------------------------------
  // EXPERIENCE HANDLERS
  // -------------------------------------------------------------
  const handleSelectExperience = (exp: ExperienceData) => {
    setSelectedExperienceId(exp.id);
    setExperienceForm(exp);
    setToast(null);
  };

  const handleCreateNewExperience = () => {
    const newExp: ExperienceData = {
      id: 0,
      period: "2024 — PRESENT",
      role: "Backend Engineer",
      company: "Tech Systems",
      company_url: "https://github.com/cipherWizard31",
      tagline: "High-Performance Systems & Distributed Architectures",
      description:
        "Spearheaded distributed backend services, asynchronous pipelines, and low-latency storage algorithms with zero downtime.",
      skills: ["Go", "Distributed Systems", "gRPC", "Docker"],
      display_order: experiencesList.length + 1,
    };
    setSelectedExperienceId(0);
    setExperienceForm(newExp);
    setToast({
      type: "success",
      text: "New experience role draft created. Fill in the details and click Save Experience.",
    });
  };

  const handleAddExpSkill = () => {
    if (!newExpSkill.trim()) return;
    if (!experienceForm.skills.includes(newExpSkill.trim())) {
      setExperienceForm((prev) => ({
        ...prev,
        skills: [...prev.skills, newExpSkill.trim()],
      }));
    }
    setNewExpSkill("");
  };

  const handleRemoveExpSkill = (skillToRemove: string) => {
    setExperienceForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingExperience(true);
    setToast(null);

    try {
      const res = await fetch("/api/cms/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceForm),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          text: "Experience role saved and synced to SQLite database!",
        });

        const refreshedRes = await fetch("/api/cms/experiences");
        const refreshed = await refreshedRes.json();
        if (refreshed.success) {
          setExperiencesList(refreshed.data);
          if (experienceForm.id === 0 && refreshed.data.length > 0) {
            const newlyAdded = refreshed.data[refreshed.data.length - 1];
            setSelectedExperienceId(newlyAdded.id);
            setExperienceForm(newlyAdded);
          }
        }
      } else {
        setToast({ type: "error", text: data.error || "Failed to save experience." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "Server error saving experience." });
    } finally {
      setIsSavingExperience(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience role?")) return;
    try {
      const res = await fetch(`/api/cms/experiences?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        const updated = experiencesList.filter((e) => e.id !== id);
        setExperiencesList(updated);
        if (updated.length > 0) {
          setSelectedExperienceId(updated[0].id);
          setExperienceForm(updated[0]);
        }
        setToast({ type: "success", text: "Experience role deleted from database." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "Failed to delete experience." });
    }
  };

  // -------------------------------------------------------------
  // PROJECT HANDLERS
  // -------------------------------------------------------------
  const handleSelectProject = (project: ProjectData) => {
    setSelectedProjectId(project.id);
    setProjectForm(project);
    setToast(null);
  };

  const handleCreateNewProject = () => {
    const newProj: ProjectData = {
      id: 0,
      title: "New Distributed System",
      url: "https://github.com/cipherWizard31",
      description: "Brief architecture summary of the high-throughput engine...",
      stars: "10+",
      forks: "2",
      skills: ["Go", "Distributed Systems"],
      image_url: "/uploads/4866c795c48c7e8f3ffd46fe9e20876d.webp",
      image_alt: "New project architecture",
      display_order: projectsList.length + 1,
    };
    setSelectedProjectId(0);
    setProjectForm(newProj);
    setToast({
      type: "success",
      text: "New project draft initialized. Fill in details and click Save Project.",
    });
  };

  const handleAddProjectTag = () => {
    if (!newProjectTag.trim()) return;
    if (!projectForm.skills.includes(newProjectTag.trim())) {
      setProjectForm((prev) => ({
        ...prev,
        skills: [...prev.skills, newProjectTag.trim()],
      }));
    }
    setNewProjectTag("");
  };

  const handleRemoveProjectTag = (tagToRemove: string) => {
    setProjectForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((t) => t !== tagToRemove),
    }));
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setToast(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProjectForm((prev) => ({
          ...prev,
          image_url: data.url,
        }));
        setToast({
          type: "success",
          text: `Image uploaded with hash name: ${data.fileName}`,
        });
      } else {
        setToast({ type: "error", text: data.error || "Image upload failed." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "Network error uploading image." });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProject(true);
    setToast(null);

    try {
      const res = await fetch("/api/cms/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          text: "Project saved and synced to SQLite database!",
        });

        const refreshedRes = await fetch("/api/cms/projects");
        const refreshed = await refreshedRes.json();
        if (refreshed.success) {
          setProjectsList(refreshed.data);
          if (projectForm.id === 0 && refreshed.data.length > 0) {
            const newlyAdded = refreshed.data[refreshed.data.length - 1];
            setSelectedProjectId(newlyAdded.id);
            setProjectForm(newlyAdded);
          }
        }
      } else {
        setToast({ type: "error", text: data.error || "Failed to save project." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "Server error saving project." });
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/cms/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        const updated = projectsList.filter((p) => p.id !== id);
        setProjectsList(updated);
        if (updated.length > 0) {
          setSelectedProjectId(updated[0].id);
          setProjectForm(updated[0]);
        }
        setToast({ type: "success", text: "Project deleted from database." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "Failed to delete project." });
    }
  };

  // -------------------------------------------------------------
  // ABOUT HANDLERS
  // -------------------------------------------------------------
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAbout(true);
    setToast(null);

    try {
      const res = await fetch("/api/cms/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutData),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          text: "About section & telemetry saved to SQLite database!",
        });
      } else {
        setToast({ type: "error", text: data.error || "Failed to save About." });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", text: "Server error saving About section." });
    } finally {
      setIsSavingAbout(false);
    }
  };

  const currentSaveHandler =
    activeTab === "experience"
      ? handleSaveExperience
      : activeTab === "projects"
      ? handleSaveProject
      : handleSaveAbout;

  const currentSaveLoading =
    activeTab === "experience"
      ? isSavingExperience
      : activeTab === "projects"
      ? isSavingProject
      : isSavingAbout;

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans antialiased flex flex-col selection:bg-[#5eead4] selection:text-[#00675b]">
      {/* Top Header */}
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
              Sync: <span className="text-[#5eead4] font-medium">SQLite Live</span>
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
            onClick={currentSaveHandler}
            disabled={currentSaveLoading}
            type="button"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#5eead4] hover:bg-[#b5fff0] text-[#00675b] text-xs font-mono font-semibold transition-all shadow-[0_0_16px_-4px_rgba(94,234,212,0.3)] active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              {currentSaveLoading ? "sync" : "cloud_upload"}
            </span>
            <span>
              {currentSaveLoading
                ? "Saving..."
                : activeTab === "experience"
                ? "Save Experience"
                : activeTab === "projects"
                ? "Save Project"
                : "Save About"}
            </span>
          </button>
        </div>
      </header>

      {/* Navigation Module Tabs */}
      <div className="border-b border-[#2d3449]/60 bg-[#060e20]/60 px-6 py-2.5 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <nav className="flex items-center gap-1.5">
            {/* Experience Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("experience");
                setToast(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-2 ${
                activeTab === "experience"
                  ? "bg-[#222a3d] text-[#5eead4] font-medium shadow-sm border border-[#5eead4]/30"
                  : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Experience ({experiencesList.length})</span>
            </button>

            {/* Projects Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("projects");
                setToast(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-2 ${
                activeTab === "projects"
                  ? "bg-[#222a3d] text-[#5eead4] font-medium shadow-sm border border-[#5eead4]/30"
                  : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Projects ({projectsList.length})</span>
            </button>

            {/* About Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("about");
                setToast(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-2 ${
                activeTab === "about"
                  ? "bg-[#222a3d] text-[#5eead4] font-medium shadow-sm border border-[#5eead4]/30"
                  : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>About Section</span>
            </button>

            {/* Inactive placeholders */}
            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 text-[#94a3b8]/40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Certifications (4)</span>
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
            <span>Module: {activeTab.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {toast && (
          <div
            className={`mb-6 p-4 rounded-xl font-mono text-xs flex items-center justify-between border ${
              toast.type === "success"
                ? "bg-[#5eead4]/10 text-[#5eead4] border-[#5eead4]/30"
                : "bg-red-950/40 text-red-300 border-red-800/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                {toast.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{toast.text}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-[#94a3b8] hover:text-[#dae2fd]">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* ============================================================= */}
        {/* EXPERIENCE MODULE TAB                                         */}
        {/* ============================================================= */}
        {activeTab === "experience" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Career Positions List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-[#dae2fd]">Career Positions</h2>
                  <span className="text-xs font-mono text-[#94a3b8]">{experiencesList.length} entries</span>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNewExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4] transition-colors border border-[#5eead4]/30"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>+ New Role</span>
                </button>
              </div>

              {/* Roles List */}
              <div className="space-y-3">
                {experiencesList.map((exp) => {
                  const isSelected = selectedExperienceId === exp.id;
                  return (
                    <div
                      key={exp.id}
                      onClick={() => handleSelectExperience(exp)}
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
                        <span className="text-xs font-mono text-[#94a3b8]">#{exp.id}</span>
                      </div>

                      <h4
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? "text-[#5eead4]" : "text-[#dae2fd]"
                        }`}
                      >
                        {exp.role} · {exp.company}
                      </h4>

                      <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">{exp.tagline}</p>

                      <p className="text-xs text-[#bbcac5] mt-2 line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#94a3b8]">
                        <div className="flex flex-wrap gap-1">
                          {exp.skills.slice(0, 3).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-[#0b1326] text-[10px]">
                              {s}
                            </span>
                          ))}
                          {exp.skills.length > 3 && (
                            <span className="text-[10px]">+{exp.skills.length - 3}</span>
                          )}
                        </div>

                        {experiencesList.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteExperience(exp.id);
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete role"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              delete
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Edit Form */}
            <form
              onSubmit={handleSaveExperience}
              className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#2d3449]/50 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#94a3b8]">
                    {experienceForm.id === 0 ? "NEW ROLE ENTRY" : `EXPERIENCE RECORD · #${experienceForm.id}`}
                  </span>
                  <h3 className="text-lg font-semibold text-[#dae2fd]">
                    Edit: {experienceForm.role || "Untitled Position"}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const orig = experiencesList.find((e) => e.id === selectedExperienceId);
                      if (orig) setExperienceForm(orig);
                      setToast(null);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-[#2d3449] hover:bg-[#171f33] text-xs font-mono text-[#dae2fd] transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingExperience}
                    className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50"
                  >
                    {isSavingExperience ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* Role & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={experienceForm.role}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={experienceForm.company}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({ ...prev, company: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>
              </div>

              {/* Time Period & Tagline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Time Period (e.g. 2024 — PRESENT)
                  </label>
                  <input
                    type="text"
                    value={experienceForm.period}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({ ...prev, period: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Tagline Sub-Title
                  </label>
                  <input
                    type="text"
                    value={experienceForm.tagline}
                    onChange={(e) =>
                      setExperienceForm((prev) => ({ ...prev, tagline: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#94a3b8] uppercase">
                  Role Engineering Summary &amp; Key Achievements
                </label>
                <textarea
                  rows={4}
                  value={experienceForm.description}
                  onChange={(e) =>
                    setExperienceForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Technologies Used */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94a3b8] uppercase block">
                  Technologies Used &amp; Key Tools
                </label>
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[#0b1326] border border-[#2d3449]">
                  {experienceForm.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-xs font-mono text-[#5eead4] border border-[#5eead4]/30"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExpSkill(skill)}
                        className="hover:text-red-400"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          close
                        </span>
                      </button>
                    </span>
                  ))}

                  <div className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="Add tech..."
                      value={newExpSkill}
                      onChange={(e) => setNewExpSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddExpSkill();
                        }
                      }}
                      className="bg-transparent text-xs font-mono text-[#dae2fd] px-2 py-1 focus:outline-none w-24"
                    />
                    <button
                      type="button"
                      onClick={handleAddExpSkill}
                      className="text-xs font-mono text-[#5eead4] hover:underline"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================= */}
        {/* PROJECTS TAB CONTENT                                          */}
        {/* ============================================================= */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Projects List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-[#dae2fd]">Systems &amp; Repositories</h2>
                  <span className="text-xs font-mono text-[#94a3b8]">{projectsList.length} entries</span>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNewProject}
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
                      onClick={() => handleSelectProject(project)}
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
                        <span className="text-xs font-mono text-[#94a3b8]">
                          ★ {project.stars}
                        </span>
                      </div>

                      <h4
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? "text-[#5eead4]" : "text-[#dae2fd]"
                        }`}
                      >
                        {project.title}
                      </h4>

                      <p className="text-xs text-[#bbcac5] mt-1 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#94a3b8]">
                        <span className="truncate max-w-[200px]">{project.url}</span>
                        {projectsList.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project.id);
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete project"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              delete
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Edit Form */}
            <form
              onSubmit={handleSaveProject}
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
                  <button
                    type="button"
                    onClick={() => {
                      const orig = projectsList.find((p) => p.id === selectedProjectId);
                      if (orig) setProjectForm(orig);
                      setToast(null);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-[#2d3449] hover:bg-[#171f33] text-xs font-mono text-[#dae2fd] transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProject}
                    className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50"
                  >
                    {isSavingProject ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Repository Link
                  </label>
                  <input
                    type="url"
                    value={projectForm.url}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, url: e.target.value }))
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#94a3b8] uppercase">
                  Architecture Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    GitHub Stars Count
                  </label>
                  <input
                    type="text"
                    value={projectForm.stars}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, stars: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#94a3b8] uppercase">
                    Forks Count
                  </label>
                  <input
                    type="text"
                    value={projectForm.forks}
                    onChange={(e) =>
                      setProjectForm((prev) => ({ ...prev, forks: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94a3b8] uppercase block">
                  Technologies &amp; Tags
                </label>
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[#0b1326] border border-[#2d3449]">
                  {projectForm.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-xs font-mono text-[#5eead4] border border-[#5eead4]/30"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProjectTag(skill)}
                        className="hover:text-red-400"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          close
                        </span>
                      </button>
                    </span>
                  ))}

                  <div className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={newProjectTag}
                      onChange={(e) => setNewProjectTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddProjectTag();
                        }
                      }}
                      className="bg-transparent text-xs font-mono text-[#dae2fd] px-2 py-1 focus:outline-none w-24"
                    />
                    <button
                      type="button"
                      onClick={handleAddProjectTag}
                      className="text-xs font-mono text-[#5eead4] hover:underline"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#2d3449]/40">
                <label className="text-xs font-mono text-[#94a3b8] uppercase block">
                  Project Thumbnail Architecture Asset (Hashed Storage)
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================= */}
        {/* ABOUT TAB CONTENT                                             */}
        {/* ============================================================= */}
        {activeTab === "about" && (
          <form
            onSubmit={handleSaveAbout}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Live Preview */}
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
                  <p className="line-clamp-4">{aboutData.paragraph1}</p>
                  <p className="line-clamp-4">{aboutData.paragraph2}</p>
                  <p className="line-clamp-3">{aboutData.paragraph3}</p>
                </div>

                {/* Preview Telemetry Widget */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#131b2e] border border-[#2d3449] shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#222a3d]">
                    <span className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
                      Runtime Node
                    </span>
                    <span className="font-mono text-[10px] text-[#5eead4] font-medium">
                      {aboutData.runtime_version}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 pt-1 text-left">
                    <div>
                      <span className="font-mono text-[10px] text-[#94a3b8] block">
                        Target QPS
                      </span>
                      <span className="font-mono text-xs text-[#e2e8f0] font-semibold">
                        {aboutData.target_qps}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#94a3b8] block">
                        Consensus
                      </span>
                      <span className="font-mono text-xs text-[#e2e8f0] font-semibold">
                        {aboutData.consensus}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#94a3b8] block">
                        p99 Latency
                      </span>
                      <span className="font-mono text-xs text-[#5eead4] font-semibold">
                        {aboutData.p99_latency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: About Form */}
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
                    onClick={() => setAboutData(initialAbout)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#2d3449] hover:bg-[#171f33] text-xs font-mono text-[#dae2fd] transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingAbout}
                    className="px-4 py-1.5 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-all disabled:opacity-50"
                  >
                    {isSavingAbout ? "Saving..." : "Save Section"}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide">
                  Paragraph 1: Background &amp; Origins
                </label>
                <textarea
                  name="paragraph1"
                  rows={3}
                  value={aboutData.paragraph1}
                  onChange={(e) =>
                    setAboutData((prev) => ({ ...prev, paragraph1: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide">
                  Paragraph 2: Engineering Philosophy &amp; Tooling
                </label>
                <textarea
                  name="paragraph2"
                  rows={4}
                  value={aboutData.paragraph2}
                  onChange={(e) =>
                    setAboutData((prev) => ({ ...prev, paragraph2: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#94a3b8] uppercase tracking-wide">
                  Paragraph 3: Current Research &amp; Interests
                </label>
                <textarea
                  name="paragraph3"
                  rows={3}
                  value={aboutData.paragraph3}
                  onChange={(e) =>
                    setAboutData((prev) => ({ ...prev, paragraph3: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
                />
              </div>

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
                      value={aboutData.runtime_version}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          runtime_version: e.target.value,
                        }))
                      }
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
                      value={aboutData.target_qps}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          target_qps: e.target.value,
                        }))
                      }
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
                      value={aboutData.consensus}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          consensus: e.target.value,
                        }))
                      }
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
                      value={aboutData.p99_latency}
                      onChange={(e) =>
                        setAboutData((prev) => ({
                          ...prev,
                          p99_latency: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#5eead4] focus:border-[#5eead4] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
