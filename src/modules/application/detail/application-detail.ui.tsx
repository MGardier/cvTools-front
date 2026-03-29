import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  Bookmark,
  ExternalLink,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

import { formatSalary, formatRelativePublishedDate } from "@/shared/utils/format";
import { cn } from "@/shared/utils/utils";


import { HeroCard } from "./components/hero-card";
import { MetadataStrip } from "./components/metadata-strip";
import { DescriptionTab } from "./components/description-tab";
import { NotesTab } from "./components/notes-tab";
import { HistoryTab } from "./components/history-tab";
import { TasksTab } from "./components/tasks-tab";
import { ContactSection } from "./components/contact-section";

import type { IApplication } from "@/shared/types/entity";
import type { TDetailTab, IDetailTab, IMetaItem, INote, IHistoryEvent, ITask } from "./types";

interface IApplicationDetailUiProps {
  application: IApplication;
  activeTab: TDetailTab;
  onTabChange: (tab: TDetailTab) => void;
  onBack: () => void;
  onApply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

// =============================================================================
//                          TABS CONFIG
// =============================================================================

const TABS: IDetailTab[] = [
  { id: "description", labelKey: "detail.tabs.description" },
  { id: "notes", labelKey: "detail.tabs.notes" },
  { id: "historique", labelKey: "detail.tabs.history" },
  { id: "taches", labelKey: "detail.tabs.tasks" },
];

// =============================================================================
//                    MOCK DATA (future: from backend)
// =============================================================================

const MOCK_NOTES: INote[] = [];
const MOCK_TASKS: ITask[] = [];
const MOCK_HISTORY: IHistoryEvent[] = [
  { id: 1, action: "Candidature créée", detail: "Ajoutée manuellement", date: "", time: "", icon: FileText, iconColor: "text-purple-600", iconBg: "bg-purple-50 border-purple-200" },
];

// =============================================================================
//                          SKELETON
// =============================================================================

const Skeleton = () => (
  <div className="bg-white min-h-screen">
    <nav className="w-full max-w-screen-xl mx-auto px-5 pt-6 pb-2">
      <div className="h-4 w-48 rounded bg-muted animate-pulse" />
    </nav>
    <div className="w-full max-w-screen-xl mx-auto px-5">
      {/* Hero */}
      <div className="border border-slate-200 rounded-xl px-4 py-5 md:px-8 md:py-6 mt-4">
        <div className="flex items-start gap-5">
          <div className="w-[72px] h-[72px] rounded-xl bg-muted animate-pulse shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-64 rounded bg-muted animate-pulse" />
            <div className="h-4 w-40 rounded bg-muted animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-14 rounded-full bg-muted animate-pulse" />
              <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      {/* Meta */}
      <div className="hidden md:flex border border-slate-200 rounded-xl mt-5 divide-x divide-slate-200">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 py-4">
            <div className="h-3 w-14 rounded bg-muted animate-pulse" />
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
      {/* Skills */}
      <div className="flex gap-2 mt-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-7 w-16 rounded-full bg-muted animate-pulse" />
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 w-20 rounded bg-muted animate-pulse mb-3" />
        ))}
      </div>
      {/* Content */}
      <div className="space-y-3 pt-6">
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-11/12 rounded bg-muted animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
      </div>
    </div>
  </div>
);

// =============================================================================
//                          MAIN COMPONENT
// =============================================================================

export const ApplicationDetailUi = ({
  application,
  activeTab,
  onTabChange,
  onBack,
  onApply,
  onEdit,
  onDelete,
  onToggleFavorite,
}: IApplicationDetailUiProps) => {
  const { t } = useTranslation("application");

  const salary = formatSalary(
    application.salaryMin ?? null,
    application.salaryMax ?? null,
    t("detail.notProvided"),
  );

  const metaItems: IMetaItem[] = [
    {
      labelKey: "detail.meta.experience",
      value: application.experience ? t(`experience.${application.experience}`) : t("detail.notProvided"),
    },
    {
      labelKey: "detail.meta.contract",
      value: t(`contractType.${application.contractType}`),
    },
    {
      labelKey: "detail.meta.remote",
      value: application.remotePolicy ? t(`remotePolicy.${application.remotePolicy}`) : t("detail.notProvided"),
    },
    {
      labelKey: "detail.meta.compatibility",
      value: application.compatibility ? t(`compatibility.${application.compatibility}`) : t("detail.notProvided"),
    },
    {
      labelKey: "detail.meta.published",
      value: application.publishedAt
        ? formatRelativePublishedDate(application.publishedAt)
        : t("detail.notProvided"),
    },
  ];

  // Enrich the first history event with real creation date
  const history: IHistoryEvent[] = MOCK_HISTORY.map((event) =>
    event.id === 1
      ? {
          ...event,
          date: new Intl.DateTimeFormat("fr", { day: "numeric", month: "long", year: "numeric" }).format(new Date(application.createdAt)),
          time: new Intl.DateTimeFormat("fr", { hour: "2-digit", minute: "2-digit" }).format(new Date(application.createdAt)),
        }
      : event
  );

  const skills = application.skills ?? [];
  const contacts = application.contacts ?? [];

  return (
    <div className="bg-white min-h-screen">

      {/* ── 1. Breadcrumb ── */}
      <nav className="w-full max-w-screen-xl mx-auto px-5 pt-6 pb-2">
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t("detail.breadcrumb.list")}</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium truncate max-w-[400px]">
            {application.title}
          </span>
        </div>
      </nav>

      <div className="w-full max-w-screen-xl mx-auto px-5">

        {/* ── 2. Hero card ── */}
        <div className="mt-4">
          <HeroCard application={application} salary={salary} t={t} />
        </div>

        {/* ── 3. Metadata strip ── */}
        <MetadataStrip items={metaItems} t={t} />

        {/* ── 4. Skills + Actions ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs md:text-sm px-2.5 py-0.5 md:px-3"
                >
                  {skill.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-400">{t("detail.noSkills")}</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onApply}
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">{t("detail.applyNow")}</span>
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onToggleFavorite}
              className="p-2 rounded-lg border border-slate-200 text-blue-400 hover:text-blue-500 transition-colors"
            >
              <Bookmark className={cn("w-4 h-4", application.isFavorite && "fill-current")} />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="p-2 rounded-lg border border-slate-200 text-red-400 hover:text-red-500 hover:border-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 5. Tabs ── */}
        <div className="mt-8">
          <div className="sticky top-0 z-10 bg-white pb-px">
            <div className="flex gap-6 border-b border-slate-200">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative pb-3 text-sm font-medium transition-colors",
                    activeTab === tab.id ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {t(tab.labelKey)}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="pt-6 pb-8">
            {activeTab === "description" && (
              <DescriptionTab
                description={application.description ?? t("detail.noDescription")}
              />
            )}
            {activeTab === "notes" && <NotesTab notes={MOCK_NOTES} t={t} />}
            {activeTab === "historique" && <HistoryTab events={history} />}
            {activeTab === "taches" && <TasksTab initialTasks={MOCK_TASKS} t={t} />}
          </div>
        </div>

        {/* ── 6. Contacts ── */}
        {  contacts.length > 0 &&       <ContactSection contacts={contacts} t={t} />}
  
      </div>
    </div>
  );
};

ApplicationDetailUi.Skeleton = Skeleton;
