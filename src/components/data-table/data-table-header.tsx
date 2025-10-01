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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FilterTextField } from "./filter-text-field";

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

  const 

  return (
    <div className="md: flex  justify-between items-center py-4 mx-2">
      <div className="flex justify-center items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex  gap-2  text-white" variant="blue">
              <SlidersHorizontal />
              FIlter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md flex flex-col ">
            <DialogHeader>
              <DialogTitle>Filtres </DialogTitle>
              <DialogDescription>Filtrer les candidatures.</DialogDescription>
            </DialogHeader>
            <div className="flex  flex-col justify-center items-center gap-4">

              <FilterTextField 
              {...{label,
                defaultValue : params.jobTitle
                
              }}/>

              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="">
                  Recherche par titre
                </Label>
                <Input
                type="text"
                className="h-8 w-xs max-w-52 mx-auto mb-4"
                value={params.jobTitle}
                onChange={(e)=> setParams((prevParams)=> {return {
                  ...prevParams,
                  jobTitle : e.target.value
                }}) }
              />

              </div>

                            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="">
                  Recherche par Entreprise
                </Label>
                <Input
                type="text"
                className="h-8 w-xs max-w-52 mx-auto mb-4"
                value={params.jobTitle}
               // onChange={handleChange}
              />

              </div>

                                          <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="">
                  Egal au Statut
                </Label>
                <Input />

              </div>

                                                        <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="">
                  Par Postuler via 
                </Label>
                <Input />

              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button className="flex  gap-2  text-white" variant="blue">
                  Appliquer
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          className="flex  gap-2  text-white"
          variant="blue"
          onClick={resetParams}
        >
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
