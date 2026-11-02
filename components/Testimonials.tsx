"use client";

import { useState } from "react";
import type { TestimonialData } from "@/lib/portfolio";
import { Arrow } from "./Arrow";

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    relationship: "",
    content: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/cms/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMessage({
          type: "success",
          text: "Thank you! Your testimonial has been submitted for review. It will appear on the site once approved.",
        });
        setFormData({
          name: "",
          role: "",
          company: "",
          relationship: "",
          content: "",
          rating: 5,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: json.error || "Failed to submit testimonial. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Network error occurred while submitting.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Testimonials
        </h2>
      </div>

      <div>
        {testimonials.length > 0 ? (
          <ul className="group/list">
            {testimonials.map((t) => (
              <li key={t.id} className="mb-12">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  {/* Spotlight background card on hover */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                  {/* Left Column: Relationship / Date / Rating */}
                  <header
                    className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                    aria-label={t.relationship || "Colleague"}
                  >
                    <span>{t.relationship || "Endorsement"}</span>
                    <div className="flex items-center gap-0.5 mt-1 text-teal-300">
                      {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </header>

                  {/* Right Column: Content & Author */}
                  <div className="z-10 sm:col-span-6">
                    <p className="text-sm leading-normal text-slate-300 italic">
                      &ldquo;{t.content}&rdquo;
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-teal-300 shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm leading-snug text-slate-200">
                          {t.name}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">
                          {t.role}
                          {t.company ? ` · ${t.company}` : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/40 text-sm text-slate-500 mb-8">
            No approved testimonials yet. Be the first to leave a review!
          </div>
        )}

        {/* Action Link to Leave Testimonial */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
              setStatusMessage(null);
            }}
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold group/link text-base cursor-pointer"
          >
            <span>
              Write a Testimonial{" "}
              <span className="inline-block">
                for Natan
                <Arrow />
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 md:p-8 text-slate-300 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-teal-300">
                  Client &amp; Colleague Endorsement
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">
                  Leave a Testimonial
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-100 p-1 rounded-md text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {statusMessage && (
              <div
                className={`mt-4 p-4 rounded-lg text-xs font-mono border ${
                  statusMessage.type === "success"
                    ? "bg-teal-400/10 text-teal-300 border-teal-400/30"
                    : "bg-red-950/40 text-red-300 border-red-800/40"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-teal-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide mb-1.5">
                    Your Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g. VP of Engineering"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-teal-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. HyperScale Labs"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-teal-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide mb-1.5">
                    Working Relationship
                  </label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) =>
                      setFormData({ ...formData, relationship: e.target.value })
                    }
                    placeholder="e.g. Managed Natan directly"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-teal-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide mb-1.5">
                  Testimonial / Endorsement *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Share your experience working with Natan on distributed systems, backend engineering, or system design..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:border-teal-300 focus:outline-none resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-3">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <label
                      key={num}
                      className="flex items-center gap-1 cursor-pointer text-xs font-mono"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={num}
                        checked={formData.rating === num}
                        onChange={() => setFormData({ ...formData, rating: num })}
                        className="accent-teal-400"
                      />
                      <span>{num} ★</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-teal-400 text-slate-900 font-mono text-xs font-bold hover:bg-teal-300 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
