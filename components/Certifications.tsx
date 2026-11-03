"use client";

import { useState } from "react";
import type { CertificationData } from "@/lib/portfolio";
import { Arrow } from "./Arrow";

interface CertificationsProps {
  certifications: CertificationData[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<CertificationData | null>(null);

  return (
    <section
      id="certifications"
      aria-label="Certifications & credentials"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Certifications
        </h2>
      </div>

      <div>
        <ol className="group/list">
          {certifications.map((cred) => (
            <li key={cred.id} className="mb-10">
              <div
                onClick={() => setSelectedCert(cred)}
                className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
              >
                {/* Spotlight background */}
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                {/* Left Year/Date header */}
                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                  aria-label={cred.year || cred.date}
                >
                  {cred.year || cred.date}
                </header>

                {/* Right Content */}
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 transition-colors text-base">
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      <span>
                        {cred.title} ·{" "}
                        <span className="inline-block text-slate-400 group-hover:text-teal-300">
                          {cred.issuer}
                        </span>
                      </span>
                    </span>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-slate-400">
                    {cred.description}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-xs font-mono text-slate-500">
                    {cred.status && (
                      <span className="text-teal-300/80">● {cred.status}</span>
                    )}
                  </div>

                  {/* Skills */}
                  {cred.skills && cred.skills.length > 0 && (
                    <ul className="mt-2 flex flex-wrap" aria-label="Skills covered">
                      {cred.skills.map((skill) => (
                        <li key={skill} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            {skill}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Verification Modal dialog */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-lg border border-slate-700 bg-slate-900 p-6 text-slate-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-teal-300">
                  {selectedCert.issuer}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-slate-100 p-1 rounded-md"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {selectedCert.description}
            </p>

            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Issued:</span>
                <span className="text-slate-300">{selectedCert.date || selectedCert.year}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Status:</span>
                <span className="text-teal-300">{selectedCert.status || "Active"}</span>
              </div>
            </div>

            {selectedCert.verify_url && (
              <div className="mt-6">
                <a
                  href={selectedCert.verify_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 font-medium text-sm text-teal-300 hover:text-teal-200"
                >
                  <span>Verify Credential</span>
                  <Arrow external />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
