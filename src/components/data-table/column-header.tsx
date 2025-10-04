import { Button } from "../ui/button";

import type { IUseSortingReturn } from "@/types/hook";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react";

interface ColumnHeaderProps<TData> {
  title: string;
  column: keyof TData;
  sortingManager: IUseSortingReturn<TData>;
}

export const ColumnHeader = <TData,>({
  title,
  column,
  sortingManager,
}: ColumnHeaderProps<TData>) => {
  const handleClick = () => sortingManager.updateSorting(column);
  const sortOrder = sortingManager.getSortOrder(column);
  if(column ==="jobTitle")
    console.log(sortOrder)
  return (
    <Button variant="ghost" onClick={handleClick}>
      {title}

      {sortOrder === "none" && <ArrowDownUp />}

      {sortOrder === "asc" && <ArrowUpWideNarrow className="text-blue-500" />}
      {sortOrder === "desc" && (
        <ArrowDownWideNarrow className="text-blue-500" />
      )}
    </Button>
  );
};
