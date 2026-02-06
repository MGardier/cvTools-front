import { useCallback, useMemo, useState } from "react";
import type { IUseFiltersReturn } from "@/shared/types/hook";

export const useFilters = <TFilters extends object>(
  initialFilters: TFilters
): IUseFiltersReturn<TFilters> => {

  const [filters, setFilters] = useState<TFilters>(initialFilters);

/************** UPDATE FUNCTION ***************/

  const updateFilters = useCallback((filters: Partial<TFilters>): void => {
    setFilters((prev) => ({ ...prev, ...filters }));
  }, []);

 
  const clearFilters = useCallback((): void => {
    setFilters(initialFilters);
  }, [initialFilters]);



  /************** GETTER FUNCTION ***************/

  const getFilter = useCallback(
    <K extends keyof TFilters>(key: K): TFilters[K] => filters[key],
    [filters]
  );


  const hasActiveFilters = useCallback((): boolean => {
    return Object.values(filters).some(
      (value) =>   value !== undefined && value !== null 
    );
  }, [filters]);


  return useMemo(()=>({
      filters,
      updateFilters,
      clearFilters,
      hasActiveFilters,
      getFilter,
    }),[filters,clearFilters])
};
