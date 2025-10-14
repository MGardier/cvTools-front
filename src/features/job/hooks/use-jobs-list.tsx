import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type { IFiltersJob, IUseJobsListReturn } from "../types/hook";
import type { ApiErrors, FilterDataResponse } from "@/types/api";
import { JobService } from "../job.service";
import type { Job } from "@/types/entity";
import { useEffect, useMemo } from "react";

import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";
import { useFilters } from "@/hooks/useFilters";



export const useJobsList = (
  initialPage: number = 1,
  initialLimit: number = 5
): IUseJobsListReturn => {


  const userId = useMemo(()=>Number(useAuthStore().user?.id),[]);

  const defaultFilters = useMemo(()=> ({
    jobTitle: undefined,
    enterprise: undefined,
    status: undefined,
    applicationMethod: undefined,
    appliedAt: undefined,
  }),[]);
 

  const { t } = useTranslation("job");
  const sortingManager = useSorting<Job>();
  const paginationManager = usePagination(initialPage, initialLimit, 0);
  const filtersManager = useFilters<IFiltersJob>(defaultFilters)
  


  const params = {
    page: paginationManager.pagination.page,
    limit: paginationManager.pagination.limit,
    sorting: sortingManager.sorting,
    filters : filtersManager.filters,
  };


  /******** QUERY *******/

  const queryKey = ["jobs", "findAllByUser", { userId, params }];

  const { data, isPending, isError } = useQuery<
    FilterDataResponse<Job>,
    ApiErrors
  >({
    queryKey,
    queryFn: () => JobService.findAll(userId, params),

    //data expiration for cache in  ms
    gcTime: 60 * 60 * 1000,

    //data duration period before expire in  ms
    staleTime: 60 * 60 * 1000,
  });



  useEffect(() => {
    if (data?.count) 
      paginationManager.setTotalItems(data.count);
    
  }, [data?.count, paginationManager.setTotalItems]);





  return {
    sortingManager,
    paginationManager,
    filtersManager,
    data: data?.data,
    isPending,
    isError,
    t,
  };
};
