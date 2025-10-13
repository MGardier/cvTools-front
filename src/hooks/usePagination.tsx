import type { IPaginationItem, IUsePaginationReturn } from "@/types/hook";
import { useCallback, useState } from "react";

export const usePagination = (
  initialPage = 1,
  initialSize: number = 10,
  initialTotalItems: number
): IUsePaginationReturn => {
  
  const [pagination, setPagination] = useState<IPaginationItem>({
    page: initialPage,
    limit: initialSize,
    totalItems: initialTotalItems,
  });


  const getTotalPages = useCallback(
    () => Math.ceil(pagination.totalItems / pagination.limit),
    [pagination.limit, pagination.totalItems]
  );


  /********* UPDATE FUNCTION *********/


  const setLimit = useCallback((limit: number) => {
    setPagination((prev) =>
      limit > 1 && limit <= 100 ? { ...prev, page: 1, limit } : prev
    );
  }, []);


  const setTotalItems = useCallback((totalItems: number) => {
    setPagination((prev) => ({ ...prev, totalItems }));
  }, []);


  const setPage = useCallback((page: number) => {
    setPagination((prev) => {
      const totalPages = Math.ceil(prev.totalItems / prev.limit); 
      return page > 0 && page <= totalPages ? { ...prev, page } : prev;
    });
  }, []);


  const clearPagination = useCallback(() => {
    setPagination({
      page: 1,
      limit: initialSize,
      totalItems: initialTotalItems,
    });
  }, [initialSize, initialTotalItems]);




 
  /********* NAVIGATION  FUNCTION *********/
 

  const nextPage = useCallback(() => {
    setPagination((prev) => {
      const maxPage = Math.ceil(prev.totalItems / prev.limit); 
      return prev.page < maxPage ? { ...prev, page: prev.page + 1 } : prev;
    });
  }, []);


  const prevPage = useCallback(() => {
    setPagination((prev) =>
      prev.page > 1 ? { ...prev, page: prev.page - 1 } : prev
    );
  }, []);



  return {
    pagination,
    setPage,
    setLimit,
    setTotalItems,
    clearPagination,
    getTotalPages,
    nextPage,
    prevPage,
    canGoNext: Math.ceil(pagination.totalItems / pagination.limit) > pagination.page,
    canGoPrev: pagination.page > 1,
  };
};