import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type z from "zod";


import { SelectField } from "@/components/form/select-field";
import {  JobCompatibility, JobStatus } from "@/types/entity";
import { TechnologiesForm } from "../technologies-form";
import { SwitchField } from "@/components/form/switch-field";
import type { jobFormSchema } from "@/features/job/schema/job-schema";


interface JobFormFirstStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof jobFormSchema>>>;
  technologiesFields: UseFieldArrayReturn<
    z.infer<ReturnType<typeof jobFormSchema>>
  >;
  isTechnologyFieldInError: boolean;
}

export const JobFormFirstStep = ({
  t,
  form,
  technologiesFields,
  isTechnologyFieldInError
}: JobFormFirstStepProps) => {
  
  

  return (
    <>
      {/** TITLE  */}
      <FormCardField
        label={t("form.jobTitle.label")}
        name="jobTitle"
        type="text"
        placeholder={t("form.jobTitle.placeholder")}
        required
        {...{ form }}
      />

      {/** TECHNOLOGIES  */}
      <TechnologiesForm {...{ form, t,isTechnologyFieldInError, technologiesFields }} />

      {/** STATUS  */}
      <SelectField
        label={t("form.status.label")}
        name="status"
        placeholder={t("form.status.placeholder")}
        form={form}
        required
        objectValues={Object.values(JobStatus).map((value) => {
          return {
            value,
            label: t(
              `form.status.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      
      {/** COMPATIBILITY  */}
      <SelectField
        label={t("form.compatibility.label")}
        name="compatibility"
        placeholder={t("form.compatibility.placeholder")}
        form={form}
        required
        objectValues={Object.values(JobCompatibility).map((value) => {
          return {
            value,
            label: t(
              `form.compatibility.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      {/** IS FAVORITE  */}
      <SwitchField
        label={t("form.isFavorite")}
        name="isFavorite"
        {...{ form }}
      />

    </>
  );
};
