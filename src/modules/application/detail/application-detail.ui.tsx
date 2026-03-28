import { useTranslation } from "react-i18next";
import {
  Building2,
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Calendar,
  ArrowLeft,
  Wifi,
  Mail,
  Phone,
  Target,
  ExternalLink,
  Monitor,
  CircleDot,
  Pencil,
  Bookmark,
  Trash2,
  MessageSquare,
  ListChecks,
  FileText,
  Send,
  ArrowRightLeft,
} from "lucide-react";

import { ApplicationStatusBadge } from "@/modules/application/components/application-status-badge";
import { formatSalary } from "@/shared/utils/format";

import type { IApplication } from "@/shared/types/entity";
import type { ReactNode } from "react";

interface IApplicationDetailUiProps {
  application: IApplication;
  onBack: () => void;
  onApply: () => void;
}

/* ── Compact sidebar info item ── */

interface IInfoItemProps {
  icon: ReactNode;
  label: string;
  value?: ReactNode;
}

 
const MOCK_HISTORY = [
  {
    id: 1,
    action: "Statut changé",
    detail: "Passé de « À postuler » à « Postulé »",
    date: "27 mars 2026",
    time: "14:30",
    icon: ArrowRightLeft,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200",
    dotBg: "bg-blue-100",
  },
  {
    id: 2,
    action: "Candidature envoyée",
    detail: "Postulé via France Travail",
    date: "25 mars 2026",
    time: "10:15",
    icon: Send,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50 border-sky-200",
    dotBg: "bg-sky-100",
  },
  {
    id: 3,
    action: "Note ajoutée",
    detail: "« Très bonne fiche de poste, correspond bien à mon profil... »",
    date: "25 mars 2026",
    time: "09:45",
    icon: MessageSquare,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 border-amber-200",
    dotBg: "bg-amber-100",
  },
  {
    id: 4,
    action: "Tâche terminée",
    detail: "Adapter le CV pour ce poste",
    date: "24 mars 2026",
    time: "18:20",
    icon: ListChecks,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200",
    dotBg: "bg-emerald-100",
  },
  {
    id: 5,
    action: "Candidature créée",
    detail: "Ajoutée depuis France Travail",
    date: "24 mars 2026",
    time: "16:00",
    icon: FileText,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-200",
    dotBg: "bg-purple-100",
  },
];
 
 
const InfoItem = ({ icon, label, value }: IInfoItemProps) => (
  <li className="flex items-center gap-3 py-2">
    <span className="text-sky-600 shrink-0">{icon}</span>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-slate-400 leading-none">{label}</p>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-0.5 truncate">
        {value ?? "—"}
      </div>
    </div>
  </li>
);

/* ── Section heading ── */

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
    {children}
  </h5>
);

/* ── Skeleton ── */

const Skeleton = () => (
  <div className="min-h-screen pt-20 md:pt-28">
    <div className="w-full max-w-screen-xl mx-auto px-5">
      <div className="mb-10">
        <div className="h-4 w-36 rounded bg-muted animate-pulse mb-6" />
        <div className="h-8 w-72 mx-auto rounded bg-muted animate-pulse" />
      </div>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
        <div className="lg:col-span-4 md:col-span-5">
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 space-y-3">
            <div className="h-5 w-32 rounded bg-muted animate-pulse" />
            <div className="border-t pt-3 space-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded bg-muted animate-pulse shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                    <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 md:col-span-7 space-y-4">
          <div className="h-7 w-48 rounded bg-muted animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-muted animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── Main component ── */

export const ApplicationDetailUi = ({
  application,
  onBack,
  onApply,
}: IApplicationDetailUiProps) => {
  const { t } = useTranslation("application");

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return undefined;
    return new Intl.DateTimeFormat("fr", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const locationParts = [
    application.address?.city,
    application.address?.postalCode,
  ].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(" ") : undefined;

  const fullAddress = (() => {
    if (!application.address) return undefined;
    const parts: string[] = [];
    if (application.address.streetNumber && application.address.street) {
      parts.push(`${application.address.streetNumber} ${application.address.street}`);
    } else if (application.address.street) {
      parts.push(application.address.street);
    }
    parts.push(`${application.address.postalCode} ${application.address.city}`);
    if (application.address.complement) parts.push(application.address.complement);
    return parts.join(", ");
  })();

  const salary = formatSalary(
    application.salaryMin ?? null,
    application.salaryMax ?? null,
    t("detail.sidebar.salaryNotProvided")
  );

  // Only show items that have a value — avoids tall sidebar with lots of "—"
  const sidebarItems: IInfoItemProps[] = [
    application.company
      ? { icon: <Building2 className="w-4 h-4" />, label: t("detail.sidebar.company"), value: application.company }
      : null,
    { icon: <CircleDot className="w-4 h-4" />, label: t("detail.sidebar.status"), value: <ApplicationStatusBadge status={application.currentStatus} /> },
    { icon: <Briefcase className="w-4 h-4" />, label: t("detail.sidebar.contractType"), value: t(`contractType.${application.contractType}`) },
    location
      ? { icon: <MapPin className="w-4 h-4" />, label: t("detail.sidebar.location"), value: fullAddress ?? location }
      : null,
    application.jobboard
      ? { icon: <Monitor className="w-4 h-4" />, label: t("detail.sidebar.jobboard"), value: t(`jobboard.${application.jobboard}`) }
      : null,
    application.remotePolicy
      ? { icon: <Wifi className="w-4 h-4" />, label: t("detail.sidebar.remotePolicy"), value: t(`remotePolicy.${application.remotePolicy}`) }
      : null,
    application.experience
      ? { icon: <GraduationCap className="w-4 h-4" />, label: t("detail.sidebar.experience"), value: t(`experience.${application.experience}`) }
      : null,
    application.compatibility
      ? { icon: <Target className="w-4 h-4" />, label: t("detail.sidebar.compatibility"), value: t(`compatibility.${application.compatibility}`) }
      : null,
    { icon: <DollarSign className="w-4 h-4" />, label: t("detail.sidebar.salary"), value: salary },
    application.publishedAt
      ? { icon: <Calendar className="w-4 h-4" />, label: t("detail.sidebar.publishedAt"), value: formatDate(application.publishedAt) }
      : null,
    { icon: <Calendar className="w-4 h-4" />, label: t("detail.sidebar.createdAt"), value: formatDate(application.createdAt) },
  ].filter((item): item is any => item !== null);
return (
    <div className="bg-white min-h-[400px] p-4 md:p-6">
      <div className="w-full max-w-3xl mx-auto">
 
        {/* ── Mobile: clean vertical timeline ── */}
        <div className="md:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-[14px] top-0 bottom-0 w-px bg-slate-200" />
 
            <div className="space-y-4">
              {MOCK_HISTORY.map((event) => {
                const Icon = event.icon;
                return (
                  <div key={event.id} className="relative group">
                    {/* Dot */}
                    <div className={`absolute -left-10 top-2 w-7 h-7 rounded-full border flex items-center justify-center z-10 bg-white ${event.iconBg}`}>
                      <Icon className={`w-3.5 h-3.5 ${event.iconColor}`} />
                    </div>
 
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-slate-700">{event.action}</span>
                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 rounded text-slate-400 hover:text-slate-600">
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button className="p-1 rounded text-red-400 hover:text-red-500">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">{event.detail}</p>
                      <span className="text-xs text-slate-400 mt-1 block">{event.date} · {event.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
 
        {/* ── Desktop: grid-based alternating timeline ── */}
        <div className="hidden md:block">
          {/* 
            Grid: 3 columns
            [card left] [center dot col = 40px] [card right]
            Each row: card on one side, empty on the other
          */}
          <div className="grid grid-cols-[1fr_40px_1fr] items-start">
            {MOCK_HISTORY.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;
              const isLast = index === MOCK_HISTORY.length - 1;
 
              return (
                <div key={event.id} className="contents">
                  {/* Left cell */}
                  <div className={`${isLeft ? "pb-6" : "pb-6"}`}>
                    {isLeft && <CardContent event={event} align="left" />}
                  </div>
 
                  {/* Center: dot + line */}
                  <div className="flex flex-col items-center pb-6">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center z-10 bg-white shrink-0 ${event.iconBg}`}>
                      <Icon className={`w-4 h-4 ${event.iconColor}`} />
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-slate-200 mt-0" />
                    )}
                  </div>
 
                  {/* Right cell */}
                  <div className={`${!isLeft ? "pb-6" : "pb-6"}`}>
                    {!isLeft && <CardContent event={event} align="right" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
 
      </div>
    </div>
  );
};

ApplicationDetailUi.Skeleton = Skeleton;
