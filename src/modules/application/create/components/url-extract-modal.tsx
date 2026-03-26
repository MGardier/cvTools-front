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
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { InputField } from "@/shared/components/form/input-field";
import { extractUrlSchema } from "@/modules/application/schema/extract-url-schema";
import { scraperService } from "@/lib/api/scraper/scraper.service";
import type { IExtractedApplication } from "@/lib/api/scraper/types";

type TExtractUrlInput = z.input<ReturnType<typeof extractUrlSchema>>;
type TExtractUrlOutput = z.output<ReturnType<typeof extractUrlSchema>>;

interface IUrlExtractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExtracted: (data: IExtractedApplication, sourceUrl: string) => void;
}

export const UrlExtractModal = ({ open, onOpenChange, onExtracted }: IUrlExtractModalProps) => {
  const { t } = useTranslation("application");
  const schema = extractUrlSchema(t);

  const form = useForm<TExtractUrlInput, unknown, TExtractUrlOutput>({
    resolver: zodResolver(schema),
    defaultValues: { url: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TExtractUrlOutput) => scraperService.extractOffer(data.url),
    onSuccess: (data, variables) => {
      toast.success(t("pages.create.extract.modal.success"));
      onExtracted(data, variables.url);
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t("pages.create.extract.modal.error"));
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md flex">
        <DialogHeader>
          <DialogTitle>{t("pages.create.extract.modal.title")}</DialogTitle>
          <DialogDescription>{t("pages.create.extract.modal.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutate(data))} className="grid gap-4">
            <InputField
              form={form}
              name="url"
              label={t("pages.create.extract.modal.urlLabel")}
              placeholder={t("pages.create.extract.modal.urlPlaceholder")}
              type="url"
              required
            />
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => { form.reset(); onOpenChange(false); }}>
                {t("pages.create.extract.modal.cancel")}
              </Button>
              <Button type="submit" disabled={isPending} className="bg-sky-600 hover:bg-sky-700">
                {t("pages.create.extract.modal.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
