import type { Job } from "@/types/entity";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { jobColumns } from "./job-columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TFunction } from "i18next";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IUseFiltersReturn, IUsePaginationReturn, IUseSortingReturn } from "@/types/hook";
import type { IFiltersJob } from "@/features/job/types/hook";

import { ROUTES } from "@/data/routes";
import { JobDataTableHeader } from "./data-table-header";
import { generatePath, useNavigate } from "react-router-dom";

interface JobDataTableProps {
  data: Job[];
  t: TFunction<"job", undefined>;
  filtersManager: IUseFiltersReturn<IFiltersJob>;
  sortingManager: IUseSortingReturn<Job>;
  paginationManager: IUsePaginationReturn;
}

export const JobDatable = ({
  sortingManager,
  t,
  data,
  paginationManager,
  filtersManager
}: JobDataTableProps) => {


  const LIMIT_OPTIONS = [5, 10, 15, 30, 50, 100] as const ;
  
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
 
  const columns = useMemo(
    () => jobColumns(
      t,
      sortingManager,
    ),
    [t, sortingManager]
  );


  const table = useReactTable<Job>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },

    manualPagination: true,
    manualSorting :true,
    manualFiltering : true,
  });


  const clearParams = () => {
    sortingManager.clearSorting();
    paginationManager.clearPagination();
    filtersManager.clearFilters();
  };

  const hasActiveParams =
    sortingManager.sorting.length > 0 ||
    paginationManager.pagination.page !== 1 ||
    filtersManager.hasActiveFilters();


  

  return (
    <div className="w-full flex flex-col mt-4 ">
      <JobDataTableHeader
        t={t}
        filtersManager={filtersManager}
        clearParams={clearParams}
        hasActiveParams={hasActiveParams}
        addItemLink={`/${ROUTES.job.create}`}
      />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-10 px-4 text-left align-middle font-medium text-gray-700  text-sm tracking-wide"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={data?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-2  py-4">
        <div className="space-x-2 ">
          <DataTablePagination
            {...{
              paginationManager,
              labelCurrentPageOnMaxPage: t(
                "pages.findAll.currentPageOnMaxPage",
                {
                  currentPage: paginationManager.pagination.page,
                  maxPage: paginationManager.getTotalPages(),
                }
              ),
            }}
          />
        </div>
        <div className="hidden items-center gap-2 lg:flex  w-content">
          <Label>{t("pages.findAll.limitPerPage")}</Label>
          <Select
            required
            onValueChange={(value: string) =>
              paginationManager.setLimit(+value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={paginationManager.pagination.limit} />
            </SelectTrigger>

            <SelectContent>
              {LIMIT_OPTIONS.map((limit) => (
                <SelectItem key={limit} value={String(limit)}>
                  {limit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
