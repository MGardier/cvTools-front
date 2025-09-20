import { useAuthStore } from "@/features/auth/auth.store";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import type { UseJobsListReturn } from "../types/hook";
import type { ApiErrors, FilterDataResponse } from "@/types/api";
import { JobService } from "../job.service";
import type { Job } from "@/types/entity";
import {  useState } from "react";

export const useJobsList = (initialpage :number = 1, initialLimit : number = 6): UseJobsListReturn => {
  const { t } = useTranslation("job");
  const userId = Number(useAuthStore().user?.id);
  const [currentPage,setCurrentPage] = useState(initialpage)
  const [limit,setLimit] = useState(initialLimit)

  console.log(currentPage)
  const { data, isPending,isError } = useQuery<FilterDataResponse<Job>, ApiErrors>({
    queryKey: [`findAllJobByUser-${userId}`,currentPage],
    queryFn: () => JobService.findAll(userId,{page: currentPage , limit}),
  });

  

  return { data : data?.data, count: data?.count, maxPage : data?.maxPage, isPending, isError, t ,setCurrentPage,currentPage ,limit};
};
