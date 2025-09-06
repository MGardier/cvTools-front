import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { FormField, FormItem, FormLabel } from "../ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";



interface DatePickerFieldProps<TFormData extends FieldValues>{
  label: string;
  placeholder: string;
  selectLabel: string;
  name:Path<TFormData>;
  form: UseFormReturn<TFormData>;
  required?: boolean;
}

export const DatePickerField = <TFormData extends FieldValues>({
  form,
  label,
  selectLabel,
  placeholder,
  name,
  required =false
}: DatePickerFieldProps<TFormData>) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);

//TODO: onCLick de l'input ouvrir aussi la calendar
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="date" className="px-1">
              {label} <p className="text-muted-foreground text-xs">{required ? ' (Requis)' : ' (Optionnel)'}</p>
            </FormLabel>
            <div className="relative flex gap-2">
              <Input
  
                id="date"
                value={field.value}
                placeholder={placeholder}
                className="bg-background pr-10"
                required = {required}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  field.onChange(date);
                  if (isValidDate(date)) {
                    setDate(date);
                    setMonth(date);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">{selectLabel}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      field.onChange(formatDate(date));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
