import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";

interface SwitchFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;
  form: UseFormReturn<TFormData>;
}

export const SwitchField = <TFormData extends FieldValues>({
  name,
  form,
  label,
}: SwitchFieldProps<TFormData>) => {
  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label} 
              <p className="text-muted-foreground text-xs">(Optionnel)</p>
            </FormLabel>
            <FormMessage />
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
