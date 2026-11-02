"use client";

import { useState } from "react";
import type { TestimonialData } from "@/lib/portfolio";

interface TestimonialsModuleProps {
  testimonials: TestimonialData[];
  onRefresh: () => void;
  setToast: (toast: { type: "success" | "error"; text: string } | null) => void;
}

export default function TestimonialsModule({
  testimonials,
  onRefresh,
  setToast,
}: TestimonialsModuleProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const filtered = testimonials.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const handleUpdateStatus = async (
    t: TestimonialData,
    newStatus: "approved" | "rejected" | "pending"
  ) => {
    setActionLoadingId(t.id);
    try {
      const res = await fetch("/api/cms/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...t,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          text: `Testimonial from "${t.name}" marked as ${newStatus.toUpperCase()}!`,
        });
        onRefresh();
      } else {
        setToast({ type: "error", text: data.error || "Failed to update status." });
      }
    } catch {
      setToast({ type: "error", text: "Network error updating status." });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/cms/testimonials?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToast({ type: "success", text: `Deleted testimonial from "${name}".` });
        onRefresh();
      } else {
        setToast({ type: "error", text: data.error || "Failed to delete testimonial." });
      }
    } catch {
      setToast({ type: "error", text: "Error deleting testimonial." });
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingCount = testimonials.filter((t) => t.status === "pending").length;
  const approvedCount = testimonials.filter((t) => t.status === "approved").length;

  return (
    <div className="space-y-6">
      {/* Header & Quick stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-[#171f33]/60 border border-[#2d3449]/60">
        <div>
          <h2 className="text-lg font-semibold text-[#dae2fd] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5eead4] text-[22px]">
              rate_review
            </span>
            <span>Testimonials &amp; Endorsement Reviews</span>
          </h2>
          <p className="text-xs font-mono text-[#94a3b8] mt-1">
            Review submissions sent from the website and approve them to display live.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs capitalize transition-all ${
                filter === status
                  ? "bg-[#5eead4]/20 text-[#5eead4] border border-[#5eead4]/50 font-bold"
                  : "bg-[#0b1326] text-[#94a3b8] hover:text-[#dae2fd] border border-[#2d3449]"
              }`}
            >
              {status}
              {status === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
              {status === "approved" && (
                <span className="ml-1.5 text-xs text-[#5eead4]/70">({approvedCount})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-[#0b1326]/60 border border-[#2d3449]/40 text-slate-400 font-mono text-sm">
            No testimonials found in the &ldquo;{filter}&rdquo; filter tab.
          </div>
        ) : (
          filtered.map((t) => {
            const isPending = t.status === "pending";
            const isApproved = t.status === "approved";
            const isRejected = t.status === "rejected";
            const isLoading = actionLoadingId === t.id;

            return (
              <div
                key={t.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isPending
                    ? "bg-amber-950/10 border-amber-500/40 shadow-sm"
                    : isApproved
                    ? "bg-[#171f33]/40 border-[#2d3449]/70"
                    : "bg-red-950/10 border-red-900/30 opacity-75"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#222a3d] border border-[#5eead4]/30 flex items-center justify-center font-bold text-sm text-[#5eead4]">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#dae2fd] flex items-center gap-2">
                          <span>{t.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono text-[11px] uppercase font-bold ${
                              isApproved
                                ? "bg-teal-400/10 text-teal-300 border border-teal-400/30"
                                : isPending
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "bg-red-500/20 text-red-300 border border-red-500/30"
                            }`}
                          >
                            ● {t.status}
                          </span>
                        </h3>
                        <p className="text-xs font-mono text-[#94a3b8]">
                          {t.role} {t.company && `at ${t.company}`}{" "}
                          {t.relationship && `(${t.relationship})`}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-slate-300 italic pt-2 pl-2 border-l-2 border-[#5eead4]/30 leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                      <span>Rating: {t.rating ?? 5} / 5 ★</span>
                      {t.created_at && <span>Submitted: {t.created_at}</span>}
                    </div>
                  </div>

                  {/* Action Buttons: Approve, Reject, Delete */}
                  <div className="flex items-center gap-2 shrink-0 md:self-center">
                    {!isApproved && (
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleUpdateStatus(t, "approved")}
                        className="px-3.5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                        <span>Approve Live</span>
                      </button>
                    )}

                    {!isRejected && (
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleUpdateStatus(t, "rejected")}
                        className="px-3 py-2 rounded-xl bg-[#222a3d] hover:bg-amber-950/50 text-amber-300 border border-amber-500/30 font-mono text-xs transition-colors flex items-center gap-1 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          block
                        </span>
                        <span>Reject</span>
                      </button>
                    )}

                    {isApproved && (
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleUpdateStatus(t, "pending")}
                        className="px-3 py-2 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-slate-300 font-mono text-xs transition-colors flex items-center gap-1 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          undo
                        </span>
                        <span>Unpublish</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-2 rounded-xl text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/40 transition-colors"
                      title="Delete Testimonial"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
