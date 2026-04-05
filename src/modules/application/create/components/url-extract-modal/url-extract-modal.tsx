import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import {
  extractOfferSchema,
  type TExtractOfferInput,
  type TExtractOfferOutput,
} from "@/modules/application/schema/extract-url-schema";
import { scraperService } from "@/lib/api/scraper/scraper.service";
import type { IExtractedApplication } from "@/lib/api/scraper/types";
import type { IApiErrors } from "@/shared/types/api";
import { UrlExtractModalUi } from "./url-extract-modal.ui";

export type TExtractMode = "url" | "paste";

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

  const schema = extractOfferSchema(t);

  const form = useForm<TExtractOfferInput, unknown, TExtractOfferOutput>({
    resolver: zodResolver(schema),
    defaultValues: { url: "", rawContent: "" },
  });

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  const switchMode = (newMode: TExtractMode) => {
    form.reset();
    setMode(newMode);
  };

  const extractFn = (data: TExtractOfferOutput) => {
    if (data.url) return scraperService.extractFromUrl(data.url);
    return scraperService.extractFromContent(data.rawContent!);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: extractFn,
    onSuccess: (data, variables) => {
      toast.success(t("pages.create.extract.modal.success"));
      fillForm(data, variables.url ?? "");
      handleClose();
    },
    onError: (error: IApiErrors) => {
      const errorCode = error.message;
      const errorKey = errorCode ? SCRAPER_ERROR_KEYS[errorCode] : undefined;

      toast.error(t(errorKey ?? "pages.create.extract.modal.error"));

      if (errorCode === "SCRAPER_EXTRACTION_FAILED_ERROR" || errorCode === "SCRAPER_URL_DOMAIN_NOT_SUPPORTED") {
        switchMode("paste");
      }
    },
  });

  const handleSubmit = form.handleSubmit((data) => mutate(data));

  return (
    <UrlExtractModalUi
      open={open}
      form={form}
      mode={mode}
      isPending={isPending}
      t={t}
      onClose={handleClose}
      onSwitchMode={switchMode}
      onSubmit={handleSubmit}
    />
  );
};
