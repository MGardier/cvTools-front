import type { IUseSortingReturn, ISortingItem } from "@/common/types/hook";
import { useCallback, useMemo, useState } from "react";

export const useSorting = <TData,>(
  initialFields: ISortingItem<TData>[] = []
): IUseSortingReturn<TData> => {
  
  const [sorting, setSorting] = useState<ISortingItem<TData>[]>(initialFields);

  /************** UPDATE FUNCTION  ************** */

  const updateSorting = useCallback((field: keyof TData): void => {
    setSorting((prev) => {
      const existingIndex = prev.findIndex((s) => s.field === field);

      if (existingIndex === -1)
        return [...prev, { field, order: "asc" } as ISortingItem<TData>];

      const currentOrder = prev[existingIndex].order;

      if (currentOrder === "desc")
        return [...prev.filter((s) => s.field !== field)];
      else
        return [
          ...prev.map((s, i) =>
            i === existingIndex
              ? ({ field, order: "desc" } as ISortingItem<TData>)
              : s
          ),
        ];
    });
  }, []);



  const clearSorting = useCallback((): void => {
    setSorting([]);
  }, []);



  /************** GETTER FUNCTION ************** */


  const getSortOrder = useCallback(
    (field: keyof TData): "asc" | "desc" | "none" => {
      const item = sorting.find((s) => s.field === field);
      return item?.order ?? "none";
    },
    [sorting]
  );




  return useMemo(
    () => ({
      sorting,
      updateSorting,
      getSortOrder,
      clearSorting,
    }),
    [sorting]
  );
};
