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
import { Loader2 } from "lucide-react";
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
  fillForm: (data: IExtractedApplication, sourceUrl: string) => void;
}

export const UrlExtractModal = ({ open, onOpenChange, fillForm }: IUrlExtractModalProps) => {
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
      fillForm(data, variables.url);
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t("pages.create.extract.modal.error"));
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("pages.create.extract.modal.title")}</DialogTitle>
          <DialogDescription>{t("pages.create.extract.modal.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => { e.stopPropagation(); form.handleSubmit((data) => mutate(data))(e); }} className="grid gap-4">
            {isPending ? (
              <div className="flex flex-col items-center justify-center gap-3 py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                <p className="text-sm text-muted-foreground">
                  {t("pages.create.extract.modal.loading")}
                </p>
              </div>
            ) : (
              <InputField
                form={form}
                name="url"
                label={t("pages.create.extract.modal.urlLabel")}
                placeholder={t("pages.create.extract.modal.urlPlaceholder")}
                type="url"
                required
              />
            )}
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" disabled={isPending} onClick={() => { form.reset(); onOpenChange(false); }}>
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
