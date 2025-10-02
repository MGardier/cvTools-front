import type { IPaginationItem, IUsePaginationReturn } from "@/types/hook";
import { useCallback, useState } from "react";

export const usePagination = (
  initialSize: number = 10,
  totalItems: number
): IUsePaginationReturn => {
  const [pagination, setPagination] = useState<IPaginationItem>({
    page: 1,
    limit: initialSize,
  });

  const setLimit = useCallback(
    (limit: number) =>
      setPagination((prev) => {
        return limit > 1 && limit <= 100 ? { ...prev, page: 1, limit } : prev;
      }),
    []
  );

  const getTotalPages = useCallback(()=>  Math.ceil(totalItems / pagination.limit),[pagination.limit, totalItems])


  const canGoNext = useCallback(
    () => getTotalPages() > pagination.page,
    [pagination.page, getTotalPages]
  );

  const canGoPrev = useCallback(() => 1 < pagination.page, [pagination.page]);

  const setPage = useCallback(
    (page: number) =>
       setPagination((prev) => {
            return page > 0 && page <= getTotalPages()
        ?{ ...prev, page } : prev
          })
        ,
    [getTotalPages]
  );

  const nextPage = useCallback(
    () =>
      setPagination((prev) => {
        return canGoNext() ? { ...prev, page: prev.page + 1 } : prev;
      }),
    [canGoNext]
  );

  const prevPage = useCallback(
    () =>
      setPagination((prev) => {
        return canGoPrev() ? { ...prev, page: prev.page - 1 } : prev;
      }),
    [canGoPrev]
  );

  const clearPagination = useCallback(
    () =>
      setPagination({
        page: 1,
        limit: initialSize,
      }),
    [initialSize]
  );

  return {
    pagination,
    setPage,
    setLimit,
    clearPagination,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
    getTotalPages  ,
  };
};
