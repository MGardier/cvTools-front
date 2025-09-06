import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TFunction } from "i18next";
import { Plus, X } from "lucide-react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";

interface TechnologiesFormProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
  technologiesFields: UseFieldArrayReturn<
    z.infer<ReturnType<typeof createJobSchema>>
  >;
  isTechnologyFieldInError: boolean;
}
//TODO: AUTO Complete

export const TechnologiesForm = ({
  t,
  form,
  technologiesFields,
  isTechnologyFieldInError,
}: TechnologiesFormProps) => {
  const technologies = technologiesFields.fields.filter((_, index) => {
    const value = form.watch(`technologies.${index}.name`);
    return (
      value && value.trim() && index < technologiesFields.fields.length - 1
    );
  });

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <FormLabel>
          <div className="flex flex-col justitfy-left items-left gap-2">
            <p className={isTechnologyFieldInError ? "text-destructive" : ""}>
              {t("pages.createJob.form.technologies.label")}{" "}
              <span className="text-muted-foreground text-xs"> (Requis)</span>
            </p>

            {isTechnologyFieldInError && (
              <p className="text-destructive text-sm font-normal">
                {t("validation.technologies.required")}
              </p>
            )}
          </div>
        </FormLabel>

        <div className="flex flex-wrap gap-2 ">
          {technologies.map((tech, index) => (
            <Badge
              variant="outline_blue"
              key={`${tech}-${index}`}
              onClick={() => technologiesFields.remove(index)}
            >
              {form.watch(`technologies.${index}.name`)}
              <X />
            </Badge>
          ))}
        </div>
        {technologiesFields.fields.map((field, index) => {
          const isLast = index === technologiesFields.fields.length - 1;
          return (
            <FormField
              key={field.id}
              control={form.control}
              name={`technologies.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2 items-center justify-center">
                      <Input
                        className={
                          isTechnologyFieldInError
                            ? "border-destructive  ring-destructive/20"
                            : ""
                        }
                        type={isLast ? "text" : "hidden"}
                        placeholder={t(
                          "pages.createJob.form.technologies.placeholder"
                        )}
                        {...field}
                        required
                      />
                      {isLast && (
                        <Button
                          onClick={() => {
                            if (field.value !== "" && field.value) {
                              technologiesFields.append({ name: "" });
                            }
                          }}
                          type="button"
                          className=" w-6flex gap-2  text-white"
                          size="form"
                          variant="blue"
                        >
                          <Plus />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
