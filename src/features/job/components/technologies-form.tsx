import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TFunction } from "i18next";
import { Plus, X } from "lucide-react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type { createJobSchema } from "../schema/job-schema";
import type z from "zod";
import { useState } from "react";

interface TechnologiesFormProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
  technologiesFields: UseFieldArrayReturn<
    z.infer<ReturnType<typeof createJobSchema>>
  >;
}

export const TechnologiesForm = ({
  t,
  form,
  technologiesFields,
}: TechnologiesFormProps) => {
  const [techBadges, setTechBadges] = useState<{ name: string }[]>([]);
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <FormLabel>{t("pages.createJob.form.technologies.label")}</FormLabel>
        <div className="flex flex-wrap gap-2 ">
          {techBadges.map((tech, index) => (
            <Badge
              variant="outline_blue"
              key={`${tech.name}-${index}`}
              onClick={() => {
                technologiesFields.remove(index);
                setTechBadges((prevState) =>
                  prevState.filter((prevTech) => prevTech !== tech)
                );
              }}
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
                        type={isLast ? "text" : "hidden"}
                        placeholder={t("pages.createJob.form.technologies.placeholder")}
                        {...field}
                        required
                      />
                      {isLast && (
                        <Button
                          onClick={() => {
                            technologiesFields.append({ name: "name" });
                            setTechBadges((prevState) => [
                              ...prevState,
                              {
                                name: form.watch(`technologies.${index}.name`),
                              },
                            ]);
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
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
