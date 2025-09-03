import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";


interface FormCardFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;
  type: string;
  placeholder?: string;
  required ?: boolean;
  form: UseFormReturn<TFormData>;
}

export const FormCardField = <TFormData extends FieldValues>  ({
  form,
  label,
  name,
  type,
  required = false,
  placeholder,
}: FormCardFieldProps<TFormData>) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
              <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...{placeholder,type,required,...field}}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
