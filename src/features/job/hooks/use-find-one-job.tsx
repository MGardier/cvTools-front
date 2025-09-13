import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { jobService } from "../job.service";
import type { UseFindOneJobReturn } from "../types/hook";
import type { ApiErrors } from "@/types/api";
import type { Job } from "@/types/entity";

export const useFindOneJob = (id: number): UseFindOneJobReturn => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);

  const { data, isPending, error } = useQuery<Job,ApiErrors>({
    queryKey: [`findOneJob-${id}-user-${userId}`],
    queryFn: () => jobService.findOneById(id, userId),
  });

  return { job: data, isPending, error, t };
};
