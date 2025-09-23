import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type { UseJobsListReturn } from "../types/hook";
import type { ApiErrors,  FilterDataResponse } from "@/types/api";
import { JobService } from "../job.service";
import type { Job } from "@/types/entity";
import {  useState } from "react";
import type { DataTableParams } from "@/types/data-table";

export const useJobsList = (initialPage :number = 1, initialLimit : number = 5): UseJobsListReturn => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const defaultParams = {
    currentPage : initialPage || 1 ,
    limit : initialLimit || 5,
    sorting : [],

  }

  const [params,setParams] = useState<DataTableParams>(defaultParams);
 
  const { data, isPending,isError } = useQuery<FilterDataResponse<Job>, ApiErrors>({
    queryKey: [`findAllJobByUser-${userId}`,params],
    queryFn: () => JobService.findAll(userId,params),

    //data expiration for cache in  ms
    gcTime : 60*60*1000,

    //data duration period before expire in  ms
    staleTime : 60*60*1000
    
  },);
  console.log(params)
  

  return { data : data?.data, count: data?.count, maxPage : data?.maxPage!, isPending, isError, t ,params,setParams};
};
