import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import type { ISelectValues } from "@/common/types/form";


export interface SelectInputProps {
  required?: boolean;
  handleOnChange: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
  selectValues: ISelectValues[];
}

export const SelectInput = ({
  required = true,
  handleOnChange,
  defaultValue,
  placeholder,
  selectValues,
}: SelectInputProps) => {
  return (
    <Select
      required={required}
      onValueChange={handleOnChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectValues.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
