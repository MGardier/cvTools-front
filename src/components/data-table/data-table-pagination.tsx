
import {
  Pagination,
  PaginationContent,


} from "../ui/pagination";
import { DataTablePaginationItem } from "./data-table-pagination-item";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import type { IUsePaginationReturn, IUseSortingReturn } from "@/types/hook";

//TODO : Typage

interface DataTablePaginationProps {
  paginationManager : IUsePaginationReturn
}
//TODO :grise si pas pooyuvoir utiliser
export const DataTablePagination = ({
paginationManager
}: DataTablePaginationProps) => {


  const {pagination,canGoNext,canGoPrev,nextPage,prevPage,setPage,getTotalPages} = paginationManager;

  const paginations = [
    {
      icon: ChevronsLeft,
      handleClick: () =>  setPage(1),
    },
    {
      icon: ChevronLeftIcon,
      handleClick: () =>  canGoPrev() && prevPage(),
    },
    {
      icon: ChevronRightIcon,
      handleClick: () => canGoNext() && nextPage(),
    },
    {
      icon: ChevronsRight,
      handleClick: () => setPage(getTotalPages()),
    },
  ];

  return (
    <Pagination>
      <PaginationContent className="gap-1 md:gap-2">
        {paginations.map((pagination,index) => {
          const Icon = pagination.icon;
          return (
            <DataTablePaginationItem key={index} handleClick={pagination.handleClick}>
              <Icon />
            </DataTablePaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
