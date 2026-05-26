import { Clock, type LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils/utils";

import { themes } from "../lib/themes";
import { TestTheme, type TTestTheme } from "../types";

type TCardHeaderProps = {
  icon: LucideIcon;
  label: string;
  description?: string;
  readTime?: string;
  theme?: TTestTheme;
  className?: string;
};

export const CardHeader = ({
  icon: Icon,
  label,
  description,
  readTime,
  theme = TestTheme.BLUE,
  className,
}: TCardHeaderProps) => {
  const t = themes[theme];
  return (
    <div className={cn("mb-4 flex items-start justify-between", className)}>
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            t.iconBg,
          )}
        >
          <Icon className={cn("h-4 w-4", t.iconText)} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-medium text-zinc-900 md:text-[17px]">
            {label}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-zinc-400">{description}</p>
          )}
        </div>
      </div>
      {readTime && (
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 font-mono text-[11px] text-zinc-400 transition-colors duration-300",
            t.accentHover,
          )}
        >
          <Clock className="h-3 w-3" />
          {readTime}
        </span>
      )}
    </div>
  );
};
