import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type { UseJobsListReturn } from "../types/hook";
import type { ApiErrors } from "@/types/api";
import { JobService } from "../job.service";
import type { Job } from "@/types/entity";

export const useJobsList = (): UseJobsListReturn => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const { data, isPending,isError } = useQuery<Job[], ApiErrors>({
    queryKey: [`findAllJobByUser-${userId}`],
    queryFn: () => JobService.findAll(userId),
  });
  return { data, isPending, isError, t };
};
