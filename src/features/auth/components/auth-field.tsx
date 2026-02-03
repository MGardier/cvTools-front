import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";


interface AuthFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;
  type: string;
  placeholder?: string;
  required ?: boolean;
  form: UseFormReturn<TFormData>;
}

export const AuthField = <TFormData extends FieldValues>  ({
  form,
  label,
  name,
  type,
  required = false,
  placeholder,
}: AuthFieldProps<TFormData>) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
              <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...{className: "h-8 md:h-12 lg:h-12 w-full max-w-full",placeholder,type,required,...field}}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
