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
import { formatDate, splitTextAtSpaces } from "@/utils/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import {

  Building2,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

import type { IUseSortingReturn } from "@/types/hook";
import { ColumnHeader } from "@/components/data-table/column-header";

export const jobColumns = (
  t: TFunction,
  sortingManager: IUseSortingReturn<Job>
): ColumnDef<Job>[] => {

  return [


    /************** JOB TITLE************* */

    {
      accessorKey: "jobTitle",
      header: () => {
        return (
          <ColumnHeader<Job>
            {...{
              column: "jobTitle",
              title: t("pages.findAll.columns.jobTitle"),
              sortingManager,
            }}
          />
        );
      },
      cell: ({ row }) => {
        const splitJobTitle = splitTextAtSpaces(row.getValue("jobTitle"), 18);

        return (
          <span className="font-medium text-gray-900 ">{splitJobTitle}</span>
        );
      },
    },


    /************** ENTERPRISE ************* */
    {
      accessorKey: "enterprise",
      header: () => {
        return (
          <ColumnHeader<Job>
            {...{
              column: "enterprise",
              title: t("pages.findAll.columns.enterprise"),
              sortingManager,
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

    /************** STATUS ************* */
    {
      accessorKey: "status",
      header: () => {
        return (
          <ColumnHeader<Job>
            {...{
              column: "status",
              title: t("pages.findAll.columns.status"),
              sortingManager,
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

    /************** APPLICATION METHOD ************* */
    {
      accessorKey: "applicationMethod",
      header: () => {
        return (
          <ColumnHeader<Job>
            {...{
              column: "applicationMethod",
              title: t("pages.findAll.columns.applicationMethod"),
              sortingManager,
            }}
          />
        );
      },
      cell: ({ row }) => {
        return row.getValue("applicationMethod");
      },
    },


    /************** APPLIED AT ************* */
    {
      accessorKey: "appliedAt",
      header: () => {
        return (
          <ColumnHeader<Job>
            {...{
              column: "appliedAt",
              title: t("pages.findAll.columns.appliedAt"),
              sortingManager,
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


    /************** ACTIONS ************* */
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
