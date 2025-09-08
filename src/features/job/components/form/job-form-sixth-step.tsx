import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";
import { TextAreaField } from "@/components/form/text-area-field";
import { FormCardField } from "@/components/form/form-card-field";
import { DatePickerField } from "@/components/form/date-picker-field";

interface JobFormSixthStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
}

export const JobFormSixthStep = ({ t, form }: JobFormSixthStepProps) => {
  return (
    <>
      {/** DETAILS TO REMEMBER  */}
      <TextAreaField
        label={t("pages.createJob.form.detailsToRemember.label")}
        name="detailsToRemember"
        placeholder={t("pages.createJob.form.detailsToRemember.placeholder")}
        {...{ form }}
      />
      {/** INTERVIEW COUNT  */}
      <FormCardField
        label={t("pages.createJob.form.interviewCount.label")}
        name="interviewCount"
        type="number"
        step={1}
        placeholder={t("pages.createJob.form.interviewCount.placeholder")}
        {...{ form }}
      />
      {/** LAST CONTACT AT  */}
      <DatePickerField
        label={t("pages.createJob.form.lastContactAt.label")}
        name="lastContactAt"
        placeholder={t("pages.createJob.form.lastContactAt.placeholder")}
        selectLabel={t("pages.createJob.form.lastContactAt.selectLabel")}
        {...{ form }}
      />
      
    </>
  );
};
