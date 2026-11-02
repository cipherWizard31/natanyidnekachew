import { getPortfolioData, getAllTestimonials } from "@/lib/portfolio";
import CMSClient from "@/components/CMSClient";

export const metadata = {
  title: "CMS Studio | Natan Yidnekachew",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSPage() {
  const data = getPortfolioData();
  const allTestimonials = getAllTestimonials();

  return (
    <CMSClient
      initialAbout={data.about}
      initialProjects={data.projects}
      initialExperiences={data.experiences}
      initialCertifications={data.certifications}
      initialSkillCategories={data.skillCategories}
      initialArticles={data.articles}
      initialTestimonials={allTestimonials}
    />
  );
}
