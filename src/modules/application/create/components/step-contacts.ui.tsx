import { Mail, Phone } from "lucide-react";
import type { TFunction } from "i18next";

import { EntitySearchField } from "@/shared/components/form/entity-search-field";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { ContactModal } from "./contact-modal";
import type { TFormContact } from "../types";
import type { IContact } from "@/shared/types/entity";

interface IStepContactsUiProps {
  contacts: TFormContact[];
  searchResults: IContact[];
  modalOpen: boolean;
  editContact: TFormContact | null;
  deleteTarget: TFormContact | null;
  isServerFiltered: boolean;
  t: TFunction;
  onAdd: (contact: TFormContact) => void;
  onRemove: (index: number) => void;
  onEdit: (contact: TFormContact) => void;
  onSaveEdit: (contact: TFormContact) => void;
  onDeleteEntity: (contact: TFormContact) => void;
  onConfirmDelete: () => void;
  onModalOpenChange: (open: boolean) => void;
  onCreateClick: () => void;
  onDeleteTargetClear: () => void;
  onSearchChange: (value: string) => void;
  canDelete: (contact: TFormContact) => boolean;
}

export const StepContactsUi = ({
  contacts,
  searchResults,
  modalOpen,
  editContact,
  deleteTarget,
  isServerFiltered,
  t,
  onAdd,
  onRemove,
  onEdit,
  onSaveEdit,
  onDeleteEntity,
  onConfirmDelete,
  onModalOpenChange,
  onCreateClick,
  onDeleteTargetClear,
  onSearchChange,
  canDelete,
}: IStepContactsUiProps) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-medium">{t("pages.create.contacts.title")}</h3>

      <EntitySearchField<TFormContact>
        items={contacts}
        options={searchResults}
        onAdd={onAdd}
        onRemove={onRemove}
        onEdit={(contact) => onEdit(contact)}
        onCreateClick={onCreateClick}
        onDeleteEntity={onDeleteEntity}
        canDelete={canDelete}
        onSearchChange={onSearchChange}
        isServerFiltered={isServerFiltered}
        getItemId={(c) => c.id}
        getSearchValue={(c) => `${c.firstname} ${c.lastname} ${c.email} ${c.profession}`}
        renderOption={(c) => (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">
              {c.firstname} {c.lastname}
            </span>
            <span className="text-xs text-muted-foreground">
              {c.profession} · {c.email}
            </span>
          </div>
        )}
        renderItem={(c) => (
          <>
            <p className="text-sm font-medium truncate">
              {c.firstname} {c.lastname}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {c.profession}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                <Mail className="w-3 h-3 shrink-0" />
                {c.email}
              </span>
              {c.phone && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3 shrink-0" />
                  {c.phone}
                </span>
              )}
            </div>
          </>
        )}
        placeholder={t("pages.create.contacts.searchPlaceholder")}
        emptyText={t("pages.create.contacts.empty")}
        gridClassName="grid-cols-1 sm:grid-cols-2"
      />

      <ContactModal
        open={modalOpen}
        onOpenChange={onModalOpenChange}
        onAdd={onAdd}
        onEdit={onSaveEdit}
        editContact={editContact}
        t={t}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) onDeleteTargetClear(); }}
        title={t("pages.create.contacts.confirmDelete.title")}
        description={deleteTarget ? t("pages.create.contacts.confirmDelete.description", {
          name: `${deleteTarget.firstname} ${deleteTarget.lastname}`,
        }) : ""}
        confirmLabel={t("pages.create.contacts.confirmDelete.confirm")}
        cancelLabel={t("pages.create.contacts.confirmDelete.cancel")}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};
