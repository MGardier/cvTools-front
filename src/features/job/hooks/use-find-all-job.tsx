import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type { UseFindAllJobReturn } from "../types/hook";
import type { FindAllJobByUserResponse } from "../types/api";
import type { ApiErrors } from "@/types/api";
import { jobApi } from "../job.api";

export const useFindAllJobs =() : UseFindAllJobReturn=> {
    const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const {data,isPending,error} = useQuery<FindAllJobByUserResponse,ApiErrors>({queryKey: [`findAllJobByUser-${userId}`], queryFn : ()=> jobApi.findAll(userId)})
  return {data,isPending,error,t};
}