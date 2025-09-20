import type { Job } from "@/types/entity";
import { flexRender, getCoreRowModel, useReactTable, type VisibilityState } from "@tanstack/react-table";
import { useState, type Dispatch, type SetStateAction } from "react";
import { jobColumns } from "./job-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TFunction } from "i18next";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

interface JobDataTableProps  {
  data: Job[];
  t: TFunction<'job',undefined>;
  count ?: number;
  maxPage?: number;
  setCurrentPage : Dispatch<SetStateAction<number>> ;
  currentPage : number;

}



export const JobDatable = ({t,data,count,maxPage,setCurrentPage,currentPage} : JobDataTableProps)=> {
  const isMobile = window.innerWidth <= 768;
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({
      enterprise: !isMobile,
      origin: !isMobile,
      appliedAt: !isMobile,
      status: !isMobile,
      applicationMethod: !isMobile,
    });


  const table = useReactTable<Job>({
    data ,
    columns: jobColumns(t),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {columnVisibility},
    /* MANUAL OPTIONS FOR SERVER SIDE */
       manualPagination: true,
    pageCount: maxPage,
  });
  
  return (
    <div className="w-full">
      <div className="md:flex lg:flex flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="Filter emails..."
          value={
            (table.getColumn("jobTitle")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("jobTitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />
        <div className="flex  gap-2 justify-center items-center">
          <Button className="flex  gap-2  text-white" variant="blue" >
            <Plus />
            Ajouter
          </Button>
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-10 px-4 text-left align-middle font-medium text-gray-700 uppercase text-xs tracking-wide"
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows?.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <DataTablePagination {...{
            t,
            currentPage,
            setCurrentPage,
            length : maxPage!
          }}/>
        </div>
      </div>
    </div>)
}