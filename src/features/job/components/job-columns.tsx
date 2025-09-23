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
import { cn, formatDate, splitTextAtSpaces } from "@/utils/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ArrowUpDown, Building2, Calendar, MoreHorizontal } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

//TODO : mettre un event listener pour ajuster le mobile
const isMobile = window.innerWidth <= 768;

export const jobColumns = (
  t: TFunction,
  params: DataTableParams,
  setParams: Dispatch<SetStateAction<DataTableParams>>
): ColumnDef<Job>[] => {
  const addOrUpdateSort = (field: string) => {
    const existingIndex = params.sorting.findIndex(
      (sort) => sort.field === field
    );

    if (existingIndex === -1) {
      setParams((prevParam) => {
        return {
          ...prevParam,
          sorting: [...prevParam.sorting, { field, direction: "asc" }],
        };
      });
    } else {
      const direction = params.sorting[existingIndex].direction;

      if (direction === "asc")
        setParams((prevParam) => {
          return {
            ...prevParam,
            sorting: prevParam.sorting.map((sortItem) =>
              sortItem.field === field ? { field, direction: "desc" } : sortItem
            ),
          };
        });
      else
        setParams((prevParam) => {
          return {
            ...prevParam,
            sorting: prevParam.sorting.filter(
              (sortItem) => sortItem.field !== field
            ),
          };
        });
    }
  };

  return [
    {
      accessorKey: "jobTitle",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => addOrUpdateSort("jobTitle")}>
            {t("pages.findAll.columns.jobTitle")}
            <ArrowUpDown className={params.sorting.some((sortingItem) => sortingItem.field === "jobTitle") ? "text-blue-500" : ""  }/>
          </Button>
        );
      },
      cell: ({ row }) => {
        const splitJobTitle = splitTextAtSpaces(row.getValue("jobTitle"), 18);

        return isMobile ? (
          <div className="flex flex-col justify-start items-start gap-2">
            {splitJobTitle.map((text) => (
              <span
                key={`${text}-${row.getValue("enterprise")}`}
                className="font-medium text-gray-900 text-sm"
              >
                {text}
              </span>
            ))}
            <Badge
              className="text-xs md:text-sm lg:text-sm"
              variant={"warning"}
            >
              {row.getValue("enterprise")}
            </Badge>
            <span className="flex items-center justify-items-center gap-2 text-gray-500 text-xs">
              <Building2 className="text-gray-400" size={12} />
              {row.getValue("enterprise")}
            </span>

            <span className="flex items-center justify-items-center gap-2 text-xs text-gray-600">
              <Calendar className="text-gray-400" size={12} />
              {formatDate(new Date(row.getValue("appliedAt")))}
            </span>
          </div>
        ) : (
          <span className="font-medium text-gray-900 ">
            {row.getValue("jobTitle")}
          </span>
        );
      },
    },
    {
      accessorKey: "enterprise",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => addOrUpdateSort("enterprise")}>
            {t("pages.findAll.columns.enterprise")}
            <ArrowUpDown className={params.sorting.some((sortingItem) => sortingItem.field === "enterprise") ? "text-blue-500" : ""  }/>
          </Button>
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => addOrUpdateSort("status")}
          >
            {t("pages.findAll.columns.status")}
            <ArrowUpDown className={params.sorting.some((sortingItem) => sortingItem.field === "status") ? "text-blue-500" : ""  }/>
          </Button>
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => addOrUpdateSort("applicationMethod")}
          >
            {t("pages.findAll.columns.applicationMethod")}
            <ArrowUpDown className={params.sorting.some((sortingItem) => sortingItem.field === "applicationMethod") ? "text-blue-500" : ""  }/>
          </Button>
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
          <Button variant="ghost" onClick={() => addOrUpdateSort("appliedAt")}>
            {t("pages.findAll.columns.appliedAt")}
            <ArrowUpDown className={params.sorting.some((sortingItem) => sortingItem.field === "appliedAt") ? "text-blue-500" : ""  }/>
          </Button>
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
