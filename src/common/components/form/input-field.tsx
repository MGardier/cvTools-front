import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface InputFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;
  type: string;
  placeholder?: string;
  required?: boolean;
  form: UseFormReturn<TFormData>;
  step?: number;
}

export const InputField = <TFormData extends FieldValues>({
  form,
  label,
  name,
  type,
  placeholder,
  required = false,
  step,
}: InputFieldProps<TFormData>) => {
  return (
    <div className="space-y-3 ">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">
              {label}{" "}
              <p className="text-muted-foreground text-xs">
                {required ? " (Requis)" : " (Optionnel)"}
              </p>
            </FormLabel>
            <FormMessage />
            <FormControl>
              <Input
                {...{
                  className: "h-8 md:h-12 lg:h-12 w-full max-w-full",
                  placeholder,
                  type,
                  required,
                  ...field,
                  ...(type === "number" ? { step } : {}),
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
