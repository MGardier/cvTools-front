import type { TFunction } from "i18next";

import type { IStep } from "@/shared/types/hook";
import type { TMultiStepFormReturn } from "@/shared/hooks/use-multi-step-form";
import type { TCreateApplicationFormReturn, TCreateApplicationFormOutput } from "@/modules/application/schema/application-schema";

import { ApplicationFormLayout } from "@/modules/application/components/application-form-layout";

interface IEditApplicationUiProps {
  form: TCreateApplicationFormReturn;
  onSubmit: (data: TCreateApplicationFormOutput) => void;
  isPending: boolean;
  multiStep: TMultiStepFormReturn;
  steps: IStep[];
  t: TFunction;
  applicationId: number;
}

export const EditApplicationUi = ({
  form,
  onSubmit,
  isPending,
  multiStep,
  steps,
  t,
  applicationId,
}: IEditApplicationUiProps) => {
  return (
    <ApplicationFormLayout
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      multiStep={multiStep}
      steps={steps}
      t={t}
      title={t("pages.edit.title")}
      subtitle={t("pages.edit.subtitle")}
      submitLabel={t("pages.edit.navigation.submit")}
      showPersistentSubmit
      applicationId={applicationId}
    />
  );
};
