import { getPortfolioData } from "@/lib/portfolio";
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

  return (
    <CMSClient initialAbout={data.about} initialProjects={data.projects} />
  );
}
