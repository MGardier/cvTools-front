import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { noteService } from "@/lib/api/note/note.service";
import { useMe } from "@/shared/hooks/useMe";
import type { INote } from "@/shared/types/entity";

import { NotesTabUi } from "./notes-tab.ui";

interface INotesTabProps {
  applicationId: number;
}

export const NotesTab = ({ applicationId }: INotesTabProps) => {
  const { t } = useTranslation("application");
  const queryClient = useQueryClient();
  const { user } = useMe();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [createValue, setCreateValue] = useState("");
  const [createKey, setCreateKey] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: notesData } = useQuery({
    queryKey: ["notes", applicationId, sortOrder],
    queryFn: () => noteService.findAll(applicationId, sortOrder),
    enabled: !!user && !Number.isNaN(applicationId),
  });

  const createNoteMutation = useMutation({
    mutationFn: (description: string) =>
      noteService.create(applicationId, { description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", applicationId] });
    },
    onError: () => toast.error(t("detail.notes.error")),
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ id, description }: { id: number; description: string }) =>
      noteService.update(applicationId, id, { description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", applicationId] });
    },
    onError: () => toast.error(t("detail.notes.error")),
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: number) => noteService.delete(applicationId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", applicationId] });
    },
    onError: () => toast.error(t("detail.notes.error")),
  });

  const notes = notesData?.data ?? [];

  const handleCreate = () => {
    if (!createValue.trim() || createValue === "<p></p>") return;
    createNoteMutation.mutate(createValue);
    setCreateValue("");
    setCreateKey((k) => k + 1);
  };

  const handleStartEdit = (note: INote) => {
    setEditingId(note.id);
    setEditValue(note.description);
  };

  const handleSaveEdit = () => {
    if (editingId === null || !editValue.trim() || editValue === "<p></p>") return;
    updateNoteMutation.mutate({ id: editingId, description: editValue });
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <NotesTabUi
      notes={notes}
      t={t}
      createValue={createValue}
      createKey={createKey}
      editingId={editingId}
      editValue={editValue}
      sortOrder={sortOrder}
      onCreateValueChange={setCreateValue}
      onEditValueChange={setEditValue}
      onCreateNote={handleCreate}
      onStartEdit={handleStartEdit}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      onDeleteNote={(id) => deleteNoteMutation.mutate(id)}
      onToggleSort={handleToggleSort}
    />
  );
};
