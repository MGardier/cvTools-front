import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";
import { DatePickerField } from "@/components/form/date-picker-field";

interface JobFormFourthStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
}

export const JobFormFifthStep = ({ t, form }: JobFormFourthStepProps) => {
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
        type="email"
        placeholder={t("pages.createJob.form.managerEmail.placeholder")}
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
