import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface TextAreaFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;

  placeholder?: string;
  required?: boolean;
  form: UseFormReturn<TFormData>;
}


export const TextAreaField = <TFormData extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  required = false,

}: TextAreaFieldProps<TFormData> )=> {

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
            <FormMessage />
            <FormControl>
              <Textarea
                {...{
                  placeholder,
                  required,
                  ...field,
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
