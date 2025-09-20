import type { TFunction } from "i18next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,

  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { DataTablePaginationItem } from "./data-table-pagination-item";
import type { Dispatch, SetStateAction } from "react";

interface DataTablePaginationProps {
  currentPage: number;
  length: number;
  setCurrentPage : Dispatch<SetStateAction<number>>;
  t: TFunction<'job',undefined>
}

export const DataTablePagination = ({
  currentPage,
  setCurrentPage,
  length,
  t,
}: DataTablePaginationProps) => {
  const pages = Array.from({ length :length +2 }, (_, index) => index );

  return (
    <Pagination>
      <PaginationContent className="gap-1 md:gap-2">
        {pages.map((page) => {
          if (page === 0)
            return (
              <PaginationItem key= {page}>
                <PaginationPrevious
                  label={t('pages.findAll.previous')}
                  className="h-6 px-1 text-xs md:h-9 md:px-2 md:text-sm cursor-pointer" 
                  onClick={() =>
                    currentPage > 1 &&
                    setCurrentPage((prevPage) => prevPage - 1)
                  }
                />
              </PaginationItem>
            );
          else if (page > length)
            return (
              <PaginationItem key= {page}>
                <PaginationNext
                className="h-6 px-1 text-xs md:h-9 md:px-2 md:text-sm cursor-pointer" 
                 label={t('pages.findAll.next')}
                  onClick={() =>
                    currentPage < 5 &&
                    setCurrentPage((prevPage) => prevPage + 1)
                  }
                />
              </PaginationItem>
            );
          else
            return(<DataTablePaginationItem key={page} {...{
              isActive :  currentPage === page,
              page,
              handleClick : (page: number) => setCurrentPage(page)

            }} />)
        })}
      </PaginationContent>
    </Pagination>
  );
};
