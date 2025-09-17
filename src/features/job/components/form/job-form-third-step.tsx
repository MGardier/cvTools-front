import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type {  UseFormReturn } from "react-hook-form";
import type z from "zod";

import { TextAreaField } from "@/components/form/text-area-field";
import { RatingField } from "@/components/form/rating-field";
import {SwitchField } from "@/components/form/switch-field";
import type { jobFormSchema } from "../../schema/job-schema";

interface JobFormThirdStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof jobFormSchema>>>;
}

export const JobFormThirdStep = ({
  t,
  form,
}: JobFormThirdStepProps) => {
  return (
    <>
      {/** DESCRIPTION  */}
      <TextAreaField
        label={t("form.description.label")}
        name="description"
        placeholder={t("form.description.placeholder")}
        {...{ form }}
      />

      {/** RATING  */}
      <RatingField
        label={t("form.rating.label")}
        name="rating"
        min={0}
        max={5}
        {...{ form }}
      />

      {/** REJECTED REASON  */}
      <FormCardField
        label={t("form.rejectedReason.label")}
        name="rejectedReason"
        type="text"
        placeholder={t("form.rejectedReason.placeholder")}
        {...{ form }}
      />


      {/** IS ARCHIVED  */}
      <SwitchField
        label={t("form.isArchived")}
        name="isArchived"
        {...{ form }}
      />




    </>
  );
};
