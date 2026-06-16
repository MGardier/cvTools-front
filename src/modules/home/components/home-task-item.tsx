import { Link } from "react-router-dom";
import { Circle, CircleDot, Building2 } from "lucide-react";

import { EStatusTodo } from "@/shared/types/entity";
import { ROUTES } from "@/app/constants/routes";

import type { IHomeRecentTodo } from "@/modules/home/types";

interface IHomeTaskItemProps {
  todo: IHomeRecentTodo;
}

/**
 * Read-only task row for the connected home. Links to its parent application.
 * The backend only returns active todos (DONE/ARCHIVED excluded).
 */
export const HomeTaskItem = ({ todo }: IHomeTaskItemProps) => (
  <Link
    to={ROUTES.application.detail(todo.applicationId)}
    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
  >
    <span className="shrink-0 mt-0.5 text-sky-600">
      {todo.status === EStatusTodo.IN_PROGRESS ? (
        <CircleDot className="w-5 h-5" />
      ) : (
        <Circle className="w-5 h-5 text-slate-300" />
      )}
    </span>

    <div className="flex-1 min-w-0 grid gap-0.5">
      <span className="text-sm text-slate-700 truncate">{todo.description}</span>
      {todo.company && (
        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{todo.company}</span>
        </span>
      )}
    </div>
  </Link>
);
