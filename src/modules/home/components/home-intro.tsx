import { useTranslation } from "react-i18next";

import type {
  IApplicationCounts,
  IHomeTodoCounts,
} from "@/modules/home/types";

interface IHomeIntroProps {
  applicationCounts: IApplicationCounts;
  todoCounts: IHomeTodoCounts;
}

export const HomeIntro = ({
  applicationCounts,
  todoCounts,
}: IHomeIntroProps) => {
  const { t } = useTranslation("home");

  const tasksToDo = todoCounts.toMake + todoCounts.inProgress;

  const summaryParts = [
    t("connected.summary.applications", { count: applicationCounts.inProgress }),
    t("connected.summary.interviews", { count: applicationCounts.interview }),
    t("connected.summary.tasks", { count: tasksToDo }),
  ];

  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-[24px] md:text-[32px] font-medium tracking-[-0.02em] text-zinc-900">
        {t("connected.greeting")}
      </h1>
      <p className="mt-1.5 text-[14px] md:text-[15px] text-zinc-500">
        {summaryParts.join(" · ")}
      </p>
    </div>
  );
};
