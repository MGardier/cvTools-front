import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { Content } from "@tiptap/react";
import { lazy, Suspense } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

const MinimalTiptapEditor = lazy(
  () => import("@/components/ui/minimal-tiptap/minimal-tiptap"),
);

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
                <Suspense
                  fallback={
                    <div className="min-h-[150px] w-full animate-pulse rounded-md border bg-muted/40" />
                  }
                >
                  <MinimalTiptapEditor
                    value={field.value as Content}
                    onChange={(value) => field.onChange(value)}
                    placeholder={placeholder}
                    output="html"
                    immediatelyRender={false}
                    editorContentClassName="p-4 min-h-[150px]"
                  />
                </Suspense>
              </TooltipProvider>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
