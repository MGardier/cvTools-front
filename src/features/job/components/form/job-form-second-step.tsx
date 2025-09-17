import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

import { SelectField } from "@/components/form/select-field";
import { JobApplyMethod, TypeEnterprise } from "@/types/entity";
import { DatePickerField } from "@/components/form/date-picker-field";
import type { jobFormSchema } from "../../schema/job-schema";

interface JobFormSecondStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof jobFormSchema>>>;
}

export const JobFormSecondStep = ({ t, form }: JobFormSecondStepProps) => {
  return (
    <>
      {/** ENTERPRISE  */}
      <FormCardField
        label={t("form.enterprise.label")}
        name="enterprise"
        type="text"
        placeholder={t("form.enterprise.placeholder")}
        required
        aria-required
        {...{ form }}
      />

      {/** TYPE  */}
      <SelectField
        label={t("form.type.label")}
        name="type"
        placeholder={t("form.type.placeholder")}
        form={form}
        required
        objectValues={Object.values(TypeEnterprise).map((value) => {
          return {
            value,
            label: t(
              `form.type.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      {/** APPLICATION METHOD  */}
      <SelectField
        label={t("form.applicationMethod.label")}
        name="applicationMethod"
        placeholder={t("form.applicationMethod.placeholder")}
        form={form}
        required
        objectValues={Object.values(JobApplyMethod).map((value) => {
          return {
            value,
            label: t(
              `form.applicationMethod.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      {/** APPLIED AT  */}
      <DatePickerField
        label={t("form.appliedAt.label")}
        name="appliedAt"
        placeholder={t("form.appliedAt.placeholder")}
        selectLabel={t("form.appliedAt.selectLabel")}
        {...{ form }}
      />


    </>
  );
};
