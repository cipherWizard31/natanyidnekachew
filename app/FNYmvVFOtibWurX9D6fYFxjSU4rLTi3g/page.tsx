import { getPortfolioData } from "@/lib/portfolio";
import CMSAboutClient from "@/components/CMSAboutClient";

export const metadata = {
  title: "CMS Studio | Natan Yidnekachew",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSPage() {
  const data = getPortfolioData();

  return <CMSAboutClient initialAbout={data.about} />;
}
