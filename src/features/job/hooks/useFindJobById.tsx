import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { jobService } from "../job.service";

export const useFindJobById = (id: number) => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const { data, isLoading, error } = useQuery({
    queryKey: [`getJobs${userId}`],
    queryFn: () => jobService.findOneById(id, userId),
  });
  return { data, isLoading, error, t };
};
