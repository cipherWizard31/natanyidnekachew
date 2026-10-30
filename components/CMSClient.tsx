"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  AboutData,
  ProjectData,
  ExperienceData,
  CertificationData,
  SkillCategoryData,
  ArticleData,
  PhilosophyData,
} from "@/lib/portfolio";
import AboutModule from "./cms/modules/AboutModule";
import ProjectsModule from "./cms/modules/ProjectsModule";
import ExperienceModule from "./cms/modules/ExperienceModule";
import CertificationsModule from "./cms/modules/CertificationsModule";
import SkillsModule from "./cms/modules/SkillsModule";
import PhilosophyModule from "./cms/modules/PhilosophyModule";
import type { CMSTab } from "./cms/types";

interface CMSClientProps {
  initialAbout: AboutData;
  initialProjects: ProjectData[];
  initialExperiences: ExperienceData[];
  initialCertifications: CertificationData[];
  initialSkillCategories: SkillCategoryData[];
  initialArticles: ArticleData[];
  initialPhilosophy: PhilosophyData;
}

export default function CMSClient({
  initialAbout,
  initialProjects,
  initialExperiences,
  initialCertifications,
  initialSkillCategories,
  initialArticles,
  initialPhilosophy,
}: CMSClientProps) {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<CMSTab>("skills");

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

  // Certifications state
  const [certificationsList, setCertificationsList] = useState<CertificationData[]>(initialCertifications);
  const [selectedCertId, setSelectedCertId] = useState<string | null>(
    initialCertifications.length > 0 ? initialCertifications[0].id : null
  );

  const selectedCert =
    certificationsList.find((c) => c.id === selectedCertId) ||
    certificationsList[0] || {
      id: "new-cert",
      title: "",
      issuer: "",
      icon: "verified",
      code: "",
      year: "2024",
      date: "Oct 2024",
      validity: "Valid thru 2027",
      track: "Cloud Architecture",
      category: "Cloud",
      status: "Active & Verified",
      verify_url: "https://linkedin.com",
      description: "",
      skills: [],
      display_order: certificationsList.length + 1,
    };

  const [certForm, setCertForm] = useState<CertificationData>(selectedCert);
  const [newCertSkill, setNewCertSkill] = useState("");
  const [isSavingCert, setIsSavingCert] = useState(false);

  // Skills & Technical Arsenal state
  const [skillCategoriesList, setSkillCategoriesList] = useState<SkillCategoryData[]>(initialSkillCategories);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({});
  const [isSavingSkills, setIsSavingSkills] = useState(false);

  // Articles state
  const [articlesList, setArticlesList] = useState<ArticleData[]>(initialArticles);
  const [newArticleForm, setNewArticleForm] = useState<Partial<ArticleData>>({
    title: "",
    publication: "Substack / Distributed Musings",
    url: "https://cipherwizard.substack.com",
    year: "2026",
    read_time: "7 min read",
  });
  const [isSavingArticles, setIsSavingArticles] = useState(false);

  // Philosophy state
  const [philosophyForm, setPhilosophyForm] = useState<PhilosophyData>(initialPhilosophy);
  const [isSavingPhilosophy, setIsSavingPhilosophy] = useState(false);

  // Toast
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // -------------------------------------------------------------
  // SKILLS & TECHNICAL ARSENAL HANDLERS
  // -------------------------------------------------------------
  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) return;
    try {
      const res = await fetch("/api/cms/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newCategoryTitle.trim(),
          skills: [],
          display_order: skillCategoriesList.length + 1,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewCategoryTitle("");
        const refreshed = await (await fetch("/api/cms/skills")).json();
        if (refreshed.success) setSkillCategoriesList(refreshed.data);
        setToast({ type: "success", text: "New skill category created." });
      }
    } catch {
      setToast({ type: "error", text: "Failed to create category." });
    }
  };

  const handleAddSkillToCat = async (categoryId: number) => {
    const skillName = (newSkillInputs[categoryId] || "").trim();
    if (!skillName) return;

    const cat = skillCategoriesList.find((c) => c.id === categoryId);
    if (!cat) return;

    const updatedSkills = [...cat.skills, skillName];
    try {
      const res = await fetch("/api/cms/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...cat,
          skills: updatedSkills,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSkillCategoriesList((prev) =>
          prev.map((c) => (c.id === categoryId ? { ...c, skills: updatedSkills } : c))
        );
        setNewSkillInputs((prev) => ({ ...prev, [categoryId]: "" }));
        setToast({ type: "success", text: `Added "${skillName}" to ${cat.title}` });
      }
    } catch {
      setToast({ type: "error", text: "Failed to add skill." });
    }
  };

  const handleRemoveSkillFromCat = async (categoryId: number, skillName: string) => {
    const cat = skillCategoriesList.find((c) => c.id === categoryId);
    if (!cat) return;

    const updatedSkills = cat.skills.filter((s) => s !== skillName);
    try {
      const res = await fetch("/api/cms/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...cat,
          skills: updatedSkills,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSkillCategoriesList((prev) =>
          prev.map((c) => (c.id === categoryId ? { ...c, skills: updatedSkills } : c))
        );
        setToast({ type: "success", text: `Removed "${skillName}"` });
      }
    } catch {
      setToast({ type: "error", text: "Failed to remove skill." });
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/cms/skills?id=${categoryId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSkillCategoriesList((prev) => prev.filter((c) => c.id !== categoryId));
        setToast({ type: "success", text: "Skill category deleted." });
      }
    } catch {
      setToast({ type: "error", text: "Failed to delete category." });
    }
  };

  // -------------------------------------------------------------
  // WRITING & ARTICLES HANDLERS
  // -------------------------------------------------------------
  const handleSaveNewArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleForm.title?.trim()) return;

    setIsSavingArticles(true);
    try {
      const res = await fetch("/api/cms/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newArticleForm,
          display_order: articlesList.length + 1,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const refreshed = await (await fetch("/api/cms/articles")).json();
        if (refreshed.success) setArticlesList(refreshed.data);
        setNewArticleForm({
          title: "",
          publication: "Substack / Distributed Musings",
          url: "https://cipherwizard.substack.com",
          year: `${new Date().getFullYear()}`,
          read_time: "7 min read",
        });
        setToast({ type: "success", text: "Article publication added!" });
      }
    } catch {
      setToast({ type: "error", text: "Failed to save article." });
    } finally {
      setIsSavingArticles(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm("Delete this article entry?")) return;
    try {
      const res = await fetch(`/api/cms/articles?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setArticlesList((prev) => prev.filter((a) => a.id !== id));
        setToast({ type: "success", text: "Article removed." });
      }
    } catch {
      setToast({ type: "error", text: "Failed to delete article." });
    }
  };

  // -------------------------------------------------------------
  // PHILOSOPHY & PARAGRAPH HANDLERS
  // -------------------------------------------------------------
  const handleSavePhilosophy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPhilosophy(true);
    setToast(null);

    try {
      const res = await fetch("/api/cms/philosophy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(philosophyForm),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          text: "Philosophy principles & colophon saved to SQLite!",
        });
      } else {
        setToast({ type: "error", text: data.error || "Failed to save philosophy." });
      }
    } catch {
      setToast({ type: "error", text: "Server error saving philosophy." });
    } finally {
      setIsSavingPhilosophy(false);
    }
  };

  // -------------------------------------------------------------
  // CERTIFICATIONS HANDLERS
  // -------------------------------------------------------------
  const handleSelectCert = (cert: CertificationData) => {
    setSelectedCertId(cert.id);
    setCertForm(cert);
    setToast(null);
  };

  const handleCreateNewCert = () => {
    const newId = `cert-${Date.now()}`;
    const newCert: CertificationData = {
      id: newId,
      title: "New Verified Credential",
      issuer: "Certification Authority",
      icon: "workspace_premium",
      code: `CERT-${new Date().getFullYear()}-001`,
      year: `${new Date().getFullYear()}`,
      date: `Jan ${new Date().getFullYear()}`,
      validity: "Lifetime Credential",
      track: "Systems Engineering",
      category: "Cloud",
      status: "Active & Verified",
      verify_url: "https://cp.certmetrics.com",
      description:
        "Validates technical proficiency in distributed architecture design, containerization, and security.",
      skills: ["Distributed Systems", "Cloud Architecture"],
      display_order: certificationsList.length + 1,
    };
    setSelectedCertId(newId);
    setCertForm(newCert);
    setToast({
      type: "success",
      text: "New credential draft created. Fill in details and click Save Credential.",
    });
  };

  const handleAddCertSkill = () => {
    if (!newCertSkill.trim()) return;
    if (!certForm.skills.includes(newCertSkill.trim())) {
      setCertForm((prev) => ({
        ...prev,
        skills: [...prev.skills, newCertSkill.trim()],
      }));
    }
    setNewCertSkill("");
  };

  const handleRemoveCertSkill = (skillToRemove: string) => {
    setCertForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCert(true);
    setToast(null);

    try {
      const res = await fetch("/api/cms/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certForm),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          text: "Certification saved and synced to SQLite database!",
        });

        const refreshedRes = await fetch("/api/cms/certifications");
        const refreshed = await refreshedRes.json();
        if (refreshed.success) {
          setCertificationsList(refreshed.data);
          const found = refreshed.data.find((c: CertificationData) => c.id === certForm.id);
          if (found) {
            setSelectedCertId(found.id);
            setCertForm(found);
          }
        }
      } else {
        setToast({ type: "error", text: data.error || "Failed to save certification." });
      }
    } catch {
      setToast({ type: "error", text: "Server error saving certification." });
    } finally {
      setIsSavingCert(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!confirm("Are you sure you want to delete this credential?")) return;
    try {
      const res = await fetch(`/api/cms/certifications?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        const updated = certificationsList.filter((c) => c.id !== id);
        setCertificationsList(updated);
        if (updated.length > 0) {
          setSelectedCertId(updated[0].id);
          setCertForm(updated[0]);
        }
        setToast({ type: "success", text: "Certification deleted from database." });
      }
    } catch {
      setToast({ type: "error", text: "Failed to delete certification." });
    }
  };

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
      text: "New experience role draft created.",
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
          text: "Experience role saved and synced to SQLite!",
        });

        const refreshed = await (await fetch("/api/cms/experiences")).json();
        if (refreshed.success) {
          setExperiencesList(refreshed.data);
          if (experienceForm.id === 0 && refreshed.data.length > 0) {
            const newlyAdded = refreshed.data[refreshed.data.length - 1];
            setSelectedExperienceId(newlyAdded.id);
            setExperienceForm(newlyAdded);
          }
        }
      }
    } catch {
      setToast({ type: "error", text: "Server error saving experience." });
    } finally {
      setIsSavingExperience(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      const res = await fetch(`/api/cms/experiences?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setExperiencesList((prev) => prev.filter((e) => e.id !== id));
        setToast({ type: "success", text: "Role deleted." });
      }
    } catch {
      setToast({ type: "error", text: "Failed to delete role." });
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
      text: "New project draft initialized.",
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
      }
    } catch {
      setToast({ type: "error", text: "Error uploading image." });
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
        const refreshed = await (await fetch("/api/cms/projects")).json();
        if (refreshed.success) {
          setProjectsList(refreshed.data);
        }
      }
    } catch {
      setToast({ type: "error", text: "Server error saving project." });
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/cms/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjectsList((prev) => {
          const updated = prev.filter((p) => p.id !== id);
          if (selectedProjectId === id) {
            const nextSelected = updated.length > 0 ? updated[0] : null;
            setSelectedProjectId(nextSelected ? nextSelected.id : null);
            if (nextSelected) {
              setProjectForm(nextSelected);
            }
          }
          return updated;
        });
        setToast({ type: "success", text: "Project deleted." });
      }
    } catch {
      setToast({ type: "error", text: "Failed to delete project." });
    }
  };

  // -------------------------------------------------------------
  // ABOUT HANDLER
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
          text: "About section & telemetry saved to SQLite!",
        });
      }
    } catch {
      setToast({ type: "error", text: "Server error saving About section." });
    } finally {
      setIsSavingAbout(false);
    }
  };

  // Determine active save handler
  const currentSaveHandler =
    activeTab === "skills"
      ? (e: any) => e.preventDefault()
      : activeTab === "philosophy"
        ? handleSavePhilosophy
        : activeTab === "certifications"
          ? handleSaveCert
          : activeTab === "experience"
            ? handleSaveExperience
            : activeTab === "projects"
              ? handleSaveProject
              : handleSaveAbout;

  const currentSaveLoading =
    activeTab === "philosophy"
      ? isSavingPhilosophy
      : activeTab === "certifications"
        ? isSavingCert
        : activeTab === "experience"
          ? isSavingExperience
          : activeTab === "projects"
            ? isSavingProject
            : isSavingAbout;

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans antialiased flex flex-col selection:bg-[#5eead4] selection:text-[#00675b]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-[#2d3449]/60 bg-[#060e20]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5eead4] animate-pulse shadow-[0_0_12px_#5eead4]" />
            <span className="font-mono text-xs sm:text-sm tracking-wide font-medium text-[#dae2fd] whitespace-nowrap">
              NATAN YIDNEKACHEW{" "}
              <span className="text-[#5eead4] font-semibold">//</span> CMS STUDIO
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#131b2e] border border-[#2d3449]/60 shrink-0 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#5eead4] shadow-[0_0_6px_#5eead4]" />
            <span className="font-mono text-[11px] text-[#bbcac5] whitespace-nowrap">
              Sync: <span className="text-[#5eead4] font-medium">SQLite Live</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-[#94a3b8] hover:text-[#dae2fd] hover:bg-[#131b2e] border border-transparent hover:border-[#2d3449]/60 transition-all whitespace-nowrap"
          >
            <span>View Live Site</span>
            <span className="material-symbols-outlined text-[15px]">north_east</span>
          </Link>

          {activeTab !== "skills" && (
            <button
              onClick={currentSaveHandler}
              disabled={currentSaveLoading}
              type="button"
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#5eead4] hover:bg-[#b5fff0] text-[#00675b] text-xs font-mono font-semibold transition-all shadow-[0_0_18px_-4px_rgba(94,234,212,0.35)] active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">
                {currentSaveLoading ? "sync" : "cloud_upload"}
              </span>
              <span>
                {currentSaveLoading
                  ? "Saving..."
                  : `Save ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Navigation Module Tabs */}
      <div className="border-b border-[#2d3449]/60 bg-[#060e20]/80 px-4 sm:px-6 py-2.5 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full md:w-auto">
            {/* About Tab — matches portfolio order: 1st */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("about");
                setToast(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "about"
                ? "bg-[#1d273d] text-[#5eead4] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-[#5eead4]/40"
                : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]/70 border border-transparent"
                }`}
            >
              <span className="material-symbols-outlined text-[16px] shrink-0">badge</span>
              <span className="whitespace-nowrap">About Section</span>
            </button>

            {/* Philosophy Tab — headline next to About tab: 2nd */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("philosophy");
                setToast(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "philosophy"
                ? "bg-[#1d273d] text-[#5eead4] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-[#5eead4]/40"
                : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]/70 border border-transparent"
                }`}
            >
              <span className="material-symbols-outlined text-[16px] shrink-0">psychology</span>
              <span className="whitespace-nowrap">Philosophy</span>
            </button>

            {/* Projects Tab — matches portfolio order: 3rd */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("projects");
                setToast(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "projects"
                ? "bg-[#1d273d] text-[#5eead4] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-[#5eead4]/40"
                : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]/70 border border-transparent"
                }`}
            >
              <span className="material-symbols-outlined text-[16px] shrink-0">terminal</span>
              <span className="whitespace-nowrap">Projects ({projectsList.length})</span>
            </button>

            {/* Experience Tab — matches portfolio order: 4th */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("experience");
                setToast(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "experience"
                ? "bg-[#1d273d] text-[#5eead4] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-[#5eead4]/40"
                : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]/70 border border-transparent"
                }`}
            >
              <span className="material-symbols-outlined text-[16px] shrink-0">history_edu</span>
              <span className="whitespace-nowrap">Experience ({experiencesList.length})</span>
            </button>

            {/* Certifications Tab — matches portfolio order: 5th */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("certifications");
                setToast(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "certifications"
                ? "bg-[#1d273d] text-[#5eead4] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-[#5eead4]/40"
                : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]/70 border border-transparent"
                }`}
            >
              <span className="material-symbols-outlined text-[16px] shrink-0">verified</span>
              <span className="whitespace-nowrap">Certifications ({certificationsList.length})</span>
            </button>

            {/* Technical Arsenal & Writing Tab — matches portfolio order: 6th */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("skills");
                setToast(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "skills"
                ? "bg-[#1d273d] text-[#5eead4] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-[#5eead4]/40"
                : "text-[#bbcac5] hover:text-[#dae2fd] hover:bg-[#131b2e]/70 border border-transparent"
                }`}
            >
              <span className="material-symbols-outlined text-[16px] shrink-0">memory</span>
              <span className="whitespace-nowrap">Technical Arsenal</span>
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#94a3b8] pl-4 border-l border-[#2d3449]/40 shrink-0">
            <span className="text-[#5eead4]">●</span>
            <span className="whitespace-nowrap">Module: {activeTab.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {toast && (
          <div
            className={`mb-6 p-4 rounded-xl font-mono text-xs flex items-center justify-between border ${toast.type === "success"
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
        {/* COMPARTMENTALIZED MODULE VIEWS                                */}
        {/* ============================================================= */}
        {activeTab === "about" && (
          <AboutModule
            aboutData={aboutData}
            initialAbout={initialAbout}
            isSaving={isSavingAbout}
            onChange={(updated) => setAboutData(updated)}
            onDiscard={() => {
              setAboutData(initialAbout);
              setToast(null);
            }}
            onSubmit={handleSaveAbout}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsModule
            projectsList={projectsList}
            projectForm={projectForm}
            selectedProjectId={selectedProjectId}
            newProjectTag={newProjectTag}
            isSaving={isSavingProject}
            isUploadingImage={isUploadingImage}
            onSelect={handleSelectProject}
            onCreate={handleCreateNewProject}
            onFormChange={(updated) => setProjectForm(updated)}
            onTagChange={(val) => setNewProjectTag(val)}
            onAddTag={handleAddProjectTag}
            onRemoveTag={handleRemoveProjectTag}
            onImageChange={handleImageFileChange}
            onSubmit={handleSaveProject}
            onDiscard={() => {
              const orig = projectsList.find((p) => p.id === selectedProjectId);
              if (orig) setProjectForm(orig);
              setToast(null);
            }}
            onDelete={handleDeleteProject}
          />
        )}

        {activeTab === "experience" && (
          <ExperienceModule
            experiencesList={experiencesList}
            experienceForm={experienceForm}
            selectedExperienceId={selectedExperienceId}
            newExpSkill={newExpSkill}
            isSaving={isSavingExperience}
            onSelect={handleSelectExperience}
            onCreate={handleCreateNewExperience}
            onFormChange={(updated) => setExperienceForm(updated)}
            onSkillInputChange={(val) => setNewExpSkill(val)}
            onAddSkill={handleAddExpSkill}
            onRemoveSkill={handleRemoveExpSkill}
            onSubmit={handleSaveExperience}
            onDiscard={() => {
              const orig = experiencesList.find((e) => e.id === selectedExperienceId);
              if (orig) setExperienceForm(orig);
              setToast(null);
            }}
            onDelete={handleDeleteExperience}
          />
        )}

        {activeTab === "certifications" && (
          <CertificationsModule
            certificationsList={certificationsList}
            certForm={certForm}
            selectedCertId={selectedCertId}
            newCertSkill={newCertSkill}
            isSaving={isSavingCert}
            onSelectCert={handleSelectCert}
            onCreateNewCert={handleCreateNewCert}
            onDeleteCert={handleDeleteCert}
            onChangeForm={setCertForm}
            onDiscard={() => {
              const orig = certificationsList.find((c) => c.id === selectedCertId);
              if (orig) setCertForm(orig);
              setToast(null);
            }}
            onSubmit={handleSaveCert}
            setNewCertSkill={setNewCertSkill}
            onAddCertSkill={handleAddCertSkill}
            onRemoveCertSkill={handleRemoveCertSkill}
          />
        )}

        {activeTab === "skills" && (
          <SkillsModule
            skillCategoriesList={skillCategoriesList}
            newCategoryTitle={newCategoryTitle}
            newSkillInputs={newSkillInputs}
            articlesList={articlesList}
            newArticleForm={newArticleForm}
            isSavingArticles={isSavingArticles}
            setNewCategoryTitle={setNewCategoryTitle}
            setNewSkillInputs={setNewSkillInputs}
            setNewArticleForm={setNewArticleForm}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onAddSkillToCat={handleAddSkillToCat}
            onRemoveSkillFromCat={handleRemoveSkillFromCat}
            onSaveNewArticle={handleSaveNewArticle}
            onDeleteArticle={handleDeleteArticle}
          />
        )}

        {activeTab === "philosophy" && (
          <PhilosophyModule
            philosophyForm={philosophyForm}
            isSaving={isSavingPhilosophy}
            onChangeForm={setPhilosophyForm}
            onSubmit={handleSavePhilosophy}
          />
        )}
      </main>
    </div>
  );
}
