import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { TFunction } from "i18next";

import { EntitySearchField } from "@/shared/components/form/entity-search-field";
import { SkillFormModal } from "./skill-form-modal";
import { skillService } from "@/lib/api/skill/skill.service";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";

type TFormSkill = { id: number; label: string };

interface IStepSkillsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepSkills = ({ form, t }: IStepSkillsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editSkill, setEditSkill] = useState<TFormSkill | null>(null);
  const skills = form.watch("skills") ?? [];

  const { data: allSkills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillService.findAll(),
  });

  const { mutate: findOrCreate, isPending } = useMutation({
    mutationFn: (label: string) => skillService.findOrCreate({ label }),
    onSuccess: (skill) => {
      handleAdd({ id: skill.id, label: skill.label });
    },
    onError: () => {
      toast.error(t("pages.create.skills.modal.error"));
    },
  });

  const handleAdd = (skill: TFormSkill) => {
    form.setValue("skills", [...skills, { id: skill.id, label: skill.label }], { shouldValidate: true });
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
      s.id === skill.id ? { id: skill.id, label: skill.label } : s
    );
    form.setValue("skills", updated, { shouldValidate: true });
    setEditSkill(null);
  };

  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-medium">{t("pages.create.skills.title")}</h3>

      <EntitySearchField<TFormSkill>
        items={skills}
        options={allSkills}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onEdit={(skill) => { setEditSkill(skill); setModalOpen(true); }}
        onCreateClick={() => { setEditSkill(null); setModalOpen(true); }}
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
    </div>
  );
};
