"use client";

import { AppLogo } from "@/components/logo/app-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Job } from "@/types/entity";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Building2, Calendar, MoreHorizontal } from "lucide-react";

export const jobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "jobTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Métier
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium text-gray-900">
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
          Entreprise
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="flex items-center justify-items-center gap-2 text-gray-600" ><Building2 className="text-gray-400" size={16}/>{row.getValue("enterprise")}</span>;
    },
  },
  {
    accessorKey: "origin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Provenance
          <ArrowUpDown />
        </Button>
      );
    },
    cell: () => {
      return <AppLogo className="text-sm " />;
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
          Statut
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Badge variant={"warning"}>{row.getValue("status")}</Badge>;
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
          Postulée le
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("appliedAt"));

      return (
        <span className="flex items-center justify-items-center gap-2 text-sm text-gray-600"> <Calendar className="text-gray-400" size={16}/>{date.toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})}</span>
      );
    },
  },
  {
    id: "actions",
     header: () => {
      return (
        <Button
          variant="ghost"
        >
          Actions

        </Button>
      );
    },
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
