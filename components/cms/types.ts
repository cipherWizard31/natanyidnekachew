// Shared types re-exported from the portfolio data layer so every CMS module
// can import from one central location instead of duplicating the import path.
export type {
  AboutData,
  ProjectData,
  ExperienceData,
  CertificationData,
  SkillCategoryData,
  ArticleData,
  TestimonialData,
} from "@/lib/portfolio";

export type CMSTab =
  | "about"
  | "projects"
  | "experience"
  | "certifications"
  | "skills"
  | "testimonials";

export interface Toast {
  type: "success" | "error";
  text: string;
}
