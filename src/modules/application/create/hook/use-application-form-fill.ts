import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("application");
  const [isFilling, setIsFilling] = useState(false);

  const resolveSkills = async (labels: string[]) => {
    const results = await Promise.allSettled(
      labels.map((label) => skillService.findOrCreate({ label })),
    );

    const fulfilled = results
      .filter((r): r is PromiseFulfilledResult<ISkill> => r.status === "fulfilled")
      .map((r) => ({ id: r.value.id, label: r.value.label }));

    const failedCount = results.filter((r) => r.status === "rejected").length;
    if (failedCount > 0) {
      toast.warning(t("pages.create.skillImportWarning", { count: failedCount }));
    }

    return fulfilled;
  };

  const fillForm = useCallback(
    async (data: IExtractedApplication, sourceUrl: string) => {
      setIsFilling(true);

      // Application primary fields — use setValue to preserve dirty/touched state
      if (data.title) form.setValue("title", data.title);
      if (sourceUrl?.trim()) form.setValue("url", sourceUrl);
      if (data.company) form.setValue("company", data.company);
      if (data.description) form.setValue("description", data.description);
      if (data.contractType) form.setValue("contractType", data.contractType);
      if (data.experience) form.setValue("experience", data.experience);
      if (data.remotePolicy) form.setValue("remotePolicy", data.remotePolicy);
      if (data.publishedAt) form.setValue("publishedAt", data.publishedAt);
      if (data.salaryMin != null) form.setValue("salaryMin", String(data.salaryMin));
      if (data.salaryMax != null) form.setValue("salaryMax", String(data.salaryMax));

      // Address — only include filled fields
      if (data.address) {
        const { city, postalCode, street, streetNumber, complement } = data.address;
        form.setValue("address", {
          city: city ?? "",
          postalCode: postalCode ?? "",
          street: street ?? "",
          streetNumber: streetNumber ?? "",
          complement: complement ?? "",
        });
      }

      // Skills — requires API calls
      try {
        if (data.skills?.length) {
          const newSkills = await resolveSkills(data.skills);
          if (newSkills.length) {
            const existing = form.getValues("skills");
            form.setValue("skills", [...existing, ...newSkills]);
          }
        }
      } finally {
        setIsFilling(false);
      }
    },
    [form],
  );

  return { fillForm, isFilling };
};
