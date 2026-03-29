import { useState, useEffect, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { TFunction } from "i18next";
import { AxiosError } from "axios";

import { EntitySearchField } from "@/shared/components/form/entity-search-field";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { SkillFormModal } from "./skill-form-modal";
import { skillService } from "@/lib/api/skill/skill.service";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { TFormSkill } from "../types";
import type { IApiErrors } from "@/shared/types/api";

interface IStepSkillsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepSkills = ({ form, t }: IStepSkillsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editSkill, setEditSkill] = useState<TFormSkill | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TFormSkill | null>(null);
  const skills = useWatch({ control: form.control, name: "skills" }) ?? [];
  const queryClient = useQueryClient();

  // ── Debounced server-side search ──
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: searchResults = [] } = useQuery({
    queryKey: ["skills", "search", debouncedSearch],
    queryFn: () =>
      debouncedSearch.trim()
        ? skillService.search(debouncedSearch.trim())
        : skillService.findAll(),
  });

  const { mutate: findOrCreate, isPending } = useMutation({
    mutationFn: (label: string) => skillService.findOrCreate({ label }),
    onSuccess: (skill) => {
      handleAdd({
        id: skill.id,
        label: skill.label,
        isOwner: skill.isOwner,
        isUsed: skill.isUsed,
      });
    },
    onError: () => {
      toast.error(t("pages.create.skills.modal.error"));
    },
  });

  const { mutate: deleteSkill } = useMutation({
    mutationFn: (id: number) => skillService.delete(id),
    onSuccess: (_data, id) => {
      form.setValue(
        "skills",
        skills.filter((s: TFormSkill) => s.id !== id),
        { shouldValidate: true }
      );
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success(t("pages.create.skills.deleteSuccess"));
    },
    onError: (error: AxiosError<IApiErrors>) => {
      const code = error.response?.data?.message;
      if (code === "SKILL_DELETE_CONFLICT" || code === "SKILL_UPDATE_CONFLICT") {
        toast.error(t("pages.create.skills.deleteConflict"));
      } else {
        toast.error(t("pages.create.skills.deleteError"));
      }
    },
  });

  const handleAdd = (skill: TFormSkill) => {
    form.setValue(
      "skills",
      [...skills, { id: skill.id, label: skill.label, isOwner: skill.isOwner, isUsed: skill.isUsed }],
      { shouldValidate: true }
    );
  };

  const handleRemove = (index: number) => {
    form.setValue(
      "skills",
      skills.filter((_: TFormSkill, i: number) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleEdit = (skill: TFormSkill) => {
    const updated = skills.map((s: TFormSkill) =>
      s.id === skill.id
        ? { id: skill.id, label: skill.label, isOwner: skill.isOwner, isUsed: skill.isUsed }
        : s
    );
    form.setValue("skills", updated, { shouldValidate: true });
    setEditSkill(null);
  };

  const handleDeleteEntity = (skill: TFormSkill) => {
    setDeleteTarget(skill);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const canEditSkill = (skill: TFormSkill) => !!skill.isOwner && !skill.isUsed;
  const canDeleteSkill = (skill: TFormSkill) => !!skill.isOwner && !skill.isUsed;

  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-medium">{t("pages.create.skills.title")}</h3>

      <EntitySearchField<TFormSkill>
        items={skills}
        options={searchResults}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onEdit={(skill) => { setEditSkill(skill); setModalOpen(true); }}
        onCreateClick={() => { setEditSkill(null); setModalOpen(true); }}
        onDeleteEntity={handleDeleteEntity}
        canEdit={canEditSkill}
        canDelete={canDeleteSkill}
        onSearchChange={handleSearchChange}
        isServerFiltered
        getItemId={(s) => s.id}
        getSearchValue={(s) => s.label}
        renderOption={(s) => s.label}
        renderItem={(s) => <span className="text-sm truncate">{s.label}</span>}
        placeholder={t("pages.create.skills.searchPlaceholder")}
        emptyText={t("pages.create.skills.empty")}
        gridClassName="grid-cols-2 sm:grid-cols-3"
        onCreateInline={(label) => findOrCreate(label)}
        createInlineLabel={(label) => t("pages.create.skills.createNew", { label })}
        isCreatingInline={isPending}
      />

      <SkillFormModal
        open={modalOpen}
        onOpenChange={(v) => { setModalOpen(v); if (!v) setEditSkill(null); }}
        onAdd={handleAdd}
        onEdit={handleEdit}
        editSkill={editSkill}
        t={t}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title={t("pages.create.skills.confirmDelete.title")}
        description={deleteTarget ? t("pages.create.skills.confirmDelete.description", {
          name: deleteTarget.label,
        }) : ""}
        confirmLabel={t("pages.create.skills.confirmDelete.confirm")}
        cancelLabel={t("pages.create.skills.confirmDelete.cancel")}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
