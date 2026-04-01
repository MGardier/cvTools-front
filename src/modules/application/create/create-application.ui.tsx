import type { TFunction } from "i18next";
import { Sparkles, Globe } from "lucide-react";

import type { IStep } from "@/shared/types/hook";
import type { TMultiStepFormReturn } from "@/shared/hooks/use-multi-step-form";
import type { TCreateApplicationFormReturn, TCreateApplicationFormOutput } from "@/modules/application/schema/application-schema";
import type { IExtractedApplication } from "@/lib/api/scraper/types";

import { ApplicationFormLayout } from "@/modules/application/components/application-form-layout";
import { UrlExtractModal } from "./components/url-extract-modal/url-extract-modal";

interface ICreateApplicationUiProps {
  form: TCreateApplicationFormReturn;
  onSubmit: (data: TCreateApplicationFormOutput) => void;
  isPending: boolean;
  multiStep: TMultiStepFormReturn;
  steps: IStep[];
  t: TFunction;
  extractModalOpen: boolean;
  onExtractModalOpen: (open: boolean) => void;
  fillForm: (data: IExtractedApplication, sourceUrl: string) => void;
}

export const CreateApplicationUi = ({
  form,
  onSubmit,
  isPending,
  multiStep,
  steps,
  t,
  extractModalOpen,
  onExtractModalOpen,
  fillForm,
}: ICreateApplicationUiProps) => {
  return (
    <>
      <ApplicationFormLayout
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        multiStep={multiStep}
        steps={steps}
        t={t}
        title={t("pages.create.title")}
        subtitle={t("pages.create.subtitle")}
        submitLabel={t("pages.create.navigation.submit")}
        headerSlot={
          <button
            type="button"
            onClick={() => onExtractModalOpen(true)}
            className="group w-full cursor-pointer rounded-lg border-2 border-dashed border-sky-200 px-4 py-3 transition-all hover:border-sky-400 hover:bg-sky-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition-colors group-hover:bg-sky-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-sky-900 dark:text-sky-100">
                    {t("pages.create.extract.button")}
                  </p>
                  <Globe className="h-3.5 w-3.5 text-sky-400 dark:text-sky-500" />
                </div>
                <p className="text-xs text-sky-600/80 dark:text-sky-400/70">
                  {t("pages.create.extract.hint")}
                </p>
              </div>
            </div>
          </button>
        }
      />

      <UrlExtractModal
        open={extractModalOpen}
        onOpenChange={onExtractModalOpen}
        fillForm={fillForm}
      />
    </>
  );
};
