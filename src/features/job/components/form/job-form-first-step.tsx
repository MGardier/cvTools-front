import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";

import { SelectField } from "@/components/form/select-field";
import {  JobPriority, JobStatus } from "@/types/entity";
import { TechnologiesForm } from "./technologies-form";

interface JobFormFirstStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
  technologiesFields: UseFieldArrayReturn<
    z.infer<ReturnType<typeof createJobSchema>>
  >;
}

export const JobFormFirstStep = ({
  t,
  form,
  technologiesFields,
}: JobFormFirstStepProps) => {
  //TODO : translations sortir le form et les enums

  return (
    <>
      {/** TITLE  */}
      <FormCardField
        label={t("pages.createJob.form.jobTitle.label")}
        name="jobTitle"
        type="text"
        placeholder={t("pages.createJob.form.jobTitle.placeholder")}
        required
        {...{ form }}
      />

      {/** TECHNOLOGIES  */}
      <TechnologiesForm {...{ form, t, technologiesFields }} />

      {/** STATUS  */}
      <SelectField
        label={t("pages.createJob.form.status.label")}
        name="status"
        placeholder={t("pages.createJob.form.status.placeholder")}
        form={form}
        required
        objectValues={Object.values(JobStatus).map((value) => {
          return {
            value,
            label: t(
              `pages.createJob.form.status.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />

      
      {/** PRIORITY  */}
      <SelectField
        label={t("pages.createJob.form.priority.label")}
        name="priority"
        placeholder={t("pages.createJob.form.priority.placeholder")}
        form={form}
        required
        objectValues={Object.values(JobPriority).map((value) => {
          return {
            value,
            label: t(
              `pages.createJob.form.priority.values.${value.toLocaleLowerCase()}`
            ),
          };
        })}
      />


    </>
  );
};
