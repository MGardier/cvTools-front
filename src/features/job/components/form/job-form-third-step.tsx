import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type {  UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";
import { TextAreaField } from "@/components/form/text-area-field";
import { RatingField } from "@/components/form/rating-field";
import {SwitchField } from "@/components/form/switch-field";

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
      <TextAreaField
        label={t("pages.createJob.form.description.label")}
        name="description"
        type="text"
        placeholder={t("pages.createJob.form.description.placeholder")}
        required
        {...{ form }}
      />

      {/** RATING  */}
      <RatingField
        label={t("pages.createJob.form.rating.label")}
        name="rating"
        min={0}
        max={5}
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


      {/** ARCHIVED  */}
      <SwitchField
        label={t("pages.createJob.form.archived.label")}
        name="archived"
        {...{ form }}
      />




    </>
  );
};
