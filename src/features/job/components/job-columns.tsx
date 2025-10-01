import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Job } from "@/types/entity";
import {
  formatDate,
  splitTextAtSpaces,
} from "@/utils/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Building2,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { FindAllJobParams } from "../types/data-table";
import type { SortFilterItem } from "@/types/data-table";

export const jobColumns = (
  t: TFunction,
  params: FindAllJobParams,
  setParams: Dispatch<SetStateAction<FindAllJobParams>>
): ColumnDef<Job>[] => {
  const sortingFields = params.sorting;
  const updateSort = (field: keyof Job) => {
    const existingIndex = sortingFields.findIndex(
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

      let nextDirection: "asc" | "desc" = "asc";
      if (direction === "asc") nextDirection = "desc";

      setParams((prevParam) => {
        return {
          ...prevParam,
          sorting: prevParam.sorting.map((sortItem) =>
            sortItem.field === field
              ? { field, direction: nextDirection }
              : sortItem
          ),
        };
      });
    }
  };



  return [
    {
      accessorKey: "jobTitle",
      header: () => {
        const field: SortFilterItem<Job> | undefined = sortingFields.find(
          (sort) => sort.field === "jobTitle"
        );
        return (
          <Button variant="ghost" onClick={() => updateSort("jobTitle")}>
            {t("pages.findAll.columns.jobTitle")}

            {!field && <ArrowDownUp onClick={() => updateSort("jobTitle")} />}
            {field?.direction === "asc" && (
              <ArrowUpWideNarrow
                onClick={() => updateSort("jobTitle")}
                className="text-blue-500"
              />
            )}
            {field?.direction === "desc" && (
              <ArrowDownWideNarrow
                onClick={() => updateSort("jobTitle")}
                className="text-blue-500"
              />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const splitJobTitle = splitTextAtSpaces(row.getValue("jobTitle"), 18);

        return (
          <span className="font-medium text-gray-900 ">{splitJobTitle}</span>
        );
      },
    },
    {
      accessorKey: "enterprise",
      header: () => {
                const field: SortFilterItem<Job> | undefined = sortingFields.find(
          (sort) => sort.field === "enterprise"
        );
        return (
          <Button variant="ghost" onClick={() => updateSort("enterprise")}>
            {t("pages.findAll.columns.enterprise")}

            {!field && <ArrowDownUp onClick={() => updateSort("enterprise")} />}
            {field?.direction === "asc" && (
              <ArrowUpWideNarrow
                onClick={() => updateSort("enterprise")}
                className="text-blue-500"
              />
            )}
            {field?.direction === "desc" && (
              <ArrowDownWideNarrow
                onClick={() => updateSort("enterprise")}
                className="text-blue-500"
              />
            )}
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
      header: () => {
                const field: SortFilterItem<Job> | undefined = sortingFields.find(
          (sort) => sort.field === "status"
        );
        return (
          <Button variant="ghost" onClick={() => updateSort("status")}>
            {t("pages.findAll.columns.status")}

            {!field && <ArrowDownUp onClick={() => updateSort("status")} />}
            {field?.direction === "asc" && (
              <ArrowUpWideNarrow
                onClick={() => updateSort("status")}
                className="text-blue-500"
              />
            )}
            {field?.direction === "desc" && (
              <ArrowDownWideNarrow
                onClick={() => updateSort("status")}
                className="text-blue-500"
              />
            )}
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
      header: () => {
                const field: SortFilterItem<Job> | undefined = sortingFields.find(
          (sort) => sort.field === "applicationMethod"
        );
        return (
          <Button variant="ghost" onClick={() => updateSort("applicationMethod")}>
            {t("pages.findAll.columns.applicationMethod")}

            {!field && <ArrowDownUp onClick={() => updateSort("applicationMethod")} />}
            {field?.direction === "asc" && (
              <ArrowUpWideNarrow
                onClick={() => updateSort("applicationMethod")}
                className="text-blue-500"
              />
            )}
            {field?.direction === "desc" && (
              <ArrowDownWideNarrow
                onClick={() => updateSort("applicationMethod")}
                className="text-blue-500"
              />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        return row.getValue("applicationMethod");
      },
    },

    {
      accessorKey: "appliedAt",
      header: () => {
                const field: SortFilterItem<Job> | undefined = sortingFields.find(
          (sort) => sort.field === "appliedAt"
        );
        return (
          <Button variant="ghost" onClick={() => updateSort("appliedAt")}>
            {t("pages.findAll.columns.appliedAt")}

            {!field && <ArrowDownUp onClick={() => updateSort("appliedAt")} />}
            {field?.direction === "asc" && (
              <ArrowUpWideNarrow
                onClick={() => updateSort("appliedAt")}
                className="text-blue-500"
              />
            )}
            {field?.direction === "desc" && (
              <ArrowDownWideNarrow
                onClick={() => updateSort("appliedAt")}
                className="text-blue-500"
              />
            )}
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
