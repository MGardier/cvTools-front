import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../job.service";
import { useTranslation } from "react-i18next";
import type { UseFindAllJobReturn } from "../types/hook";
import type { FindAllJobByUserResponse } from "../types/api";
import type { ApiErrors } from "@/types/api";

export const useFindAllJobs =() : UseFindAllJobReturn=> {
    const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const {data,isPending,error} = useQuery<FindAllJobByUserResponse,ApiErrors>({queryKey: [`findAllJobByUser-${userId}`], queryFn : ()=> jobService.findAll(userId)})
  return {data,isPending,error,t};
}