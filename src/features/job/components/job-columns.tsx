import { DataTableColumnHeaderItem } from "@/components/data-table/data-table-column-header-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableParams } from "@/types/data-table";
import type { Job } from "@/types/entity";
import { formatDate, splitTextAtSpaces } from "@/utils/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Building2, Calendar, MoreHorizontal } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export const jobColumns = (
  t: TFunction,
  params: DataTableParams,
  setParams: Dispatch<SetStateAction<DataTableParams>>
): ColumnDef<Job>[] => {
  const updateSort = (field: string, direction: "asc" | "desc" | "none") => {
    setParams((prevParam) => {
      const otherSorts = prevParam.sorting.filter((s) => s.field !== field);

      if (direction !== "none")
        return {
          ...prevParam,
          sorting: [...otherSorts, { field, direction }],
        };
      else
        return {
          ...prevParam,
          sorting: otherSorts,
        };
    });
  };

  const setFilter = (field: string, value: string) =>
    setParams((prev) => {
      const newFilters = {...prev.filters};

      if (!value) delete newFilters[field];
      else newFilters[field] = value;
      return {
        ...prev,
        filters: newFilters,
        currentPage:1,
      };
    });

  return [
    {
      accessorKey: "jobTitle",
      header: () => {
        return (
          <DataTableColumnHeaderItem
            {...{
              title: t("pages.findAll.columns.jobTitle"),
              updateSort: (direction: "asc" | "desc" | "none") =>
                updateSort("jobTitle", direction),
              sortDirection: params.sorting.find(
                (sortItem) => sortItem.field === "jobTitle"
              )?.direction,
              filterValue : params.filters['jobTitle'],
              setFilterValue: (value: string) => setFilter("jobTitle", value),
            }}
          />
        );
      },
      cell: ({ row }) => {
        //TODO: S'occuper des titres trop long et corriger le probléme
        const splitJobTitle = splitTextAtSpaces(row.getValue("jobTitle"), 18);

        return (
          <span className="font-medium text-gray-900 ">
            {row.getValue("jobTitle")}
          </span>
        );
      },
    },
    {
      accessorKey: "enterprise",
      header: () => {
        return (
          <DataTableColumnHeaderItem
            {...{
              title: t("pages.findAll.columns.enterprise"),

              updateSort: (direction: "asc" | "desc" | "none") =>
                updateSort("enterprise", direction),
              sortDirection: params.sorting.find(
                (sortItem) => sortItem.field === "enterprise"
              )?.direction,
              setFilterValue: (value: string) => setFilter("enterprise", value),
            }}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <span className="flex items-center justify-items-center gap-2 text-gray-600">
            <Building2 className="text-gray-400" size={16} />
            {row.getValue("enterprise")}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <DataTableColumnHeaderItem
            {...{
              title: t("pages.findAll.columns.status"),

              updateSort: (direction: "asc" | "desc" | "none") =>
                updateSort("status", direction),
              sortDirection: params.sorting.find(
                (sortItem) => sortItem.field === "status"
              )?.direction,
              setFilterValue: (value: string) => setFilter("status", value),
            }}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <Badge className="text-sm md:text-sm lg:text-sm" variant={"warning"}>
            {t(
              `pages.findAll.status.${String(
                row.getValue("status")
              ).toLowerCase()}`
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: "applicationMethod",
      header: () => {
        return (
          <DataTableColumnHeaderItem
            {...{
              title: t("pages.findAll.columns.applicationMethod"),
              updateSort: (direction: "asc" | "desc" | "none") =>
                updateSort("applicationMethod", direction),
              sortDirection: params.sorting.find(
                (sortItem) => sortItem.field === "applicationMethod"
              )?.direction,
              setFilterValue: (value: string) =>
                setFilter("applicationMethod", value),
            }}
          />
        );
      },
      cell: ({ row }) => {
        return row.getValue("applicationMethod");
      },
    },

    {
      accessorKey: "appliedAt",
      header: ({ column }) => {
        return (
          <DataTableColumnHeaderItem
            {...{
              title: t("pages.findAll.columns.appliedAt"),
              updateSort: (direction: "asc" | "desc" | "none") =>
                updateSort("appliedAt", direction),
              sortDirection: params.sorting.find(
                (sortItem) => sortItem.field === "appliedAt"
              )?.direction,
              setFilterValue: (value: string) => setFilter("appliedAt", value),
            }}
          />
        );
      },
      cell: ({ row }) => {
        if (!row.getValue("appliedAt"))
          return (
            <span className="flex items-center justify-items-center gap-2 text-sm text-gray-600">
              {t("pages.findAll.columns.empty")}
            </span>
          );
        return (
          <span className="flex items-center justify-items-center gap-2 text-sm text-gray-600">
            <Calendar className="text-gray-400" size={16} />
            {formatDate(new Date(row.getValue("appliedAt")))}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <Button variant="ghost">
              {t("pages.findAll.columns.actions")}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
};
