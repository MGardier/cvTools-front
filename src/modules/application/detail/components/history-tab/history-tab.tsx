import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { applicationHistoryService } from "@/lib/api/application-history/application-history.service";
import { useMe } from "@/shared/hooks/useMe";
import { EApplicationStatus } from "@/shared/types/entity";
import type { TApplicationStatus } from "@/shared/types/entity";
import { HistoryTabUi } from "./history-tab.ui";



interface IHistoryTabProps {
  applicationId: number;
}

export const HistoryTab = ({ applicationId }: IHistoryTabProps) => {
  const { t } = useTranslation("application");
  const queryClient = useQueryClient();
  const { user } = useMe();

  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TApplicationStatus>(EApplicationStatus.APPLIED as TApplicationStatus);

  const { data: historyData } = useQuery({
    queryKey: ["history", applicationId],
    queryFn: () => applicationHistoryService.findAll(applicationId),
    enabled: !!user && !Number.isNaN(applicationId),
  });

  const createHistoryMutation = useMutation({
    mutationFn: (data: { description: string; status: string; doneAt?: Date }) =>
      applicationHistoryService.create(applicationId, data as Parameters<typeof applicationHistoryService.create>[1]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history", applicationId] });
    },
    onError: () => toast.error(t("detail.history.error")),
  });

  const deleteHistoryMutation = useMutation({
    mutationFn: (historyId: number) =>
      applicationHistoryService.delete(applicationId, historyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history", applicationId] });
    },
    onError: () => toast.error(t("detail.history.error")),
  });

  const events = historyData?.data ?? [];

  const handleCreate = () => {
    if (!description.trim()) return;
    createHistoryMutation.mutate({ description: description.trim(), status });
    setDescription("");
    setShowForm(false);
  };

  return (
    <HistoryTabUi
      events={events}
      t={t}
      showForm={showForm}
      description={description}
      status={status}
      onShowForm={() => setShowForm(true)}
      onHideForm={() => { setShowForm(false); setDescription(""); }}
      onDescriptionChange={setDescription}
      onStatusChange={setStatus}
      onCreateHistory={handleCreate}
      onDeleteHistory={(id) => deleteHistoryMutation.mutate(id)}
    />
  );
};
