import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { cn } from "@/shared/utils/utils";

interface IMultiSelectOption {
  value: string;
  label: string;
}

interface IMultiSelectInputProps {
  options: IMultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  countLabel?: (count: number) => string;
  className?: string;
}

export const MultiSelectInput = ({
  options,
  selected,
  onChange,
  placeholder,
  countLabel,
  className,
}: IMultiSelectInputProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(next);
  };

  const displayText =
    selected.length > 0
      ? countLabel
        ? countLabel(selected.length)
        : `${selected.length} selected`
      : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-between w-full text-left text-sm",
            selected.length === 0 && "text-offgreen-dark",
            className
          )}
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className="w-4 h-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start" sideOffset={8}>
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer hover:bg-accent transition-colors text-sm"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
