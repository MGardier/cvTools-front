import type { TFunction } from "i18next";
import {
  Pagination,
  PaginationContent,


} from "../ui/pagination";
import { DataTablePaginationItem } from "./data-table-pagination-item";
import type { Dispatch, SetStateAction } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { DataTableParams } from "@/types/api";

interface DataTablePaginationProps {
  currentPage: number;
  maxPage: number;
  setParams: Dispatch<SetStateAction<DataTableParams>>;
}

export const DataTablePagination = ({
  currentPage,
  setParams,
  maxPage,
}: DataTablePaginationProps) => {
  const paginations = [
    {
      icon: ChevronsLeft,
      handleClick: () =>  currentPage !==  1 && setParams((prevParams) => {return {...prevParams, currentPage : 1}}),
    },
    {
      icon: ChevronLeftIcon,
      handleClick: () =>  currentPage > 1 && setParams((prevParams) => {return {...prevParams, currentPage : prevParams.currentPage - 1}}),
    },
    {
      icon: ChevronRightIcon,
      handleClick: () =>  currentPage < maxPage &&  setParams((prevParams) => {return {...prevParams, currentPage : prevParams.currentPage + 1}}),
    },
    {
      icon: ChevronsRight,
      handleClick: () => currentPage < maxPage && setParams((prevParams) => {return {...prevParams, currentPage : maxPage}}),
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
