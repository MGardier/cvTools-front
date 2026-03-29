import { useState } from "react";
import { Plus, ArrowUpDown, Pencil, Trash2 } from "lucide-react";

import type { INote, TTranslationFn } from "../types";

interface INotesTabProps {
  notes: INote[];
  t: TTranslationFn;
}

export const NotesTab = ({ notes, t }: INotesTabProps) => {
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = [...notes].sort((a, b) =>
    sortAsc ? a.id - b.id : b.id - a.id
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-2 flex-1">
          <textarea
            placeholder={t("detail.notes.placeholder")}
            rows={1}
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-colors"
          />
          <button className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t("detail.notes.add")}</span>
          </button>
        </div>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-2 transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {sortAsc ? t("detail.notes.oldest") : t("detail.notes.newest")}
        </button>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {sorted.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6">{t("detail.notes.empty")}</p>
        )}
        {sorted.map((note) => (
          <div key={note.id} className="border border-slate-200 rounded-lg px-4 py-3 group hover:border-slate-300 transition-colors">
            <p className="text-sm text-slate-700 leading-relaxed">{note.content}</p>
            <div className="flex items-center justify-between mt-2.5">
              <span className="text-xs text-slate-400">{note.createdAt}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" className="p-1 rounded text-slate-400 hover:text-slate-600">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 rounded text-red-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
