import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/utils/utils";

import { themes } from "../lib/themes";
import { TestTheme, type TTestTheme } from "../types";

type TBentoCardProps = {
  children: ReactNode;
  onClick: () => void;
  action?: string;
  theme?: TTestTheme;
  className?: string;
};

export const BentoCard = ({
  children,
  onClick,
  action = "Découvrir",
  theme = TestTheme.BLUE,
  className,
}: TBentoCardProps) => {
  const t = themes[theme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50/50 p-5 text-left shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.02]",
        t.cardHover,
        className,
      )}
    >
      <div>{children}</div>
      <div className="mt-4 flex justify-end">
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
