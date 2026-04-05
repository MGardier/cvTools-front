import type { TFunction } from "i18next";
import { Globe, ClipboardPaste, Loader2 } from "lucide-react";

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
import { TextAreaField } from "@/shared/components/form/text-area-field";
import type { TExtractMode } from "./url-extract-modal";
import type { TExtractOfferFormReturn } from "../../types";



interface IUrlExtractModalUiProps {
  open: boolean;
  form: TExtractOfferFormReturn;
  mode: TExtractMode;
  isPending: boolean;
  t: TFunction;
  onClose: () => void;
  onSwitchMode: (mode: TExtractMode) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TABS: { key: TExtractMode; labelKey: string; icon: typeof Globe }[] = [
  { key: "url", labelKey: "pages.create.extract.modal.tabUrl", icon: Globe },
  { key: "paste", labelKey: "pages.create.extract.modal.tabPaste", icon: ClipboardPaste },
];

export const UrlExtractModalUi = ({
  open,
  form,
  mode,
  isPending,
  t,
  onClose,
  onSwitchMode,
  onSubmit,
}: IUrlExtractModalUiProps) => (
  <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("pages.create.extract.modal.title")}</DialogTitle>
        <DialogDescription>{t("pages.create.extract.modal.subtitle")}</DialogDescription>
      </DialogHeader>

      {!isPending && (
        <div className="flex rounded-lg bg-muted p-1 gap-1">
          {TABS.map(({ key, labelKey, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onSwitchMode(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer ${
                mode === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(labelKey)}
            </button>
          ))}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={(e) => { e.stopPropagation(); onSubmit(e); }} className="grid gap-4">
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
                  form={form}
                  name="url"
                  label={t("pages.create.extract.modal.urlLabel")}
                  placeholder={t("pages.create.extract.modal.urlPlaceholder")}
                  type="url"
                  required
                />
              ) : (
                <TextAreaField
                  form={form}
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
            <Button type="button" variant="outline" disabled={isPending} onClick={onClose}>
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
