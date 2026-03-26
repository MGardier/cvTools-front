import { useState } from "react";
import type { TFunction } from "i18next";

import { EntityBadgeField } from "@/shared/components/form/entity-badge-field";
import { SkillFormModal } from "./skill-form-modal";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { ISkill } from "@/shared/types/entity";

interface IStepSkillsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepSkills = ({ form, t }: IStepSkillsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const skills = form.watch("skills") ?? [];

  const handleAddSkill = (skill: ISkill) => {
    form.setValue("skills", [...skills, skill], { shouldValidate: true });
  };

  const handleRemoveSkill = (index: number) => {
    form.setValue(
      "skills",
      skills.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <>
      <EntityBadgeField
        title={t("pages.create.skills.title")}
        items={skills}
        getLabel={(s) => s.label}
        onRemove={handleRemoveSkill}
        onAddClick={() => setModalOpen(true)}
        addLabel={t("pages.create.skills.add")}
        emptyText={t("pages.create.skills.empty")}
      />
      <SkillFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAdd={handleAddSkill}
        t={t}
      />
    </>
  );
};
