import { useState, useEffect, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { TFunction } from "i18next";
import { AxiosError } from "axios";

import { StepSkillsUi } from "./step-skills.ui";
import { skillService } from "@/lib/api/skill/skill.service";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { TFormSkill } from "../types";
import type { IApiErrors } from "@/shared/types/api";

interface IStepSkillsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
  applicationId?: number;
}

export const StepSkills = ({ form, t, applicationId }: IStepSkillsProps) => {
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
      const current = form.getValues("skills");
      form.setValue(
        "skills",
        current.filter((s) => s.id !== id),
        { shouldValidate: true }
      );
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      if (applicationId) {
        queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      }
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

  const { mutate: linkToApplication } = useMutation({
    mutationFn: ({ skillId, appId }: { skillId: number; appId: number }) =>
      skillService.linkToApplication(skillId, appId),
    onSuccess: () => {
      if (applicationId) {
        queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      }
    },
    onError: (_error, variables) => {
      const current = form.getValues("skills");
      form.setValue(
        "skills",
        current.filter((s) => s.id !== variables.skillId),
        { shouldValidate: true },
      );
      toast.error(t("pages.create.skills.linkError"));
    },
  });

  const { mutate: unlinkFromApplication } = useMutation({
    mutationFn: ({ skillId, appId }: { skillId: number; appId: number; rollback: TFormSkill }) =>
      skillService.unlinkFromApplication(skillId, appId),
    onSuccess: () => {
      if (applicationId) {
        queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      }
    },
    onError: (_error, variables) => {
      const current = form.getValues("skills");
      form.setValue("skills", [...current, variables.rollback], { shouldValidate: true });
      toast.error(t("pages.create.skills.unlinkError"));
    },
  });

  const handleAdd = (skill: TFormSkill) => {
    const formSkill: TFormSkill = {
      id: skill.id,
      label: skill.label,
      isOwner: skill.isOwner,
      isUsed: skill.isUsed,
    };
    form.setValue("skills", [...skills, formSkill], { shouldValidate: true });

    if (applicationId) {
      linkToApplication({ skillId: skill.id, appId: applicationId });
    }
  };

  const handleRemove = (index: number) => {
    const skill = skills[index];
    if (!skill) return;

    form.setValue(
      "skills",
      skills.filter((_: TFormSkill, i: number) => i !== index),
      { shouldValidate: true }
    );

    if (applicationId) {
      unlinkFromApplication({ skillId: skill.id, appId: applicationId, rollback: skill });
    }
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
    <StepSkillsUi
      skills={skills}
      searchResults={searchResults}
      modalOpen={modalOpen}
      editSkill={editSkill}
      deleteTarget={deleteTarget}
      isCreatingInline={isPending}
      t={t}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onEdit={(skill) => { setEditSkill(skill); setModalOpen(true); }}
      onSaveEdit={handleEdit}
      onDeleteEntity={(skill) => setDeleteTarget(skill)}
      onConfirmDelete={confirmDelete}
      onModalOpenChange={(v) => { setModalOpen(v); if (!v) setEditSkill(null); }}
      onCreateClick={() => { setEditSkill(null); setModalOpen(true); }}
      onCreateInline={(label) => findOrCreate(label)}
      onDeleteTargetClear={() => setDeleteTarget(null)}
      onSearchChange={handleSearchChange}
      canEdit={canEditSkill}
      canDelete={canDeleteSkill}
    />
  );
};
