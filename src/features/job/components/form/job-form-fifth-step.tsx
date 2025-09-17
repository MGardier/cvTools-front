import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

import { DatePickerField } from "@/components/form/date-picker-field";
import type { jobFormSchema } from "../../schema/job-schema";

interface JobFormFourthStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof jobFormSchema>>>;
}

export const JobFormFifthStep = ({ t, form }: JobFormFourthStepProps) => {
  return (
    <>
      {/** MANAGER NAME  */}
      <FormCardField
        label={t("form.managerName.label")}
        name="managerName"
        type="text"
        placeholder={t("form.managerName.placeholder")}
        {...{ form }}
      />

      {/** MANAGER EMAIL  */}
      <FormCardField
        label={t("form.managerEmail.label")}
        name="managerEmail"
        type="email"
        placeholder={t("form.managerEmail.placeholder")}
        {...{ form }}
      />

      {/** INTERVIEW COUNT  */}
      <FormCardField
        label={t("form.interviewCount.label")}
        name="interviewCount"
        type="number"
        step={1}
        placeholder={t("form.interviewCount.placeholder")}
        {...{ form }}
      />
      {/** LAST CONTACT AT  */}
      <DatePickerField
        label={t("form.lastContactAt.label")}
        name="lastContactAt"
        placeholder={t("form.lastContactAt.placeholder")}
        selectLabel={t("form.lastContactAt.selectLabel")}
        {...{ form }}
      />
    </>
  );
};
