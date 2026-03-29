import { ArrowUpDown, Pencil, Trash2, X, Check } from "lucide-react";

import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import type { Content } from "@tiptap/react";
import type { INote } from "@/shared/types/entity";
import type { TTranslationFn } from "../types";

interface INotesTabUiProps {
  notes: INote[];
  t: TTranslationFn;
  createValue: string;
  createKey: number;
  editingId: number | null;
  editValue: string;
  onCreateValueChange: (value: string) => void;
  onEditValueChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onCreateNote: () => void;
  onStartEdit: (note: INote) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteNote: (id: number) => void;
  onToggleSort: () => void;
}

export const NotesTabUi = ({
  notes,
  t,
  createValue,
  createKey,
  editingId,
  editValue,
  sortOrder,
  onCreateValueChange,
  onEditValueChange,
  onCreateNote,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteNote,
  onToggleSort,
}: INotesTabUiProps) => (
  <div>
    {/* Create note */}
    <div className="mb-5 space-y-3">
      <TooltipProvider>
        <MinimalTiptapEditor
          key={createKey}
          value={createValue as Content}
          onChange={(value) => onCreateValueChange(value as string)}
          placeholder={t("detail.notes.placeholder")}
          output="html"
          immediatelyRender={false}
          editorContentClassName="p-4 min-h-[100px]"
        />
      </TooltipProvider>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCreateNote}
          className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 transition-colors"
        >
          {t("detail.notes.add")}
        </button>
        <button
          type="button"
          onClick={onToggleSort}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-2 transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {sortOrder === 'asc' ? t("detail.notes.oldest") : t("detail.notes.newest")}
        </button>
      </div>
    </div>

    {/* Notes list */}
    <div className="space-y-3">
      {notes.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">{t("detail.notes.empty")}</p>
      )}
      {notes.map((note) => (
        <div
          key={note.id}
          className="border border-slate-200 rounded-lg px-4 py-3 group hover:border-slate-300 transition-colors"
        >
          {editingId === note.id ? (
            <div className="space-y-3">
              <TooltipProvider>
                <MinimalTiptapEditor
                  key={editingId}
                  value={editValue as Content}
                  onChange={(value) => onEditValueChange(value as string)}
                  output="html"
                  immediatelyRender={false}
                  editorContentClassName="p-4 min-h-[100px]"
                />
              </TooltipProvider>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSaveEdit}
                  className="inline-flex items-center gap-1 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 px-3 py-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  {t("detail.notes.save")}
                </button>
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="inline-flex items-center gap-1 text-sm font-medium rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 px-3 py-1.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  {t("detail.notes.cancel")}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: note.description }}
              />
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-xs text-slate-400">
                  {new Intl.DateTimeFormat("fr", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => onStartEdit(note)}
                    className="p-1 rounded text-slate-400 hover:text-slate-600"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1 rounded text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
);
