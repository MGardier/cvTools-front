import type { ReactNode } from "react";

import { cn } from "@/shared/utils/utils";

import { themes } from "../lib/themes";
import { TestTheme, type TTestTheme } from "../types";

type TMiniSkillCardSize = "md" | "sm";

type TMiniSkillCardProps = {
  name: string;
  /** Icon slot — accepts an inline SVG, a Lucide icon or any ReactNode. */
  children: ReactNode;
  theme?: TTestTheme;
  size?: TMiniSkillCardSize;
};

const SIZE_CLASSES: Record<TMiniSkillCardSize, { wrapper: string; iconBox: string }> = {
  md: {
    wrapper: "gap-1 px-1.5 py-2",
    iconBox: "h-6 w-6",
  },
  sm: {
    wrapper: "gap-0.5 px-1 py-1.5",
    iconBox: "h-5 w-5",
  },
};

/**
 * Compact rounded "chip" used inside hero/section cards to surface a skill
 * (icon on top, name below). Theme drives the hover accent so the chip
 * blends with its parent card. Use `size="sm"` to make it more compact in
 * lower-tier cards.
 */
export const MiniSkillCard = ({
  name,
  children,
  theme = TestTheme.BLUE,
  size = "md",
}: TMiniSkillCardProps) => {
  const t = themes[theme];
  const s = SIZE_CLASSES[size];
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-zinc-100 bg-white/70 transition-colors",
        s.wrapper,
        t.miniHover,
      )}
    >
      <span className={cn("flex items-center justify-center", s.iconBox)}>
        {children}
      </span>
      <span className="truncate text-[10px] font-medium text-zinc-600">
        {name}
      </span>
    </div>
  );
};
