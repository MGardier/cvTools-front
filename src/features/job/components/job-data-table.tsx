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

import type { IUsePaginationReturn, IUseSortingReturn } from "@/types/hook";
import { DataTableHeader } from "@/features/job/components/data-table-header";
import type { IFiltersJobManager } from "../types/hook";
import { ROUTES } from "@/data/routes";

interface JobDataTableProps {
  data: Job[];
  t: TFunction<"job", undefined>;
  filtersJobManager : IFiltersJobManager
  sortingManager: IUseSortingReturn<Job>;
  paginationManager: IUsePaginationReturn;
}

//TODO: Ajouter le isFavorites ou is Archived

export const JobDatable = ({
  sortingManager,
  t,
  data,
  paginationManager,
  filtersJobManager
}: JobDataTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const columns = useMemo(
    () => jobColumns(t, sortingManager),
    [t, sortingManager]
  );
  const table = useReactTable<Job>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },
    /* MANUAL OPTIONS FOR SERVER SIDE */
    manualPagination: true,
  });


  const clearParams =  ()=> {
    sortingManager.clearSorting()
    paginationManager.clearPagination()
    filtersJobManager.clearFilters()
  }

  const limitSelect = [5, 10, 15, 30, 50, 100];
  const columnsChoices = [{
    label : "Titre",
    value : "jobTitle"
  },
  {
    label : "Entreprise",
    value : "enterprise"
  },
  {
    label : "Status",
    value : "status"
  },
    {
    label : "Postuler via",
    value : "applicationMethod"
  },
      {
    label : "Postuler le",
    value : "appliedAt"
  },
]
  return (
    <div className="w-full flex flex-col mt-4 ">
      <DataTableHeader
        {...{
          t,
          filtersJobManager,
          clearParams,
          columns: table
            .getAllColumns()
            .filter((column) => column.getCanHide()),
          addItemLink: `/${ROUTES.job.create}`,
          columnsChoices
        }}
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
                  colSpan={jobColumns?.length}
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
              {limitSelect.map((limit) => (
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
