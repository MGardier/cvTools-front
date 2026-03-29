import { useMemo } from "react";
import type { TFunction } from "i18next";

import { SelectField } from "@/shared/components/form/select-field";
import {
  EContractType,
  EApplicationStatus,
  EExperienceLevel,
  ERemotePolicy,
  ECompatibilityJob,
} from "@/modules/application/types";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";

interface IStepClassificationProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepClassification = ({ form, t }: IStepClassificationProps) => {
  const contractTypeOptions = useMemo(
    () => Object.values(EContractType).map((value) => ({ value, label: t(`contractType.${value}`) })),
    [t],
  );
  const statusOptions = useMemo(
    () => Object.values(EApplicationStatus).map((value) => ({ value, label: t(`status.${value}`) })),
    [t],
  );
  const experienceOptions = useMemo(
    () => Object.values(EExperienceLevel).map((value) => ({ value, label: t(`experience.${value}`) })),
    [t],
  );
  const remotePolicyOptions = useMemo(
    () => Object.values(ERemotePolicy).map((value) => ({ value, label: t(`remotePolicy.${value}`) })),
    [t],
  );
  const compatibilityOptions = useMemo(
    () => Object.values(ECompatibilityJob).map((value) => ({ value, label: t(`compatibility.${value}`) })),
    [t],
  );

  return (
    <div className="grid gap-4">
      <SelectField
        form={form}
        name="contractType"
        label={t("pages.create.fields.contractType")}
        placeholder={t("pages.create.fields.contractTypePlaceholder")}
        objectValues={contractTypeOptions}
        required
      />
      <SelectField
        form={form}
        name="currentStatus"
        label={t("pages.create.fields.currentStatus")}
        placeholder={t("pages.create.fields.currentStatusPlaceholder")}
        objectValues={statusOptions}
        required
      />
      <SelectField
        form={form}
        name="experience"
        label={t("pages.create.fields.experience")}
        placeholder={t("pages.create.fields.experiencePlaceholder")}
        objectValues={experienceOptions}
      />
      <SelectField
        form={form}
        name="remotePolicy"
        label={t("pages.create.fields.remotePolicy")}
        placeholder={t("pages.create.fields.remotePolicyPlaceholder")}
        objectValues={remotePolicyOptions}
      />
      <SelectField
        form={form}
        name="compatibility"
        label={t("pages.create.fields.compatibility")}
        placeholder={t("pages.create.fields.compatibilityPlaceholder")}
        objectValues={compatibilityOptions}
      />
    </div>
  );
};
