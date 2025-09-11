import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../job.service";
import { useTranslation } from "react-i18next";

export const useJobs =()=> {
    const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const {data,isLoading,error} = useQuery({queryKey: [`getJobs${userId}`], queryFn : ()=> jobService.findAll(userId)})

  return {data,isLoading,error,t};
}