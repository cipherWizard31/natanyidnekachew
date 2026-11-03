"use client";

import { useState } from "react";

interface InteractiveStarRatingProps {
  value: number;
  onChange: (val: number) => void;
  size?: "sm" | "md" | "lg";
}

/**
 * Interactive star rating component supporting half-star increments (e.g. 0.5, 1, 1.5 ... 5.0)
 * Allows users to hover and click left/right half of each star just like on Yelp/Google Reviews/Tripadvisor.
 */
export function InteractiveStarRating({
  value,
  onChange,
  size = "md",
}: InteractiveStarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const activeValue = hoverValue !== null ? hoverValue : value;

  const starSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const computedVal = isHalf ? starIndex - 0.5 : starIndex;
    setHoverValue(computedVal);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const computedVal = isHalf ? starIndex - 0.5 : starIndex;
    onChange(computedVal);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="inline-flex items-center gap-1.5"
        onMouseLeave={() => setHoverValue(null)}
      >
        {[1, 2, 3, 4, 5].map((starIndex) => {
          // Fill state for this star: full, half, or empty
          const isFull = activeValue >= starIndex;
          const isHalf = !isFull && activeValue >= starIndex - 0.5;

          return (
            <div
              key={starIndex}
              className={`relative cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 ${starSizes[size]}`}
              onMouseMove={(e) => handleMouseMove(e, starIndex)}
              onClick={(e) => handleClick(e, starIndex)}
              role="button"
              tabIndex={0}
              aria-label={`${starIndex} stars`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(starIndex);
                }
              }}
            >
              {/* Background empty star */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-full h-full text-slate-700"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>

              {/* Full or Half fill overlay */}
              {(isFull || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                    style={{ minWidth: size === "lg" ? "2.25rem" : size === "md" ? "1.75rem" : "1.25rem" }}
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
        <span className="text-amber-400 font-semibold text-sm">
          {activeValue.toFixed(1)}
        </span>
        <span className="text-slate-500">out of 5 stars</span>
        <span className="text-[11px] text-slate-600">
          (click left/right half for .5 ratings)
        </span>
      </div>
    </div>
  );
}

/**
 * Display-only Star Rating for viewing reviews (renders 5 stars with full, half, and empty fill)
 */
export function StarRatingDisplay({
  rating,
  className = "w-3.5 h-3.5",
  showValue = false,
}: {
  rating: number;
  className?: string;
  showValue?: boolean;
}) {
  const normalized = Math.min(Math.max(rating || 5, 0), 5);

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFull = normalized >= starIndex;
          const isHalf = !isFull && normalized >= starIndex - 0.5;

          return (
            <div key={starIndex} className={`relative inline-block ${className}`}>
              {/* Background empty star */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-full h-full text-slate-700"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>

              {/* Full or Half fill */}
              {(isFull || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full text-amber-400"
                    style={{ minWidth: "100%" }}
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="font-mono text-xs font-semibold text-amber-400 ml-1">
          {normalized.toFixed(1)}
        </span>
      )}
    </div>
  );
}
