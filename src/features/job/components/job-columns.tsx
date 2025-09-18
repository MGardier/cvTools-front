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
import { ArrowUpDown, Building2, Calendar, MoreHorizontal } from "lucide-react";


//TODO : mettre un event listener pour ajuster le mobile
const isMobile = window.innerWidth <= 768;

export const jobColumns = (t: TFunction): ColumnDef<Job>[] => [
  {
    accessorKey: "jobTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("pages.jobs.columns.jobTitle")}
          <ArrowUpDown />
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
          <Badge className="text-xs md:text-sm lg:text-sm" variant={"warning"}>
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("pages.jobs.columns.enterprise")}
          <ArrowUpDown />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("pages.jobs.columns.status")}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge className="text-sm md:text-sm lg:text-sm" variant={"warning"}>
          {t(`pages.jobs.status.${String(row.getValue("status")).toLowerCase()}`)}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("pages.jobs.columns.applicationMethod")}
          <ArrowUpDown />
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("pages.jobs.columns.appliedAt")}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("appliedAt"))
        return (
          <span className="flex items-center justify-items-center gap-2 text-sm text-gray-600">
            {t("pages.jobs.columns.empty")}
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
          <Button variant="ghost">{t("pages.jobs.columns.actions")}</Button>
        </div>
      );
    },
    cell: ({row}) => (
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
