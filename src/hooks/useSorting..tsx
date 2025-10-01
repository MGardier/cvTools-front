import type { IUseSortingReturn, ISortingItem } from "@/types/hook";
import { useCallback, useState } from "react";

export const useSorting = <TData,>(
  intialFields: ISortingItem<TData>[] = []
): IUseSortingReturn<TData> => {
  const [sorting, setSorting] = useState<ISortingItem<TData>[]>(intialFields);

  const updateSorting = useCallback((field: keyof TData) => {
    setSorting((prev) => {
      const existingIndex = prev.findIndex((s) => s.field === field);
      if (existingIndex === -1)
        return [...prev, { field, order: "asc" as const }];

      const currentOrder = prev[existingIndex].order;

      if (currentOrder === ("desc" as const))
        return [...prev.filter((s) => s.field !== field)];
      else
        return [
          ...prev.map((s, i) =>
            i === existingIndex ? { field, order: "desc" as const } : s
          ),
        ];
    });
  }, []);

    const getSortOrder = useCallback(
    (field: keyof TData): "asc" | "desc" | "none" => {
      const item = sorting.find((s) => s.field === field);
      return item?.order ?? "none";
    },
    [sorting]
  );

  const clearSorting = useCallback(() => {
    setSorting([]);
  }, []);

  return { sorting, updateSorting,clearSorting , getSortOrder};
};
