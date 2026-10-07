import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/shared/components/ui/collapsible";
import { cn } from "@/shared/utils/utils";

interface IHomeSectionCardProps {
  icon: ReactNode;
  title: string;
  count?: number;
  headerActions?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Collapsible section card for the connected home (mobile + desktop).
 * Header (icon + title + count + chevron) toggles the body; optional
 * headerActions sit on the right, outside the trigger.
 */
export const HomeSectionCard = ({
  icon,
  title,
  count,
  headerActions,
  defaultOpen = true,
  children,
}: IHomeSectionCardProps) => (
  <Collapsible
    defaultOpen={defaultOpen}
    className="rounded-2xl border border-zinc-200 bg-white"
  >
    <div className="flex items-center justify-between gap-2 p-4 md:p-5">
      <CollapsibleTrigger className="group flex items-center gap-2 flex-1 min-w-0 text-left">
        <span className="text-blue-400 shrink-0">{icon}</span>
        <h2 className="text-[14px] md:text-[16px] font-medium text-zinc-900 truncate">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-medium shrink-0">
            {count}
          </span>
        )}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200",
            "group-data-[state=open]:rotate-180",
          )}
        />
      </CollapsibleTrigger>

      {headerActions && (
        <div className="flex items-center gap-2 shrink-0">{headerActions}</div>
      )}
    </div>

    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
      <div className="px-4 md:px-5 pb-4 md:pb-5">{children}</div>
    </CollapsibleContent>
  </Collapsible>
);
