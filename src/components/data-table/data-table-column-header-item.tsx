import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { debounce } from "@/utils/utils";
import { useCallback, useState } from "react";

interface DataTableColumnHeaderItemProps {
  title: string;
  updateSort: (direction: "asc" | "desc" | "none") => void;
  filterValue?: string;
  selectFilterValue ?: {label: string, value: string}[]
  setFilterValue: (value: string) => void;
  filterType: "input" | "select" | "datePicker";
}

export const DataTableColumnHeaderItem = ({
  title,
  filterValue,
selectFilterValue,
  filterType,
  updateSort,
  setFilterValue,
}: DataTableColumnHeaderItemProps) => {
  const [localFilterValue, setLocalFilterValue] = useState(filterValue || "");

  const debouncedUpdate = useCallback(
    debounce((value: string) => setFilterValue(value), 500),
    [setFilterValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalFilterValue(value);
    debouncedUpdate(value);
  };

  return (
    <div className="flex flex-col justify-center items-center py-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 justify-center items-center">
            {title}
            <SlidersHorizontal size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-3xs py-4">
          {filterType === "input" && (
            <>
              <DropdownMenuLabel className="text-center">
                Recherche
              </DropdownMenuLabel>
              <Input
                type="text"
                className="h-8 w-xs max-w-52 mx-auto mb-4"
                value={localFilterValue}
                onChange={handleChange}
              />
            </>
          )}

          {filterType === "select" && (
            <>
              <DropdownMenuLabel className="text-center">
                Recherche par
              </DropdownMenuLabel>
              <Select onValueChange={setFilterValue} >
                <SelectTrigger className="w-[180px] h-8 mx-auto">
                  <SelectValue placeholder="Trier par ordre" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup>
                    <SelectItem value="none" >Aucun</SelectItem> 
                    {selectFilterValue?.map((e)=>  <SelectItem value={e.value}>{e.label}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-center">
            Trier par Ordre
          </DropdownMenuLabel>
          <Select onValueChange={updateSort}>
            <SelectTrigger className="w-[180px] h-8 mx-auto">
              <SelectValue placeholder="Trier par ordre" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectItem value="none">Aucun</SelectItem>
                <SelectItem value="asc">Croissant</SelectItem>
                <SelectItem value="desc">Décroissant</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
