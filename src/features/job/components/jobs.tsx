import * as React from "react"
import {
 type ColumnDef,
type   ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import type { Job } from "@/types/entity"
import { jobColumns } from './job-columns';



const data = [{
   id: 1,
   enterprise: "entreprise",
   type: "ENTERPRISE",
   link: "",
   jobTitle: "Développeur Fullstack React/ NOdejs",
   managerName: "Jean eudes ",
   managerEmail: "JeanEudes@gmail.com",
   status:  "NEED_TO_CONTACT",
   priority:   "PERFECT",
   applicationMethod: "SITE_WEB",
   origin: "HELLOWORK",
   interviewCount: 0,
   archived: false,
   createdAt: new Date(),
      appliedAt: new Date(),
   technologies: [{id: 1, name: "React"},{id: 1, name: "NestJs"},],
   adress : {
    id:1,
    city: "Paris",
    postalCode : "60280",
   },
   user: {
      id: 55,
      email: "JeanEudes@gmail.com",
      status:   "ALLOWED",
      roles:   "USER",
   }
},{
   id: 1,
   enterprise: "entreprise",
   type: "ENTERPRISE",
   link: "",
   jobTitle: "Développeur Fullstack React/ NOdejs",
   managerName: "Jean eudes ",
   managerEmail: "JeanEudes@gmail.com",
   status:  "NEED_TO_CONTACT",
   priority:   "PERFECT",
   applicationMethod: "SITE_WEB",
   origin: "HELLOWORK",
   interviewCount: 0,
   archived: false,
   createdAt: new Date(),
      appliedAt: new Date(),
   technologies: [{id: 1, name: "React"},{id: 1, name: "NestJs"},],
   adress : {
    id:1,
    city: "Paris",
    postalCode : "60280",
   },
   user: {
      id: 55,
      email: "JeanEudes@gmail.com",
      status:   "ALLOWED",
      roles:   "USER",
   }
},{
   id: 1,
   enterprise: "entreprise",
   type: "ENTERPRISE",
   link: "",
   jobTitle: "Développeur Fullstack React/ NOdejs",
   managerName: "Jean eudes ",
   managerEmail: "JeanEudes@gmail.com",
   status:  "NEED_TO_CONTACT",
   priority:   "PERFECT",
   applicationMethod: "SITE_WEB",
   origin: "HELLOWORK",
   interviewCount: 0,
   archived: false,
   createdAt: new Date(),
   appliedAt: new Date(),
   technologies: [{id: 1, name: "React"},{id: 1, name: "NestJs"},],
   adress : {
    id:1,
    city: "Paris",
    postalCode : "60280",
   },
   user: {
      id: 55,
      email: "JeanEudes@gmail.com",
      status:   "ALLOWED",
      roles:   "USER",
   }
},{
   id: 1,
   enterprise: "entreprise",
   type: "ENTERPRISE",
   link: "",
   jobTitle: "Développeur Fullstack React/ NOdejs",
   managerName: "Jean eudes ",
   managerEmail: "JeanEudes@gmail.com",
   status:  "NEED_TO_CONTACT",
   priority:   "PERFECT",
   applicationMethod: "SITE_WEB",
   origin: "HELLOWORK",
   interviewCount: 0,
   archived: false,
   createdAt: new Date(),
      appliedAt: new Date(),
   technologies: [{id: 1, name: "React"},{id: 1, name: "NestJs"},],
   adress : {
    id:1,
    city: "Paris",
    postalCode : "60280",
   },
   user: {
      id: 55,
      email: "JeanEudes@gmail.com",
      status:   "ALLOWED",
      roles:   "USER",
   }
}]



export function Jobs() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})



  
  const table = useReactTable<Job>({
    data,
    columns : jobColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("jobTitle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("jobTitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}  >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-10 px-4 text-left align-middle font-medium text-gray-700 uppercase text-xs tracking-wide">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                  colSpan={jobColumns.length}
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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
