import { useMemo } from "react";
import type { TFunction } from "i18next";

import { InputField } from "@/shared/components/form/input-field";
import { SelectField } from "@/shared/components/form/select-field";
import { DatePickerField } from "@/shared/components/form/date-picker-field";
import { EJobboard } from "@/modules/application/types";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";

interface IStepGeneralProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepGeneral = ({ form, t }: IStepGeneralProps) => {
  const jobboardOptions = useMemo(
    () => Object.values(EJobboard).map((value) => ({ value, label: t(`jobboard.${value}`) })),
    [t],
  );

  return (
    <div className="grid gap-4">
      <InputField
        form={form}
        name="title"
        label={t("pages.create.fields.title")}
        placeholder={t("pages.create.fields.titlePlaceholder")}
        type="text"
        required
      />
      <InputField
        form={form}
        name="url"
        label={t("pages.create.fields.url")}
        placeholder={t("pages.create.fields.urlPlaceholder")}
        type="url"
        required
      />
      <InputField
        form={form}
        name="company"
        label={t("pages.create.fields.company")}
        placeholder={t("pages.create.fields.companyPlaceholder")}
        type="text"
      />
      <SelectField
        form={form}
        name="jobboard"
        label={t("pages.create.fields.jobboard")}
        placeholder={t("pages.create.fields.jobboardPlaceholder")}
        objectValues={jobboardOptions}
        required
      />
      <DatePickerField
        form={form}
        name="publishedAt"
        label={t("pages.create.fields.publishedAt")}
        placeholder={t("pages.create.fields.publishedAtPlaceholder")}
        selectLabel={t("pages.create.fields.publishedAt")}
      />
    </div>
  );
};
