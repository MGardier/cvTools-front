import type { Job } from "@/types/entity";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { jobColumns } from "./job-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { DataTableHeader } from "@/components/data-table/data-table-header";
import { ROUTES } from "@/data/routes";
import type { FindAllJobParams } from "../types/data-table";

interface JobDataTableProps {
  data: Job[];
  t: TFunction<"job", undefined>;
  count?: number;
  params: FindAllJobParams;
  setParams: Dispatch<SetStateAction<FindAllJobParams>>;
  maxPage?: number;
}

//TODO: Ajouter le isFavorites ou is Archived

export const JobDatable = ({
  t,
  data,
  count,
  setParams,
  params,
  maxPage,
}: JobDataTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const columns = useMemo(() => jobColumns(t, params, setParams), [params]);
  const table = useReactTable<Job>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },
    /* MANUAL OPTIONS FOR SERVER SIDE */
    manualPagination: true,
    pageCount: maxPage,
  });

  const limitSelect = [5, 10, 15, 20];
  return (
    <div className="w-full flex flex-col mt-4 ">
      <DataTableHeader
        {...{
          params,
          setParams,
          columns: table
            .getAllColumns()
            .filter((column) => column.getCanHide()),
          addItemLink: `/${ROUTES.job.create}`,
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

      <div className="flex items-center justify-between gap-2  py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="hidden items-center gap-2 lg:flex w-content">
          {/* ajouter le nombre de de pages sur */}
          <Label>{t("pages.findAll.limitPerPage")}</Label>
          <Select
            required
            onValueChange={(value) =>
              setParams((prevParams) => {
                return { ...prevParams, limit: Number(value), currentPage: 1 };
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={params.limit} />
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

        <div className="space-x-2 ">
          <DataTablePagination
            {...{
              currentPage: params.currentPage,
              setParams,
              maxPage: maxPage!,
            }}
          />
        </div>
      </div>
    </div>
  );
};
