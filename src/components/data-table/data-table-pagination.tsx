import { Pagination, PaginationContent } from "../ui/pagination";
import { DataTablePaginationItem } from "./data-table-pagination-item";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import type { IUsePaginationReturn } from "@/types/hook";



interface DataTablePaginationProps {
  paginationManager: IUsePaginationReturn;
  labelCurrentPageOnMaxPage: string
}

export const DataTablePagination = ({
  paginationManager,
  labelCurrentPageOnMaxPage,
}: DataTablePaginationProps) => {
  const {
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
    setPage,
    getTotalPages,
  } = paginationManager;

  return (
    <Pagination>
      <PaginationContent className="gap-1 md:gap-2">
        <DataTablePaginationItem key="firstPage" handleClick={() => setPage(1)}>
          <ChevronsLeft />
        </DataTablePaginationItem>
        <DataTablePaginationItem
          key="prevPage"
          handleClick={() => canGoPrev() && prevPage()}
        >
          <ChevronLeftIcon />
        </DataTablePaginationItem>
        <span className="flex items-center justify-items-center gap-2 text-sm text-gray-600">
          {labelCurrentPageOnMaxPage}
        </span>

        <DataTablePaginationItem
          key="nextPage"
          handleClick={() => canGoNext() && nextPage()}
        >
          <ChevronRightIcon />
        </DataTablePaginationItem>

        <DataTablePaginationItem
          key="lastPage"
          handleClick={() => getTotalPages() && setPage(getTotalPages()!)}
        >
          <ChevronsRight />
        </DataTablePaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
