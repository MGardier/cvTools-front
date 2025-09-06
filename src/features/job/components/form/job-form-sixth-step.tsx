import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";

interface JobFormSixthStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
}

export const JobFormSixthStep = ({ t, form }: JobFormSixthStepProps) => {
  return (
    <>
      {/** MANAGER NAME  */}
      <FormCardField
        label={t("pages.createJob.form.managerName.label")}
        name="managerName"
        type="text"
        placeholder={t("pages.createJob.form.managerName.placeholder")}
        {...{ form }}
      />

      {/** MANAGER EMAIL  */}
      <FormCardField
        label={t("pages.createJob.form.managerEmail.label")}
        name="managerEmail"
        type="text"
        placeholder={t("pages.createJob.form.managerEmail.placeholder")}
        {...{ form }}
      />

      {/** SALARY MIN  */}
      <FormCardField
        label={t("pages.createJob.form.salaryMin.label")}
        name="salaryMin"
        type="number"
        step={1000}
        placeholder={t("pages.createJob.form.salaryMin.placeholder")}
        {...{ form }}
      />

      {/** SALARY MAX    */}
      <FormCardField
        label={t("pages.createJob.form.salaryMax.label")}
        name="salaryMax"
        type="number"
        step={1000}
        placeholder={t("pages.createJob.form.salaryMax.placeholder")}
        {...{ form }}
      />
    </>
  );
};
