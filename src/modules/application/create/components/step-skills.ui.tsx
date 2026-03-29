import type { TFunction } from "i18next";

import { EntitySearchField } from "@/shared/components/form/entity-search-field";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { SkillFormModal } from "./skill-form-modal";
import type { TFormSkill } from "../types";
import type { ISkill } from "@/shared/types/entity";

interface IStepSkillsUiProps {
  skills: TFormSkill[];
  searchResults: ISkill[];
  modalOpen: boolean;
  editSkill: TFormSkill | null;
  deleteTarget: TFormSkill | null;
  isCreatingInline: boolean;
  t: TFunction;
  onAdd: (skill: TFormSkill) => void;
  onRemove: (index: number) => void;
  onEdit: (skill: TFormSkill) => void;
  onSaveEdit: (skill: TFormSkill) => void;
  onDeleteEntity: (skill: TFormSkill) => void;
  onConfirmDelete: () => void;
  onModalOpenChange: (open: boolean) => void;
  onCreateClick: () => void;
  onCreateInline: (label: string) => void;
  onDeleteTargetClear: () => void;
  onSearchChange: (value: string) => void;
  canEdit: (skill: TFormSkill) => boolean;
  canDelete: (skill: TFormSkill) => boolean;
}

export const StepSkillsUi = ({
  skills,
  searchResults,
  modalOpen,
  editSkill,
  deleteTarget,
  isCreatingInline,
  t,
  onAdd,
  onRemove,
  onEdit,
  onSaveEdit,
  onDeleteEntity,
  onConfirmDelete,
  onModalOpenChange,
  onCreateClick,
  onCreateInline,
  onDeleteTargetClear,
  onSearchChange,
  canEdit,
  canDelete,
}: IStepSkillsUiProps) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-medium">{t("pages.create.skills.title")}</h3>

      <EntitySearchField<TFormSkill>
        items={skills}
        options={searchResults}
        onAdd={onAdd}
        onRemove={onRemove}
        onEdit={(skill) => onEdit(skill)}
        onCreateClick={onCreateClick}
        onDeleteEntity={onDeleteEntity}
        canEdit={canEdit}
        canDelete={canDelete}
        onSearchChange={onSearchChange}
        isServerFiltered
        getItemId={(s) => s.id}
        getSearchValue={(s) => s.label}
        renderOption={(s) => s.label}
        renderItem={(s) => <span className="text-sm truncate">{s.label}</span>}
        placeholder={t("pages.create.skills.searchPlaceholder")}
        emptyText={t("pages.create.skills.empty")}
        gridClassName="grid-cols-2 sm:grid-cols-3"
        onCreateInline={onCreateInline}
        createInlineLabel={(label) => t("pages.create.skills.createNew", { label })}
        isCreatingInline={isCreatingInline}
      />

      <SkillFormModal
        open={modalOpen}
        onOpenChange={onModalOpenChange}
        onAdd={onAdd}
        onEdit={onSaveEdit}
        editSkill={editSkill}
        t={t}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) onDeleteTargetClear(); }}
        title={t("pages.create.skills.confirmDelete.title")}
        description={deleteTarget ? t("pages.create.skills.confirmDelete.description", {
          name: deleteTarget.label,
        }) : ""}
        confirmLabel={t("pages.create.skills.confirmDelete.confirm")}
        cancelLabel={t("pages.create.skills.confirmDelete.cancel")}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};
