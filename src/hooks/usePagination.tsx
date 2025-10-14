import type { IPaginationItem, IUsePaginationReturn } from "@/types/hook";
import { useCallback, useMemo, useState } from "react";

export const usePagination = (
  initialPage = 1,
  initialSize: number = 10,
  initialTotalItems?: number
): IUsePaginationReturn => {

  const [pagination, setPagination] = useState<IPaginationItem>({
    page: initialPage,
    limit: initialSize,
    totalItems: initialTotalItems,
  });

  const getTotalPages = useCallback(
    (): number | undefined => pagination.totalItems ? Math.ceil(pagination.totalItems / pagination.limit) : undefined,
    [pagination.limit, pagination.totalItems]
  );


  /********* UPDATE FUNCTION *********/

  const setLimit = useCallback((limit: number): void => {
    setPagination((prev) =>
      limit > 1 && limit <= 100 ? { ...prev, page: 1, limit } : prev
    );
  }, []);

  const setTotalItems = useCallback((totalItems: number): void => {
    setPagination((prev) => ({ ...prev, totalItems }));
  }, []);

  const setPage = useCallback((page: number): void => {
    setPagination((prev) => {
      const totalPages = prev.totalItems ? Math.ceil(prev.totalItems / pagination.limit) : undefined;
      if(!totalPages)
        return prev;
      return page > 0 && page <= totalPages ? { ...prev, page } : prev;
    });
  }, []);

  const clearPagination = useCallback((): void => {
    setPagination({
      page: 1,
      limit: initialSize,
      totalItems: initialTotalItems,
    });
  }, [initialSize, initialTotalItems]);


  /********* NAVIGATION  FUNCTION *********/

  const nextPage = useCallback((): void => {
    setPagination((prev) => {
      const totalPages = prev.totalItems ? Math.ceil(prev.totalItems / pagination.limit) : undefined;
      if(!totalPages)
        return prev;
      return prev.page < totalPages ? { ...prev, page: prev.page + 1 } : prev;
    });
  }, []);
  

  const prevPage = useCallback((): void => {
    setPagination((prev) =>
      prev.page > 1 ? { ...prev, page: prev.page - 1 } : prev
    );
  }, []);

  const canGoNext = useCallback(
  (): boolean | undefined => {
    const totalPages =  pagination.totalItems ? Math.ceil(pagination.totalItems / pagination.limit) : undefined
    if(!totalPages)
      return undefined;
    return totalPages > pagination.page;
  },
  [pagination.page, pagination.totalItems, pagination.limit]
);


const canGoPrev = useCallback(
  (): boolean => pagination.page > 1,
  [pagination.page]
);


  return useMemo(
    () => ({
      pagination,
      setPage,
      setLimit,
      setTotalItems,

      clearPagination,
      getTotalPages,

      nextPage,
      prevPage,
      canGoNext,
      canGoPrev,
    }),
    [pagination]
  );
};
