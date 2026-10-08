import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { cn } from "@/shared/utils/utils";

const BASE_CLASSNAME = "text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors";

const VARIANT_CLASSNAMES = {
  desktop:
    "relative inline-flex h-9 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-4",
  mobile:
    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
} as const;

type TNavLinkUiProps = {
  label: string;
  link?: string;
  isActive: boolean;
  isSoon: boolean;
  isDisabled: boolean;
  soonLabel: string;
  unavailableLabel: string;
  variant?: keyof typeof VARIANT_CLASSNAMES;
  onNavigate?: () => void;
};

export const NavLinkUi = ({
  label,
  link,
  isActive,
  isSoon,
  isDisabled,
  soonLabel,
  unavailableLabel,
  variant = "desktop",
  onNavigate,
}: TNavLinkUiProps) => {
  if (!link || isSoon || isDisabled) {
    return (
      <span
        aria-disabled="true"
        title={isSoon ? soonLabel : unavailableLabel}
        className={cn(BASE_CLASSNAME, VARIANT_CLASSNAMES[variant], "cursor-not-allowed text-zinc-400")}
      >
        {label}
        {isSoon && (
          <span className="rounded-[4px] bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold tracking-normal text-zinc-500">
            {soonLabel}
          </span>
        )}
      </span>
    );
  }

  return (
    <Link
      to={link}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        BASE_CLASSNAME,
        VARIANT_CLASSNAMES[variant],
        variant === "desktop" &&
          (isActive
            ? "text-blue-500 after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:rounded-full after:bg-blue-500"
            : "text-zinc-900 hover:text-blue-500"),
        variant === "mobile" &&
          (isActive ? "bg-blue-50 text-blue-500" : "text-zinc-900 hover:bg-zinc-50"),
      )}
    >
      {label}
      {variant === "mobile" && (
        <ChevronRight
          aria-hidden="true"
          className={cn("size-4", isActive ? "text-blue-500" : "text-zinc-400")}
        />
      )}
    </Link>
  );
};
