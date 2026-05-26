import type { IPaginationItem, IUsePaginationReturn } from "@/shared/types/hook";
import { useCallback } from "react";

interface IUsePaginationArgs {
  page: number;
  limit: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const usePagination = ({
  page,
  limit,
  totalItems,
  onPageChange,
  onLimitChange,
}: IUsePaginationArgs): IUsePaginationReturn => {

  const totalPages = totalItems ? Math.ceil(totalItems / limit) : undefined;

  const getTotalPages = useCallback(
    (): number | undefined => totalPages,
    [totalPages]
  );


  // =============================================================================
  //                               UPDATE FUNCTIONS
  // =============================================================================

  const setPage = useCallback((newPage: number): void => {
    if (!totalPages || newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  }, [totalPages, onPageChange]);

  const setLimit = useCallback((newLimit: number): void => {
    if (newLimit < 1 || newLimit > 100) return;
    onLimitChange?.(newLimit);
    onPageChange(1);
  }, [onLimitChange, onPageChange]);

  const clearPagination = useCallback((): void => {
    onPageChange(1);
  }, [onPageChange]);


   // =============================================================================
  //                            NAVIGATE FUNCTIONS
  // =============================================================================

  const nextPage = useCallback((): void => {
    if (!totalPages || page >= totalPages) return;
    onPageChange(page + 1);
  }, [totalPages, page, onPageChange]);

  const prevPage = useCallback((): void => {
    if (page <= 1) return;
    onPageChange(page - 1);
  }, [page, onPageChange]);

  const canGoNext = useCallback(
    (): boolean | undefined => (totalPages !== undefined ? page < totalPages : undefined),
    [totalPages, page]
  );

  const canGoPrev = useCallback(
    (): boolean => page > 1,
    [page]
  );


  const pagination: IPaginationItem = { page, limit, totalItems };

  return {
    pagination,
    setPage,
    setLimit,
    clearPagination,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    getTotalPages,
  };
};
