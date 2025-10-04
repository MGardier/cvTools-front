import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type { UseJobsListReturn } from "../types/hook";
import type { ApiErrors,  FilterDataResponse } from "@/types/api";
import { JobService } from "../job.service";
import type { Job } from "@/types/entity";
import {  useEffect, useState } from "react";

import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";

export const useJobsList = (initialPage :number = 1, initialLimit : number = 5): UseJobsListReturn => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);

  const sortingManager = useSorting<Job>();
  const paginationManager = usePagination(5,0);

  // const defaultParams = {
  //   currentPage : initialPage || 1 ,
  //   limit : initialLimit || 5,
  //   jobTitle: "",
  //   enterprise: "",
  //   status : undefined,
  //   applicationMethod : undefined,
  //   appliedAt :{
  //     value: undefined,
  //     operator : undefined,
  //     secondValue:undefined
  //   }

  // }

const params  = {
  page :paginationManager.pagination.page,
  limit :paginationManager.pagination.limit,
  sorting: sortingManager.sorting

}
 
const queryKey = [
  'jobs',
  'findAllByUser',
  {
    userId,
    page: paginationManager.pagination.page,
    limit: paginationManager.pagination.limit,
    sorting: sortingManager.sorting, 
  },
] as const;



  const { data, isPending,isError } = useQuery<FilterDataResponse<Job>, ApiErrors>({
    queryKey,
    queryFn: () => JobService.findAll(userId,params),

    //data expiration for cache in  ms
    gcTime : 60*60*1000,

    //data duration period before expire in  ms
    staleTime : 60*60*1000
    
  },);
  
   useEffect(() => {
    if (data?.count !== undefined) {
      paginationManager.setTotalItems(data.count);
    }
  }, [data?.count]);


  return { sortingManager,paginationManager, data : data?.data, count: data?.count, maxPage : data?.maxPage!, isPending, isError, t };
};
