import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/utils/utils";

import { themes } from "../lib/themes";
import { TestTheme, type TTestTheme } from "../types";

type THeroBentoCardProps = {
  children: ReactNode;
  onClick: () => void;
  action?: string;
  theme?: TTestTheme;
  className?: string;
};

/**
 * "Featured" version of {@link BentoCard} used for the two hero cards
 * (Expériences pro + Compétences techniques) on the hub.
 *
 * Differences vs the baseline BentoCard:
 *  - Tinted blue-pale gradient background
 *  - Accented blue border
 *  - Subtle halo blur in the top-right corner
 *  - Animated pulse dot in the top-right corner
 *
 * Combined, these make the two hero cards stand out from the other four cards
 * (Projects / Soft skills / Education / Passions) without using any banner or
 * text badge.
 */
export const HeroBentoCard = ({
  children,
  onClick,
  action = "Découvrir",
  theme = TestTheme.BLUE,
  className,
}: THeroBentoCardProps) => {
  const t = themes[theme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/20 p-5 text-left shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.02]",
        t.cardHover,
        className,
      )}
    >
      {/* Halo blur */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

      {/* Animated pulse dot */}
      <span className="absolute top-3 right-3 z-10 flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
      </span>

      <div className="relative">{children}</div>
      <div className="relative mt-4 flex justify-end">
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors duration-300",
            t.accentHover,
          )}
        >
          {action}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
};
