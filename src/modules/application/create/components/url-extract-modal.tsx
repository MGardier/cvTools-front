import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import type { z } from "zod/v4";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Globe, ClipboardPaste, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { InputField } from "@/shared/components/form/input-field";
import { TextAreaField } from "@/shared/components/form/text-area-field";
import { extractUrlSchema, extractRawContentSchema } from "@/modules/application/schema/extract-url-schema";
import { scraperService } from "@/lib/api/scraper/scraper.service";
import type { IExtractedApplication } from "@/lib/api/scraper/types";
import type { IApiErrors } from "@/shared/types/api";

type TExtractUrlInput = z.input<ReturnType<typeof extractUrlSchema>>;
type TExtractUrlOutput = z.output<ReturnType<typeof extractUrlSchema>>;
type TExtractRawContentInput = z.input<ReturnType<typeof extractRawContentSchema>>;
type TExtractRawContentOutput = z.output<ReturnType<typeof extractRawContentSchema>>;

type TExtractMode = "url" | "paste";

interface IUrlExtractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fillForm: (data: IExtractedApplication, sourceUrl: string) => void;
}

const SCRAPER_ERROR_KEYS: Record<string, string> = {
  SCRAPER_EXTRACTION_FAILED_ERROR: "pages.create.extract.modal.errorExtractionFailed",
  SCRAPER_URL_INVALID: "pages.create.extract.modal.errorUrlInvalid",
  SCRAPER_URL_DOMAIN_NOT_SUPPORTED: "pages.create.extract.modal.errorDomainNotSupported",
};

export const UrlExtractModal = ({ open, onOpenChange, fillForm }: IUrlExtractModalProps) => {
  const { t } = useTranslation("application");
  const [mode, setMode] = useState<TExtractMode>("url");

  const urlSchema = extractUrlSchema(t);
  const rawContentSchema = extractRawContentSchema(t);

  const urlForm = useForm<TExtractUrlInput, unknown, TExtractUrlOutput>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "" },
  });

  const rawContentForm = useForm<TExtractRawContentInput, unknown, TExtractRawContentOutput>({
    resolver: zodResolver(rawContentSchema),
    defaultValues: { rawContent: "" },
  });

  const handleClose = () => {
    urlForm.reset();
    rawContentForm.reset();
    onOpenChange(false);
  };

  const switchMode = (newMode: TExtractMode) => {
    urlForm.reset();
    rawContentForm.reset();
    setMode(newMode);
  };

  const { mutate: mutateUrl, isPending: isUrlPending } = useMutation({
    mutationFn: (data: TExtractUrlOutput) => scraperService.extractFromUrl(data.url),
    onSuccess: (data, variables) => {
      toast.success(t("pages.create.extract.modal.success"));
      fillForm(data, variables.url);
      handleClose();
    },
    onError: (error: IApiErrors) => {
      const errorCode = error.message;
      const errorKey = errorCode ? SCRAPER_ERROR_KEYS[errorCode] : undefined;

      if (errorKey) {
        toast.error(t(errorKey));
      } else {
        toast.error(t("pages.create.extract.modal.error"));
      }

      if (errorCode === "SCRAPER_EXTRACTION_FAILED_ERROR" || errorCode === "SCRAPER_URL_DOMAIN_NOT_SUPPORTED") {
        switchMode("paste");
      }
    },
  });

  const { mutate: mutateRawContent, isPending: isRawContentPending } = useMutation({
    mutationFn: (data: TExtractRawContentOutput) => scraperService.extractFromContent(data.rawContent),
    onSuccess: (data) => {
      toast.success(t("pages.create.extract.modal.success"));
      fillForm(data, "");
      handleClose();
    },
    onError: () => {
      toast.error(t("pages.create.extract.modal.error"));
    },
  });

  const isPending = isUrlPending || isRawContentPending;

  const currentForm = mode === "url" ? urlForm : rawContentForm;
  const handleSubmit = mode === "url"
    ? urlForm.handleSubmit((data) => mutateUrl(data))
    : rawContentForm.handleSubmit((data) => mutateRawContent(data));

  const tabs: { key: TExtractMode; label: string; icon: typeof Globe }[] = [
    { key: "url", label: t("pages.create.extract.modal.tabUrl"), icon: Globe },
    { key: "paste", label: t("pages.create.extract.modal.tabPaste"), icon: ClipboardPaste },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("pages.create.extract.modal.title")}</DialogTitle>
          <DialogDescription>{t("pages.create.extract.modal.subtitle")}</DialogDescription>
        </DialogHeader>

        {!isPending && (
          <div className="flex rounded-lg bg-muted p-1 gap-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                  mode === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        )}

        <Form {...currentForm}>
          <form onSubmit={(e) => { e.stopPropagation(); handleSubmit(e); }} className="grid gap-4">
            {isPending ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                <p className="text-sm text-muted-foreground">
                  {t("pages.create.extract.modal.loading")}
                </p>
              </div>
            ) : (
              <>
                {mode === "url" ? (
                  <InputField
                    form={urlForm}
                    name="url"
                    label={t("pages.create.extract.modal.urlLabel")}
                    placeholder={t("pages.create.extract.modal.urlPlaceholder")}
                    type="url"
                    required
                  />
                ) : (
                  <TextAreaField
                    form={rawContentForm}
                    name="rawContent"
                    label={t("pages.create.extract.modal.rawContentLabel")}
                    placeholder={t("pages.create.extract.modal.rawContentPlaceholder")}
                    className="max-h-96 overflow-y-auto"
                    required
                  />
                )}
              </>
            )}
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" disabled={isPending} onClick={handleClose}>
                {t("pages.create.extract.modal.cancel")}
              </Button>
              <Button type="submit" disabled={isPending} variant="blue">
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("pages.create.extract.modal.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
