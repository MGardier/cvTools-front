import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/utils/utils";
import { Star } from "lucide-react";

interface RatingFieldProps<TFormData extends FieldValues> {
  label?: string;
  name: Path<TFormData>;
  min: number;
  max: number;
  required?: boolean;
  form: UseFormReturn<TFormData>;
}

export const RatingField = <TFormData extends FieldValues>({
  form,
  label,
  name,
  min,
  max,
  required = false,
}: RatingFieldProps<TFormData>) => {
  const currentValue = form.watch(name) || min;
  const handleStarClick = (rating: number) => {

    form.setValue(name, rating as PathValue<TFormData, typeof name>, {
      shouldDirty: true,
    });
  };

  return (
    <div className="grid gap-3">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              <p className="text-muted-foreground text-xs">
                {required ? " (Requis)" : " (Optionnel)"}
              </p>
            </FormLabel>
            <FormMessage />
            <div className="my-2 flex justify-start items-center gap-1">
              {Array.from({ length: max }, (_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= currentValue;

                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => handleStarClick(starValue)}
                  >
                    <Star
                      className={cn(
                        "w-6 h-6 transition-colors",
                        isFilled
                          ? " text-blue-400/80"
                          : "text-gray-300 hover:text-blue-400/80"
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <FormControl>
              <Input
                {...{
                  type: "hidden",
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
