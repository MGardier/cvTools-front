import type { TFunction } from "i18next";

import { InputField } from "@/shared/components/form/input-field";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";

interface IStepAddressProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepAddress = ({ form, t }: IStepAddressProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          form={form}
          name="address.city"
          label={t("pages.create.fields.city")}
          placeholder={t("pages.create.fields.cityPlaceholder")}
          type="text"
        />
        <InputField
          form={form}
          name="address.postalCode"
          label={t("pages.create.fields.postalCode")}
          placeholder={t("pages.create.fields.postalCodePlaceholder")}
          type="text"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          form={form}
          name="address.street"
          label={t("pages.create.fields.street")}
          placeholder={t("pages.create.fields.streetPlaceholder")}
          type="text"
        />
        <InputField
          form={form}
          name="address.streetNumber"
          label={t("pages.create.fields.streetNumber")}
          placeholder={t("pages.create.fields.streetNumberPlaceholder")}
          type="text"
        />
      </div>
      <InputField
        form={form}
        name="address.complement"
        label={t("pages.create.fields.complement")}
        placeholder={t("pages.create.fields.complementPlaceholder")}
        type="text"
      />
    </div>
  );
};
