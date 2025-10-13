import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type {
  IFiltersJob,
  IUseJobsListReturn,
} from "../types/hook";
import type { ApiErrors, FilterDataResponse } from "@/types/api";
import { JobService } from "../job.service";
import type { Job } from "@/types/entity";
import { useEffect, useState } from "react";

import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";


//TODO : Navbar souligner les details visuels 


//TODO : Donner des actions dans la data table 


export const useJobsList = (
  initialPage: number = 1,
  initialLimit: number = 5
): IUseJobsListReturn => {


  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);

  const sortingManager = useSorting<Job>();
  const paginationManager = usePagination(initialPage, initialLimit, 0);
  
  const defaultFilters = {
      jobTitle: undefined,
  enterprise: undefined,
  status: undefined,
  applicationMethod: undefined,
  appliedAt : undefined
  }

  const [filtersJob, setFiltersJob] = useState<IFiltersJob>(defaultFilters);
  console.log(filtersJob)
  const clearFilters = () => setFiltersJob(defaultFilters);

  const updateFilters = (filters : IFiltersJob) =>
    setFiltersJob((prev) => {return {...prev,...filters}});

  
//TODO : régler le soucis de la date parse
  const params = {
    page: paginationManager.pagination.page,
    limit: paginationManager.pagination.limit,
    sorting: sortingManager.sorting,
    filters: filtersJob,
  };

  const queryKey = [
    "jobs",
    "findAllByUser",
    {
      userId,
      page: paginationManager.pagination.page,
      limit: paginationManager.pagination.limit,
      sorting: sortingManager.sorting,
      filters: filtersJob
    },
  ] as const;

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
    if (data?.count) {
      paginationManager.setTotalItems(data.count);
    }
  }, [data?.count, paginationManager.setTotalItems]);


  

  return {
    sortingManager,
    paginationManager,
    filtersJobManager: { updateFilters, filtersJob, clearFilters },
    data: data?.data,
    isPending,
    isError,
    t,
  };
};
