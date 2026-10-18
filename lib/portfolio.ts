import { getDb } from "./db";

export interface ProfileData {
  id: number;
  name: string;
  title: string;
  summary: string;
  avatar_url: string;
  resume_url: string;
}

export interface SocialLinkData {
  id: number;
  name: string;
  icon: string;
  href: string;
  label: string;
  display_order: number;
}

export interface AboutData {
  id: number;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  runtime_version: string;
  target_qps: string;
  consensus: string;
  p99_latency: string;
}

export interface ProjectData {
  id: number;
  title: string;
  url: string;
  description: string;
  stars: string;
  forks: string;
  skills: string[];
  image_url: string;
  image_alt: string;
  display_order: number;
}

export interface ExperienceData {
  id: number;
  period: string;
  role: string;
  company: string;
  company_url?: string;
  tagline: string;
  description: string;
  skills: string[];
  display_order: number;
}

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  icon: string;
  code: string;
  year: string;
  date: string;
  validity: string;
  track: string;
  category: string;
  status: string;
  verify_url: string;
  description: string;
  skills: string[];
  display_order: number;
}

export interface SkillCategoryData {
  id: number;
  title: string;
  skills: string[];
  display_order: number;
}

export interface ArticleData {
  id: number;
  year: string;
  title: string;
  publication: string;
  url: string;
  read_time: string;
  display_order: number;
}

export interface PhilosophyData {
  id: number;
  principle_tag: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  footer_text: string;
  copyright: string;
}

export interface PortfolioDatabaseContent {
  profile: ProfileData;
  socialLinks: SocialLinkData[];
  about: AboutData;
  projects: ProjectData[];
  experiences: ExperienceData[];
  certifications: CertificationData[];
  skillCategories: SkillCategoryData[];
  articles: ArticleData[];
  philosophy: PhilosophyData;
}

export function getPortfolioData(): PortfolioDatabaseContent {
  const db = getDb();

  const profile = db.prepare("SELECT * FROM profile LIMIT 1").get() as ProfileData;
  const socialLinks = db
    .prepare("SELECT * FROM social_links ORDER BY display_order ASC")
    .all() as SocialLinkData[];

  const about = db.prepare("SELECT * FROM about LIMIT 1").get() as AboutData;

  const rawProjects = db
    .prepare("SELECT * FROM projects ORDER BY display_order ASC")
    .all() as (Omit<ProjectData, "skills"> & { skills: string })[];

  const projects: ProjectData[] = rawProjects.map((p) => ({
    ...p,
    skills: JSON.parse(p.skills || "[]"),
  }));

  const rawExperiences = db
    .prepare("SELECT * FROM experiences ORDER BY display_order ASC")
    .all() as (Omit<ExperienceData, "skills"> & { skills: string })[];

  const experiences: ExperienceData[] = rawExperiences.map((e) => ({
    ...e,
    skills: JSON.parse(e.skills || "[]"),
  }));

  const rawCertifications = db
    .prepare("SELECT * FROM certifications ORDER BY display_order ASC")
    .all() as (Omit<CertificationData, "skills"> & { skills: string })[];

  const certifications: CertificationData[] = rawCertifications.map((c) => ({
    ...c,
    skills: JSON.parse(c.skills || "[]"),
  }));

  const rawSkills = db
    .prepare("SELECT * FROM skill_categories ORDER BY display_order ASC")
    .all() as (Omit<SkillCategoryData, "skills"> & { skills: string })[];

  const skillCategories: SkillCategoryData[] = rawSkills.map((s) => ({
    ...s,
    skills: JSON.parse(s.skills || "[]"),
  }));

  const articles = db
    .prepare("SELECT * FROM articles ORDER BY display_order ASC")
    .all() as ArticleData[];

  const philosophy = db
    .prepare("SELECT * FROM philosophy LIMIT 1")
    .get() as PhilosophyData;

  return {
    profile,
    socialLinks,
    about,
    projects,
    experiences,
    certifications,
    skillCategories,
    articles,
    philosophy,
  };
}
