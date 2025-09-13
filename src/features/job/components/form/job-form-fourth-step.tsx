import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type {  UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";
import { TextAreaField } from "@/components/form/text-area-field";

interface JobFormFourthStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
}

export const JobFormFourthStep = ({
  t,
  form,
}: JobFormFourthStepProps) => {
  return (
    <>
      {/** LINK  */}
      <FormCardField
        label={t("pages.createJob.form.link.label")}
        name="link"
        type="text"
        placeholder={t("pages.createJob.form.link.placeholder")}
        required
        {...{ form }}
      />

      {/** NOTES  */}
      <TextAreaField
        label={t("pages.createJob.form.notes.label")}
        name="notes"
        placeholder={t("pages.createJob.form.notes.placeholder")}
        {...{ form }}
      />


      {/** ADDRESS CITY  */}
      <FormCardField
        label={t("pages.createJob.form.address.city.label")}
        name="address.city"
        type="text"
        placeholder={t("pages.createJob.form.address.city.placeholder")}
        {...{ form }}
      />

      {/** ADDRESS POSTAL CODE  */}
      <FormCardField
        label={t("pages.createJob.form.address.postalCode.label")}
        name="address.postalCode"
        type="text"
        placeholder={t("pages.createJob.form.address.postalCode.placeholder")}
        {...{ form }}
      />


    </>
  );
};
