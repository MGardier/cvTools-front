import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { formatDate } from "@/utils/utils";

interface DateInputProps<TFormData extends FieldValues> {
  value : any;
  handleChange : (value :Date)=> void
  label: string;
  placeholder: string;
  required?: boolean;
}

export const DatePickerInput = <TFormData extends FieldValues>({
  value,
  handleChange,
  label,
  placeholder,
  required = false,
}: DateInputProps<TFormData>) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);

  //TODO: onCLick de l'input ouvrir aussi la calendar

  return (

            <div className="relative flex gap-2">
              <Input
                id="date"
                value={value ? formatDate(value) : ""}
                placeholder={placeholder}
                className="bg-background pr-10  h-8 md:h-12 lg:h-12 w-full max-w-full"
                required={required}
                type="text"
                disableDisabledStyles={true}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  handleChange(date);

                  setDate(date);
                  setMonth(date);
                }}
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
                disabled
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">{label}</span>
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
                      handleChange(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
  );
};
