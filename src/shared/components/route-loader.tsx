import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const RouteLoader = () => {
  const { t } = useTranslation("common", { useSuspense: false });
  return (
    <div
      className="flex min-h-[60vh] w-full items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="sr-only">{t("loading", "Chargement…")}</span>
    </div>
  );
};
