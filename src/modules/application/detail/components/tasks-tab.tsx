import { useState } from "react";
import { Plus, ArrowUpDown, Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";

import type { ITask, TTaskFilter, TTranslationFn } from "../types";

interface ITasksTabProps {
  initialTasks: ITask[];
  t: TTranslationFn;
}

const FILTERS: { key: TTaskFilter; labelKey: string }[] = [
  { key: "all", labelKey: "detail.tasks.filterAll" },
  { key: "todo", labelKey: "detail.tasks.filterTodo" },
  { key: "done", labelKey: "detail.tasks.filterDone" },
];

export const TasksTab = ({ initialTasks, t }: ITasksTabProps) => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [filter, setFilter] = useState<TTaskFilter>("all");
  const [sortAsc, setSortAsc] = useState(true);

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const filtered = tasks
    .filter((task) => {
      if (filter === "done") return task.done;
      if (filter === "todo") return !task.done;
      return true;
    })
    .sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));

  const doneCount = tasks.filter((task) => task.done).length;
  const progress = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-500">
            {doneCount} / {tasks.length} {t("detail.tasks.completed")}
          </span>
          <span className="text-sm font-medium text-slate-700">{progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Add + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder={t("detail.tasks.placeholder")}
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-colors"
          />
          <button className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium rounded-lg bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t("detail.tasks.add")}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`px-3 py-2 transition-colors ${
                  filter === f.key
                    ? "bg-sky-600 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSortAsc(!sortAsc)}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-2.5 py-2 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-1">
        {filtered.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors"
          >
            {task.done ? (
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400 shrink-0" />
            )}
            <span className={`text-sm flex-1 ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
              {task.label}
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={(e) => e.stopPropagation()} className="p-1 rounded text-slate-400 hover:text-slate-600">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={(e) => e.stopPropagation()} className="p-1 rounded text-red-400 hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6">{t("detail.tasks.empty")}</p>
        )}
      </div>
    </div>
  );
};
