import { useTranslation } from "react-i18next";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectFieldProps<TFormData extends FieldValues> {
  label: string;
  name: Path<TFormData>;
  objectValues: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  form: UseFormReturn<TFormData, any, any>;
  required?: boolean;
}

export const SelectField = <TFormData extends FieldValues>({
  label,
  name,
  form,
  objectValues,
  placeholder,
  required = false,
}: SelectFieldProps<TFormData>) => {
  const { t } = useTranslation("common");

  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label} <span className="text-muted-foreground text-xs">{required ? ` (${t("form.required")})` : ` (${t("form.optional")})`}</span>
            </FormLabel>
            <Select required={required} onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {objectValues.map((element) => (
                  <SelectItem key={element.value} value={element.value}>{element.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
