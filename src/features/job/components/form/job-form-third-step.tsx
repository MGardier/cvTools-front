import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type {  UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";

interface JobFormThirdStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
}

export const JobFormThirdStep = ({
  t,
  form,
}: JobFormThirdStepProps) => {
  return (
    <>
      {/** DESCRIPTION  */}
      <FormCardField
        label={t("pages.createJob.form.description.label")}
        name="description"
        type="text"
        placeholder={t("pages.createJob.form.description.placeholder")}
        required
        {...{ form }}
      />


      {/** REJECTED REASON  */}
      <FormCardField
        label={t("pages.createJob.form.rejectedReason.label")}
        name="rejectedReason"
        type="text"
        placeholder={t("pages.createJob.form.rejectedReason.placeholder")}
        required
        {...{ form }}
      />





    </>
  );
};
