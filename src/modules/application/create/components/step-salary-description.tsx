import type { TFunction } from "i18next";

import { InputField } from "@/shared/components/form/input-field";
import { TextAreaField } from "@/shared/components/form/text-area-field";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";

interface IStepSalaryDescriptionProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepSalaryDescription = ({ form, t }: IStepSalaryDescriptionProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          form={form}
          name="salaryMin"
          label={t("pages.create.fields.salaryMin")}
          placeholder={t("pages.create.fields.salaryMinPlaceholder")}
          type="number"
          step={1000}
        />
        <InputField
          form={form}
          name="salaryMax"
          label={t("pages.create.fields.salaryMax")}
          placeholder={t("pages.create.fields.salaryMaxPlaceholder")}
          type="number"
          step={1000}
        />
      </div>
      <TextAreaField
        form={form}
        name="description"
        label={t("pages.create.fields.description")}
        placeholder={t("pages.create.fields.descriptionPlaceholder")}
      />
    </div>
  );
};
