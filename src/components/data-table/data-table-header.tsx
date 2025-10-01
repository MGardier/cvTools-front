import { ChevronDown, Plus, RotateCcw, SlidersHorizontal } from "lucide-react";
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
import type { FindAllJobParams } from "@/features/job/types/data-table";
import type { Dispatch, SetStateAction } from "react";

interface DataTableHeaderProps {
  columns: Column<Job, unknown>[];
  addItemLink: string;
  params: FindAllJobParams;
  setParams: Dispatch<SetStateAction<FindAllJobParams>>;
}

export const DataTableHeader = ({
  columns,
  addItemLink,
  params,
  setParams,
}: DataTableHeaderProps) => {
  const navigate = useNavigate();

  const resetParams = () =>
    setParams({
      currentPage: 1,
      limit: 5,
      sorting: [],
      jobTitle: "",
      enterprise: "",
      status: undefined,
      applicationMethod: undefined,
      appliedAt: {
        value: undefined,
        operator: undefined,
        secondValue: undefined,
      },
    });

  return (
    <div className="md: flex  justify-between items-center py-4 mx-2">
      <div className="flex justify-center items-center gap-2">
        <Button className="flex  gap-2  text-white" variant="blue">
          <SlidersHorizontal />
          FIlter
        </Button>
        <Button className="flex  gap-2  text-white" variant="blue" onClick={resetParams}>
          <RotateCcw />
          Reinitialiser
        </Button>
      </div>
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
