import { useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";

import { skillService } from "@/lib/api/skill/skill.service";
import type { IExtractedApplication } from "@/lib/api/scraper/types";
import type { ISkill } from "@/shared/types/entity";
import type {
  TCreateApplicationFormInput,
  TCreateApplicationFormOutput,
} from "@/modules/application/schema/application-schema";

/**
 * Maps extracted application data into the create application form.
 */
export const useApplicationFormFill = (
  form: UseFormReturn<TCreateApplicationFormInput, unknown, TCreateApplicationFormOutput>,
) => {
  const resolveSkills = async (labels: string[]) => {
    const results = await Promise.allSettled(
      labels.map((label) => skillService.findOrCreate({ label })),
    );

    return results
      .filter((r): r is PromiseFulfilledResult<ISkill> => r.status === "fulfilled")
      .map((r) => ({ id: r.value.id, label: r.value.label }));
  };

  const fillForm = useCallback(
    async (data: IExtractedApplication, sourceUrl: string) => {

      // Application primary fields
      const values: Partial<TCreateApplicationFormInput> = {
        ...(data.title && { title: data.title }),
        ...(sourceUrl && { url: sourceUrl }),
        ...(data.company && { company: data.company }),
        ...(data.description && { description: data.description }),
        ...(data.contractType && { contractType: data.contractType }),
        ...(data.experience && { experience: data.experience }),
        ...(data.remotePolicy && { remotePolicy: data.remotePolicy }),
        ...(data.publishedAt && { publishedAt: data.publishedAt }),
        ...(data.salaryMin != null && { salaryMin: String(data.salaryMin) }),
        ...(data.salaryMax != null && { salaryMax: String(data.salaryMax) }),
      };

      // Address — only include filled fields
      if (data.address) {
        const { city, postalCode, street, streetNumber, complement } = data.address;
        values.address = {
          city: city ?? "",
          postalCode: postalCode ?? "",
          street: street ?? "",
          streetNumber: streetNumber ?? "",
          complement: complement ?? "",
        };
      }

      // Apply all fields 
      form.reset(
        { ...form.getValues(), ...values },
        { keepDefaultValues: true },
      );

      // Skills — requires API calls
      if (data.skills?.length) {
        const newSkills = await resolveSkills(data.skills);
        if (newSkills.length) {
          const existing = form.getValues("skills");
          form.setValue("skills", [...existing, ...newSkills]);
        }
      }
    },
    [form],
  );

  return { fillForm };
};