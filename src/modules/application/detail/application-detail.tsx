import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useMe } from "@/shared/hooks/useMe";
import { applicationService } from "@/lib/api/application/application.service";
import { ROUTES } from "@/app/constants/routes";

import { ApplicationDetailUi } from "./application-detail.ui";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import type { TDetailTab } from "./types";

export const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("application");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useMe();

  const applicationId = Number(id);
  const [activeTab, setActiveTab] = useState<TDetailTab>("description");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => applicationService.findOneById(applicationId),
    enabled: !!user && !Number.isNaN(applicationId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => applicationService.delete(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success(t("list.deleteSuccess"));
      navigate(ROUTES.application.list);
    },
    onError: () => {
      toast.error(t("list.deleteError"));
    },
  });

  const handleBack = useCallback(() => {
    navigate(ROUTES.application.list);
  }, [navigate]);

  const handleApply = useCallback(() => {
    if (data?.data?.url) {
      window.open(data.data.url, "_blank", "noopener,noreferrer");
    }
  }, [data]);

  const handleEdit = useCallback(() => {
    navigate(ROUTES.application.edit(applicationId));
  }, [navigate, applicationId]);

  const handleDelete = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    deleteMutation.mutate();
    setDeleteDialogOpen(false);
  }, [deleteMutation]);

  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ id, isFavorite }: { id: number; isFavorite: boolean }) =>
      applicationService.toggleFavorite(id, isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const handleToggleFavorite = useCallback(() => {
    if (!data?.data) return;
    toggleFavoriteMutation.mutate({
      id: applicationId,
      isFavorite: !data.data.isFavorite,
    });
  }, [data?.data, applicationId, toggleFavoriteMutation]);

  if (isLoading) return <ApplicationDetailUi.Skeleton />;

  if (isError || !data?.data) {
    return (
      <div className="bg-white min-h-screen">
        <div className="w-full max-w-screen-xl mx-auto px-5 text-center py-16 text-destructive">
          Application introuvable
        </div>
      </div>
    );
  }

  return (
    <>
      <ApplicationDetailUi
        application={data.data}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={handleBack}
        onApply={handleApply}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleFavorite={handleToggleFavorite}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("list.confirmDelete.title")}
        description={t("list.confirmDelete.description", { title: data.data.title })}
        confirmLabel={t("list.confirmDelete.confirm")}
        cancelLabel={t("list.confirmDelete.cancel")}
        onConfirm={confirmDelete}
      />
    </>
  );
};
