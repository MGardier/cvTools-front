import { Pencil, Trash2 } from "lucide-react";

import type { IHistoryEvent } from "../types";
import { TimelineCard } from "./timeline-card";

interface IHistoryTabProps {
  events: IHistoryEvent[];
}

export const HistoryTab = ({ events }: IHistoryTabProps) => (
  <div>
    {/* Mobile: vertical timeline */}
    <div className="md:hidden relative pl-10">
      <div className="absolute left-[14px] top-0 bottom-0 w-px bg-slate-200" />
      <div className="space-y-4">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative group">
              <div className={`absolute -left-10 top-2 w-7 h-7 rounded-full border flex items-center justify-center z-10 bg-white ${event.iconBg}`}>
                <Icon className={`w-3.5 h-3.5 ${event.iconColor}`} />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-700">{event.action}</span>
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" className="p-1 rounded text-slate-400 hover:text-slate-600">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button type="button" className="p-1 rounded text-red-400 hover:text-red-500">
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

    {/* Desktop: alternating grid */}
    <div className="hidden md:block">
      <div className="grid grid-cols-[1fr_40px_1fr] items-start">
        {events.map((event, index) => {
          const Icon = event.icon;
          const isLeft = index % 2 === 0;
          const isLast = index === events.length - 1;
          return (
            <div key={event.id} className="contents">
              <div className="pb-5">
                {isLeft && <TimelineCard event={event} align="left" />}
              </div>
              <div className="flex flex-col items-center pb-5">
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center z-10 bg-white shrink-0 ${event.iconBg}`}>
                  <Icon className={`w-4 h-4 ${event.iconColor}`} />
                </div>
                {!isLast && <div className="w-px flex-1 bg-slate-200" />}
              </div>
              <div className="pb-5">
                {!isLeft && <TimelineCard event={event} align="right" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {events.length === 0 && (
      <p className="text-sm text-slate-400 text-center py-6">Aucun historique</p>
    )}
  </div>
);
