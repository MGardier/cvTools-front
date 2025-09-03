import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectFieldProps<TFormData extends FieldValues> {
  label: string;
  name:Path<TFormData>;
  objectValues: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  form: UseFormReturn<TFormData>;
}

export const SelectField = <TFormData extends FieldValues>({
  label,
  name,
  form,
  objectValues,
  placeholder,
}: SelectFieldProps<TFormData>) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {objectValues.map((element) => (
                  <SelectItem value={element.value}>{element.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};
