import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useMe } from "@/shared/hooks/useMe";
import { applicationService } from "@/lib/api/application/application.service";
import { ROUTES } from "@/app/constants/routes";

import { ApplicationDetailUi } from "./application-detail.ui";
import type { TDetailTab } from "./types";

export const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useMe();

  const applicationId = Number(id);
  const [activeTab, setActiveTab] = useState<TDetailTab>("description");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => applicationService.findOneById(applicationId),
    enabled: !!user && !Number.isNaN(applicationId),
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
    // TODO: navigate to edit page when implemented
  }, []);

  const handleDelete = useCallback(() => {
    // TODO: implement delete with confirmation
  }, []);

  const handleToggleFavorite = useCallback(() => {
    // TODO: implement toggle favorite mutation
  }, []);

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
  );
};
