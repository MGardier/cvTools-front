import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { RouteLoader } from "@/shared/components/route-loader";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { applicationService } from "@/lib/api/application/application.service";
import { useOfferSearchStaging } from "@/modules/offer/hooks/use-offer-search-staging";
import { useHomeData, HOME_QUERY_KEY } from "./hooks/use-home-data";
import { ConnectedHomeUi } from "./connected-home.ui";

const APPLICATIONS_QUERY_KEY = "applications" as const;

export const ConnectedHome = () => {
  const { t } = useTranslation(["home", "application"]);
  const queryClient = useQueryClient();
  const { homeData, isLoading, isError } = useHomeData();
  const offerSearch = useOfferSearchStaging();

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);

  const invalidateApplications = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [HOME_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [APPLICATIONS_QUERY_KEY] });
  }, [queryClient]);

  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ id, isFavorite }: { id: number; isFavorite: boolean }) =>
      applicationService.toggleFavorite(id, isFavorite),
    onSuccess: invalidateApplications,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => applicationService.delete(id),
    onSuccess: () => {
      invalidateApplications();
      toast.success(t("list.deleteSuccess", { ns: "application" }));
    },
    onError: () => toast.error(t("list.deleteError", { ns: "application" })),
  });

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const item = homeData?.recentApplications.find((app) => app.id === id);
      if (!item) return;
      toggleFavoriteMutation.mutate({ id, isFavorite: !item.isFavorite });
    },
    [homeData?.recentApplications, toggleFavoriteMutation],
  );

  const handleDelete = useCallback(
    (id: number) => {
      const item = homeData?.recentApplications.find((app) => app.id === id);
      if (!item) return;
      setDeleteTarget({ id: item.id, title: item.title });
    },
    [homeData?.recentApplications],
  );

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  }, [deleteTarget, deleteMutation]);

  if (isLoading) return <RouteLoader />;

  if (isError || !homeData) {
    return (
      <section className="px-4 pt-28 pb-20 text-center text-destructive">
        {t("connected.error")}
      </section>
    );
  }

  return (
    <>
      <ConnectedHomeUi
        homeData={homeData}
        stagedFilters={offerSearch.stagedFilters}
        cityResetKey={offerSearch.cityResetKey}
        onStagedChange={offerSearch.onStagedChange}
        onSearch={offerSearch.onSearch}
        onRemoveFilter={offerSearch.onRemoveFilter}
        onClearFilters={offerSearch.onClearFilters}
        onToggleFavorite={handleToggleFavorite}
        onDeleteApplication={handleDelete}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title={t("list.confirmDelete.title", { ns: "application" })}
        description={
          deleteTarget
            ? t("list.confirmDelete.description", { ns: "application", title: deleteTarget.title })
            : ""
        }
        confirmLabel={t("list.confirmDelete.confirm", { ns: "application" })}
        cancelLabel={t("list.confirmDelete.cancel", { ns: "application" })}
        onConfirm={confirmDelete}
      />
    </>
  );
};
