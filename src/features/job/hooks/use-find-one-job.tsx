import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { IUseFindOneJobReturn } from "../types/hook";
import type { ApiErrors } from "@/types/api";
import type { Job } from "@/types/entity";
import { jobApi } from "../job.api";

export const useFindOneJob = (id: number): IUseFindOneJobReturn => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);

  const { data, isPending, error } = useQuery<Job,ApiErrors>({
    queryKey: [`findOneJob-${id}-user-${userId}`],
    queryFn: () => jobApi.findOneById(id, userId),
  });

  return { job: data, isPending, error, t };
};
