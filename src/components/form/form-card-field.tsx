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
  required?: boolean;
  form: UseFormReturn<TFormData>;
  step?: number;
}

export const FormCardField = <TFormData extends FieldValues>({
  form,
  label,
  name,
  type,
  placeholder,
  required = false,
  step,
}: FormCardFieldProps<TFormData>) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}{" "}
              <p className="text-muted-foreground text-xs">
                {required ? " (Requis)" : " (Optionnel)"}
              </p>
            </FormLabel>
            <FormControl>
              <Input
                {...{
                  placeholder,
                  type,
                  required,
                  ...field,
                  ...(type === "number" ? { step } : {}),
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
