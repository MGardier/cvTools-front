import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";
import { SelectField } from "@/components/form/select-field";
import { JobApplyMethod, TypeEnterprise } from "@/types/entity";
import { DatePickerField } from "@/components/form/date-picker-field";

interface JobFormSecondStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
}

export const JobFormSecondStep = ({ t, form }: JobFormSecondStepProps) => {
  return (
    <>
      {/** ENTERPRISE  */}
      <FormCardField
        label={t("pages.createJob.form.enterprise.label")}
        name="enterprise"
        type="text"
        placeholder={t("pages.createJob.form.enterprise.placeholder")}
        required
        aria-required
        {...{ form }}
      />

      {/** TYPE  */}
      <SelectField
        label={t("pages.createJob.form.type.label")}
        name="type"
        placeholder={t("pages.createJob.form.type.placeholder")}
        form={form}
        required
        objectValues={Object.values(TypeEnterprise).map((value) => {
          return {
            value,
            label: t(
              `pages.createJob.form.type.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      {/** APPLICATION METHOD  */}
      <SelectField
        label={t("pages.createJob.form.applicationMethod.label")}
        name="applicationMethod"
        placeholder={t("pages.createJob.form.applicationMethod.placeholder")}
        form={form}
        required
        objectValues={Object.values(JobApplyMethod).map((value) => {
          return {
            value,
            label: t(
              `pages.createJob.form.applicationMethod.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      {/** APPLIED AT  */}
      <DatePickerField
        label={t("pages.createJob.form.appliedAt.label")}
        name="appliedAt"
        placeholder={t("pages.createJob.form.appliedAt.placeholder")}
        selectLabel={t("pages.createJob.form.appliedAt.selectLabel")}
        {...{ form }}
      />


    </>
  );
};
