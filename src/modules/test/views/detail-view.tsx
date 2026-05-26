import { ArrowLeft, ChevronRight, Layers } from "lucide-react";

import { cn } from "@/shared/utils/utils";

import { CANDIDATE } from "../data/candidate";
import { SECTIONS } from "../lib/sections";
import { themes } from "../lib/themes";
import type { TSectionId } from "../types";

type TDetailViewProps = {
  sectionId: TSectionId;
  onBack: () => void;
  onNavigate: (id: TSectionId) => void;
};

export const DetailView = ({ sectionId, onBack, onNavigate }: TDetailViewProps) => {
  const meta = SECTIONS[sectionId];
  const Icon = meta.icon;
  const t = themes[meta.theme];

  const otherSectionIds = (Object.keys(SECTIONS) as TSectionId[]).filter(
    (id) => id !== sectionId,
  );

  return (
    <div className="min-h-screen bg-zinc-50 antialiased">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-400" />
          </button>
          <div className="h-5 w-px shrink-0 bg-zinc-200" />
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-400">
            <span className="text-[9px] font-semibold text-white">
              {CANDIDATE.firstName[0]}
              {CANDIDATE.lastName[0]}
            </span>
          </div>
          <span className="truncate text-[13px] font-medium text-zinc-900">
            {CANDIDATE.firstName} {CANDIDATE.lastName}
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
          <div
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
              t.iconBg,
            )}
          >
            <Icon className={cn("h-3 w-3", t.iconText)} />
          </div>
          <span className="truncate text-[13px] text-zinc-500">{meta.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                t.iconBg,
              )}
            >
              <Icon className={cn("h-5 w-5", t.iconText)} />
            </div>
            <h2 className="text-[17px] font-medium text-zinc-900">{meta.label}</h2>
          </div>

          <div className="py-12 text-center md:py-16">
            <div
              className={cn(
                "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl opacity-30",
                t.iconBg,
              )}
            >
              <Layers className={cn("h-6 w-6", t.iconText)} />
            </div>
            <p className="text-sm text-zinc-500">On itère cette section ensemble</p>
            <p className="mt-1 text-xs text-zinc-400">La navigation est fonctionnelle</p>
          </div>
        </div>

        {/* Quick nav */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-medium text-zinc-400">Continuer l'exploration</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {otherSectionIds.map((id) => {
              const s = SECTIONS[id];
              const st = themes[s.theme];
              const SIcon = s.icon;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-left transition-all duration-200 hover:shadow-sm"
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                      st.iconBg,
                    )}
                  >
                    <SIcon className={cn("h-3 w-3", st.iconText)} />
                  </div>
                  <span className="truncate text-[11px] font-medium text-zinc-600 md:text-xs">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
