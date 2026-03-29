import { Pencil, Trash2 } from "lucide-react";
import type { IHistoryEvent } from "../types";

export interface ITimelineCardProps {
   event: IHistoryEvent; 
   align: "left" | "right" 
  }

export const TimelineCard = ({ event, align }: ITimelineCardProps) => (
  <div className={`group border border-slate-200 rounded-lg px-4 py-3 hover:border-sky-200 hover:shadow-sm transition-all ${align === "left" ? "md:mr-4" : "md:ml-4"}`}>
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm font-medium text-slate-700">{event.action}</span>
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button type="button" className="p-1 rounded text-slate-400 hover:text-slate-600">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button type="button" className="p-1 rounded text-red-400 hover:text-red-500">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
    <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{event.detail}</p>
    <span className="text-xs text-slate-400 mt-1.5 block">{event.date} · {event.time}</span>
  </div>
);