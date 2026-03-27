import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";


interface IInputFieldProps<TFormData extends FieldValues> {
  label?: string;
  labelRight?: React.ReactNode;
  name: Path<TFormData>;
  type: string;
  placeholder?: string;
  required?: boolean;
  form: UseFormReturn<TFormData, any, any>;
  step?: number;
}

export const InputField = <TFormData extends FieldValues>({
  form,
  label,
  labelRight,
  name,
  type,
  required = false,
  placeholder,
  step,
}: IInputFieldProps<TFormData>) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{label} <span className="text-muted-foreground text-xs">{required ? ' (Requis)' : ' (Optionnel)'}</span></FormLabel>
                {labelRight}
              </div>
            <FormControl>
              <Input {...{className: "h-8 md:h-12 lg:h-12 w-full max-w-full",placeholder ,type ,required ,...field, ...(type === "number" ? { step } : {})}}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
