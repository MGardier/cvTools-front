import { ChevronDown,  Plus, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Column } from "@tanstack/react-table";
import type { Job } from "@/types/entity";
import { useNavigate } from "react-router-dom";

interface DataTableHeaderProps {
  columns: Column<Job, unknown>[];
  addItemLink: string;
  setFilter: (keyWord: string) => void;
}

export const DataTableHeader = ({
  columns,
  addItemLink,
  setFilter,
}: DataTableHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="md: flex  justify-between items-center py-4 mx-2">
      <Button
        className="flex  gap-2  text-white"
        variant="blue"
      >
       <RotateCcw />
        Reinitialiser 
      </Button>
      <div className="flex  gap-2 justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Choix des colonnes <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className="flex  gap-2  text-white"
          variant="blue"
          onClick={() => navigate(addItemLink)}
        >
          <Plus />
          Ajouter
        </Button>
      </div>
    </div>
  );
};
