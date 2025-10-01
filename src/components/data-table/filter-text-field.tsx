import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { debounce } from "@/utils/utils";

interface FilterTextFieldProps {
  label: string;
  defaultValue: string;
  setFilter: (value: string) => void;
}

export const FilterTextField = ({
  label,
  defaultValue,
  setFilter,
}: FilterTextFieldProps) => {
  const [value, setValue] = useState(defaultValue);
  const debouncedSetFilter = debounce((value: string) => setFilter(value), 2000);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    debouncedSetFilter(value);
  };

  return (
    <div className="grid flex-1 gap-2">
      <Label htmlFor="link" className="">
        {label}
      </Label>
      <Input
        type="text"
        className="h-8 w-xs max-w-52 mx-auto mb-4"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};
