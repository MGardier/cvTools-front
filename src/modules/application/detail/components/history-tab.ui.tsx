import { Trash2, Plus, Clock } from "lucide-react";

import { EApplicationStatus } from "@/shared/types/entity";
import type { IApplicationHistory, TApplicationStatus } from "@/shared/types/entity";
import type { TTranslationFn } from "../types";

interface IHistoryTabUiProps {
  events: IApplicationHistory[];
  t: TTranslationFn;
  showForm: boolean;
  description: string;
  status: TApplicationStatus;
  onShowForm: () => void;
  onHideForm: () => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: TApplicationStatus) => void;
  onCreateHistory: () => void;
  onDeleteHistory: (id: number) => void;
}

const STATUS_COLORS: Record<string, { iconColor: string; iconBg: string }> = {
  TO_APPLY: { iconColor: "text-slate-500", iconBg: "bg-slate-50 border-slate-200" },
  APPLIED: { iconColor: "text-blue-600", iconBg: "bg-blue-50 border-blue-200" },
  FIRST_CONTACT: { iconColor: "text-sky-600", iconBg: "bg-sky-50 border-sky-200" },
  FIRST_INTERVIEW: { iconColor: "text-indigo-600", iconBg: "bg-indigo-50 border-indigo-200" },
  FOLLOW_UP_INTERVIEW: { iconColor: "text-violet-600", iconBg: "bg-violet-50 border-violet-200" },
  OFFER_RECEIVED: { iconColor: "text-emerald-600", iconBg: "bg-emerald-50 border-emerald-200" },
  ACCEPTED: { iconColor: "text-green-600", iconBg: "bg-green-50 border-green-200" },
  REJECTED: { iconColor: "text-red-600", iconBg: "bg-red-50 border-red-200" },
  GHOSTED: { iconColor: "text-gray-500", iconBg: "bg-gray-50 border-gray-200" },
  WITHDRAWN: { iconColor: "text-amber-600", iconBg: "bg-amber-50 border-amber-200" },
};

const getColors = (s: string) => STATUS_COLORS[s] ?? STATUS_COLORS.TO_APPLY;

const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return {
    date: new Intl.DateTimeFormat("fr", { day: "numeric", month: "long", year: "numeric" }).format(d),
    time: new Intl.DateTimeFormat("fr", { hour: "2-digit", minute: "2-digit" }).format(d),
  };
};

export const HistoryTabUi = ({
  events,
  t,
  showForm,
  description,
  status,
  onShowForm,
  onHideForm,
  onDescriptionChange,
  onStatusChange,
  onCreateHistory,
  onDeleteHistory,
}: IHistoryTabUiProps) => (
  <div>
    {/* Add button / form */}
    <div className="mb-5">
      {!showForm ? (
        <button
          type="button"
          onClick={onShowForm}
          className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t("detail.history.add")}
        </button>
      ) : (
        <div className="border border-slate-200 rounded-lg p-4 space-y-3">
          <input
            type="text"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder={t("detail.history.placeholder")}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-colors"
          />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as TApplicationStatus)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-colors"
          >
            {Object.values(EApplicationStatus).map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCreateHistory}
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 transition-colors"
            >
              {t("detail.history.save")}
            </button>
            <button
              type="button"
              onClick={onHideForm}
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 px-4 py-2 transition-colors"
            >
              {t("detail.history.cancel")}
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Timeline */}
    {events.length === 0 ? (
      <p className="text-sm text-slate-400 text-center py-6">{t("detail.history.empty")}</p>
    ) : (
      <>
        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-[14px] top-0 bottom-0 w-px bg-slate-200" />
          <div className="space-y-4">
            {events.map((event) => {
              const colors = getColors(event.status);
              const { date, time } = formatDate(event.createdAt);
              return (
                <div key={event.id} className="relative group">
                  <div className={`absolute -left-10 top-2 w-7 h-7 rounded-full border flex items-center justify-center z-10 bg-white ${colors.iconBg}`}>
                    <Clock className={`w-3.5 h-3.5 ${colors.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-700">
                        {t(`status.${event.status}`)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteHistory(event.id)}
                        className="p-1 rounded text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">{event.description}</p>
                    <span className="text-xs text-slate-400 mt-1 block">{date} · {time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: alternating grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_40px_1fr] items-start">
            {events.map((event, index) => {
              const colors = getColors(event.status);
              const { date, time } = formatDate(event.createdAt);
              const isLeft = index % 2 === 0;
              const isLast = index === events.length - 1;

              const card = (
                <div className="group border border-slate-200 rounded-lg px-4 py-3 hover:border-sky-200 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-700">
                      {t(`status.${event.status}`)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteHistory(event.id)}
                      className="p-1 rounded text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{event.description}</p>
                  <span className="text-xs text-slate-400 mt-1.5 block">{date} · {time}</span>
                </div>
              );

              return (
                <div key={event.id} className="contents">
                  <div className="pb-5">
                    {isLeft && <div className="md:mr-4">{card}</div>}
                  </div>
                  <div className="flex flex-col items-center pb-5">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center z-10 bg-white shrink-0 ${colors.iconBg}`}>
                      <Clock className={`w-4 h-4 ${colors.iconColor}`} />
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-slate-200" />}
                  </div>
                  <div className="pb-5">
                    {!isLeft && <div className="md:ml-4">{card}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )}
  </div>
);
