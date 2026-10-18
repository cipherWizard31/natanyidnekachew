"use client";

import { useState } from "react";

interface CredentialItem {
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
  verifyUrl: string;
  description: string;
  skills: string[];
}

const credentialsData: CredentialItem[] = [
  {
    id: "aws-csa",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    icon: "cloud_done",
    code: "AWS-PSA-9938210",
    year: "2024",
    date: "Oct 2024",
    validity: "Valid thru Oct 2027",
    track: "Cloud Architecture",
    category: "Cloud",
    status: "Active & Verified",
    verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential",
    description:
      "Demonstrates comprehensive technical proficiency in designing secure, resilient, high-performing, and cost-optimized distributed systems architectures across Amazon Web Services infrastructure.",
    skills: [
      "AWS IAM & VPC",
      "Fault Tolerant Design",
      "Multi-AZ Deployments",
      "S3 & DynamoDB",
      "Auto Scaling Groups",
      "CloudFormation / IaC",
      "Cost Optimization",
    ],
  },
  {
    id: "cncf-ckad",
    title: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    icon: "deployed_code",
    code: "CKA-2400-88192",
    year: "2024",
    date: "Feb 2024",
    validity: "Valid thru Feb 2027",
    track: "Systems Engineering",
    category: "Systems Engineering",
    status: "Active & Verified",
    verifyUrl: "https://www.cncf.io/certification/ckad/",
    description:
      "Verifies performance-based skills in designing, building, configuring, and exposing cloud-native containerized applications for production Kubernetes clusters and container runtimes.",
    skills: [
      "Pod Design & Lifecycle",
      "Service Networking & Ingress",
      "StatefulSets & PersistentVolumes",
      "Helm Charts",
      "ConfigMaps & Secrets",
      "Application Observability",
      "Multi-Container Pods",
    ],
  },
  {
    id: "uiuc-ds",
    title: "Distributed Systems & Cloud Computing Specialization",
    issuer: "Coursera / University of Illinois Urbana-Champaign",
    icon: "hub",
    code: "COURSERA-DS-77491",
    year: "2023",
    date: "Nov 2023",
    validity: "Lifetime Credential",
    track: "Backend Development",
    category: "Backend Development",
    status: "Conferred & Verified",
    verifyUrl: "https://www.coursera.org/verify/specialization",
    description:
      "Rigorous 5-course university specialization covering consensus protocols (Paxos, Raft), peer-to-peer topologies, distributed key-value storage, concurrency controls, and failure detection models.",
    skills: [
      "Consensus Protocols (Raft, Paxos)",
      "CAP Theorem & Quorums",
      "MapReduce & Spark",
      "Gossip Protocols",
      "Vector Clocks",
      "Distributed Hashing",
      "Byzantine Fault Tolerance",
    ],
  },
  {
    id: "tcm-pnpt",
    title: "Practical Network Penetration Tester (PNPT)",
    issuer: "TCM Security Academy",
    icon: "security",
    code: "PNPT-2023-4482",
    year: "2023",
    date: "Aug 2023",
    validity: "Lifetime Credential",
    track: "Cybersecurity",
    category: "Cybersecurity",
    status: "Active & Verified",
    verifyUrl: "https://certifications.tcm-sec.com/pnpt/",
    description:
      "Hands-on 5-day practical examination executing end-to-end network penetration tests, Active Directory exploitation, privilege escalation, lateral movement, and remediation reporting.",
    skills: [
      "Active Directory Attacks",
      "Network Pivoting & Tunneling",
      "Privilege Escalation",
      "OSINT & Reconnaissance",
      "Buffer Overflow Basics",
      "Mitigation & Hardening",
    ],
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CredentialItem | null>(null);

  return (
    <section
      id="certifications"
      aria-label="Certifications & Learning"
      className="mb-16 md:mb-24 scroll-mt-16 lg:scroll-mt-24"
    >
      {/* Mobile Sticky Section Header */}
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md bg-[#0b1326]/80 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:backdrop-blur-none lg:bg-transparent">
        <h2 className="text-sm uppercase tracking-widest text-[#e2e8f0] font-bold lg:sr-only flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block"></span>
          Certifications
        </h2>
      </div>

      <div className="mt-4 lg:mt-0">
        {/* Section Title Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#e2e8f0] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5eead4] text-[20px]">
              verified
            </span>
            <span>Certifications &amp; Learning</span>
          </h3>
          <span className="font-mono text-xs text-[#94a3b8] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4]"></span>
            {credentialsData.length} Verified Credentials
          </span>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 gap-3">
          {credentialsData.map((cred) => (
            <button
              key={cred.id}
              onClick={() => setSelectedCert(cred)}
              type="button"
              className="text-left w-full group relative block p-4 rounded-xl bg-[#171f33]/30 hover:bg-[#171f33]/80 border border-[#2d3449]/40 hover:border-[#5eead4]/40 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#5eead4]/50 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Icon Box */}
                  <div className="w-9 h-9 rounded-lg bg-[#5eead4]/10 border border-[#5eead4]/20 flex items-center justify-center shrink-0 text-[#5eead4] mt-0.5 group-hover:bg-[#5eead4]/20 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      {cred.icon}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-semibold text-[#e2e8f0] group-hover:text-[#5eead4] transition-colors duration-200">
                        {cred.title}
                      </h4>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#5eead4]/10 text-[#5eead4] opacity-0 group-hover:opacity-100 transition-all duration-200 inline-flex items-center gap-0.5">
                        Inspect Credential
                        <span className="material-symbols-outlined text-[13px]">
                          open_in_new
                        </span>
                      </span>
                    </div>

                    <p className="text-xs text-[#94a3b8] mt-1 flex items-center gap-2">
                      <span>{cred.issuer}</span>
                      <span className="w-1 h-1 rounded-full bg-[#94a3b8]/50"></span>
                      <span className="font-mono text-[11px] text-[#859490]">
                        {cred.code}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="font-mono text-xs text-[#94a3b8]">
                    {cred.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#5eead4]/10 text-[#5eead4] font-mono text-[11px] font-medium border border-[#5eead4]/20">
                    {cred.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* View All Credentials Link */}
        <div className="mt-4">
          <a
            href="https://linkedin.com/in/natanyidnekachew"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-[#e2e8f0] hover:text-[#5eead4] transition-colors duration-200 group"
          >
            <span>View All Credentials</span>
            <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform duration-200">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Modal / Lightbox for Credential Inspection */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cert-title"
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#060e20]/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#171f33] rounded-2xl border border-[#5eead4]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
          >
            {/* Modal Ambient Glow Top */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#5eead4]/15 via-transparent to-transparent pointer-events-none" />

            {/* Header bar */}
            <div className="relative px-6 pt-5 pb-3 flex items-center justify-between border-b border-[#222a3d] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5eead4] animate-ping" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#5eead4] font-medium">
                  Official Credential Inspection
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#222a3d] transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 space-y-5">
              {/* Certificate Document Badge Preview Card */}
              <div className="p-5 rounded-xl bg-[#131b2e] border border-[#222a3d] relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-5 text-[#5eead4] pointer-events-none">
                  <span className="material-symbols-outlined text-[180px]">
                    verified
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#5eead4]/15 border border-[#5eead4]/30 flex items-center justify-center text-[#5eead4] shrink-0">
                      <span className="material-symbols-outlined text-[28px]">
                        {selectedCert.icon}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#5eead4] font-medium">
                        {selectedCert.issuer}
                      </span>
                      <h2
                        id="modal-cert-title"
                        className="text-lg md:text-xl text-[#e2e8f0] font-bold leading-tight mt-0.5"
                      >
                        {selectedCert.title}
                      </h2>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/30 text-[#5eead4] font-semibold">
                      <span className="material-symbols-outlined text-[14px]">
                        check_circle
                      </span>
                      {selectedCert.status}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs md:text-sm text-[#bbcac5] leading-relaxed border-t border-[#222a3d] pt-3">
                  {selectedCert.description}
                </p>
              </div>

              {/* Structured Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#131b2e]/70 border border-[#222a3d]">
                  <span className="font-mono text-[11px] text-[#94a3b8] block">
                    Credential ID
                  </span>
                  <span className="font-mono text-xs text-[#e2e8f0] font-medium tracking-wide mt-0.5 block truncate">
                    {selectedCert.code}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#131b2e]/70 border border-[#222a3d]">
                  <span className="font-mono text-[11px] text-[#94a3b8] block">
                    Issued
                  </span>
                  <span className="font-mono text-xs text-[#e2e8f0] font-medium mt-0.5 block">
                    {selectedCert.date}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#131b2e]/70 border border-[#222a3d]">
                  <span className="font-mono text-[11px] text-[#94a3b8] block">
                    Validity
                  </span>
                  <span className="font-mono text-xs text-[#5eead4] font-medium mt-0.5 block">
                    {selectedCert.validity}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#131b2e]/70 border border-[#222a3d]">
                  <span className="font-mono text-[11px] text-[#94a3b8] block">
                    Domain Track
                  </span>
                  <span className="font-mono text-xs text-[#e2e8f0] font-medium mt-0.5 block truncate">
                    {selectedCert.track}
                  </span>
                </div>
              </div>

              {/* Verified Competencies */}
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] block mb-2">
                  Verified Competencies &amp; Syllabi
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-[#222a3d] border border-[#2d3449] text-[#e2e8f0] font-mono text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-[#222a3d] bg-[#131b2e]/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="font-mono text-xs text-[#859490] hidden sm:flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#5eead4]">
                  lock
                </span>
                Cryptographically signed &amp; authenticated registry
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-lg font-mono text-xs text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#222a3d] transition-colors"
                >
                  Close (Esc)
                </button>
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg font-mono text-xs font-semibold bg-[#5eead4] text-[#00675b] hover:bg-[#b5fff0] transition-all duration-200 inline-flex items-center gap-1.5 shadow-lg shadow-[#5eead4]/20 hover:shadow-[#5eead4]/40"
                >
                  <span>Verify on Official Registry</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_outward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
