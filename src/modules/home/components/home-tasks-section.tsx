import { useTranslation } from "react-i18next";
import { CheckSquare } from "lucide-react";

import { HomeSectionCard } from "./home-section-card";
import { HomeTaskItem } from "./home-task-item";

import type {
  IHomeRecentTodo,
  IHomeTodoCounts,
} from "@/modules/home/types";

interface IHomeTasksSectionProps {
  counts: IHomeTodoCounts;
  recentTodos: IHomeRecentTodo[];
}

export const HomeTasksSection = ({
  counts,
  recentTodos,
}: IHomeTasksSectionProps) => {
  const { t } = useTranslation("home");

  const total = counts.toMake + counts.inProgress;

  return (
    <HomeSectionCard
      icon={<CheckSquare className="w-4 h-4 md:w-5 md:h-5" />}
      title={t("connected.tasks.title")}
      count={total}
    >
      {recentTodos.length > 0 ? (
        <div className="space-y-1">
          {recentTodos.map((todo) => (
            <HomeTaskItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-400 text-center py-6">
          {t("connected.tasks.empty")}
        </p>
      )}
    </HomeSectionCard>
  );
};
