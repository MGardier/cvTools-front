import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { Content } from "@tiptap/react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

interface RichEditorFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;
  placeholder?: string;
  required?: boolean;
  form: UseFormReturn<TFormData, any, any>;
}

export const RichEditorField = <TFormData extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  required = false,
}: RichEditorFieldProps<TFormData>) => {
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
              <TooltipProvider>
                <MinimalTiptapEditor
                  value={field.value as Content}
                  onChange={(value) => field.onChange(value)}
                  placeholder={placeholder}
                  output="html"
                  immediatelyRender={false}
                  editorContentClassName="p-4 min-h-[150px]"
                />
              </TooltipProvider>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
