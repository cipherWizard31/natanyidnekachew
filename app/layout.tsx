import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natan Yidnekachew",
  description:
    "Full Stack Developer & Back End Specialist with expertise in distributed systems, high-throughput microservices, and resilient server architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark h-full antialiased`}
    >
      <body className="bg-slate-900 leading-relaxed text-slate-400 selection:bg-teal-300 selection:text-teal-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
