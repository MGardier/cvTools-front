import { FormCardField } from "@/components/form/form-card-field";
import type { TFunction } from "i18next";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../../schema/job-schema";

interface JobFormThirdStepProps {
  t: TFunction<"job", undefined>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
  technologiesFields: UseFieldArrayReturn<
    z.infer<ReturnType<typeof createJobSchema>>
  >;
}

export const JobFormThirdStep = ({
  t,
  form,
}: JobFormThirdStepProps) => {
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

      {/** ADDRESS STREET  */}
      <FormCardField
        label={t("pages.createJob.form.address.street.label")}
        name="address.street"
        type="text"
        placeholder={t("pages.createJob.form.address.street.placeholder")}
        {...{ form }}
      />
    </>
  );
};
