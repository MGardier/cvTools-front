import { useState } from "react";
import { useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";
import { toast } from "react-toastify";
import type { TFunction } from "i18next";
import { AxiosError } from "axios";

import { EntitySearchField } from "@/shared/components/form/entity-search-field";
import { ConfirmDialog } from "@/shared/components/ui/confirm-dialog";
import { ContactModal } from "./contact-modal";
import { contactService } from "@/lib/api/contact/contact.service";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { TFormContact } from "../types";
import type { IApiErrors } from "@/shared/types/api";



interface IStepContactsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepContacts = ({ form, t }: IStepContactsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<TFormContact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TFormContact | null>(null);
  const contacts = useWatch({ control: form.control, name: "contacts" }) ?? [];
  const queryClient = useQueryClient();

  const { data: allContacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => contactService.findAll(),
  });

  const { mutate: deleteContact } = useMutation({
    mutationFn: (id: number) => contactService.delete(id),
    onSuccess: (_data, id) => {
      form.setValue(
        "contacts",
        contacts.filter((c: TFormContact) => c.id !== id),
        { shouldValidate: true }
      );
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success(t("pages.create.contacts.deleteSuccess"));
    },
    onError: (error: AxiosError<IApiErrors>) => {
      const code = error.response?.data?.message;
      if (code === "CONTACT_DELETE_CONFLICT") {
        toast.error(t("pages.create.contacts.deleteConflict"));
      } else {
        toast.error(t("pages.create.contacts.deleteError"));
      }
    },
  });

  const handleAdd = (contact: TFormContact) => {
    form.setValue("contacts", [...contacts, {
      id: contact.id,
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      phone: contact.phone,
      profession: contact.profession,
    }], { shouldValidate: true });
  };

  const handleRemove = (index: number) => {
    form.setValue(
      "contacts",
      contacts.filter((_: TFormContact, i: number) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleEdit = (contact: TFormContact) => {
    const updated = contacts.map((c: TFormContact) =>
      c.id === contact.id ? {
        id: contact.id,
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
        phone: contact.phone,
        profession: contact.profession,
      } : c
    );
    form.setValue("contacts", updated, { shouldValidate: true });
    setEditContact(null);
  };

  const handleDeleteEntity = (contact: TFormContact) => {
    setDeleteTarget(contact);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteContact(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="grid gap-4">
      <h3 className="text-sm font-medium">{t("pages.create.contacts.title")}</h3>

      <EntitySearchField<TFormContact>
        items={contacts}
        options={allContacts}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onEdit={(contact) => { setEditContact(contact); setModalOpen(true); }}
        onCreateClick={() => { setEditContact(null); setModalOpen(true); }}
        onDeleteEntity={handleDeleteEntity}
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
        onOpenChange={(v) => { setModalOpen(v); if (!v) setEditContact(null); }}
        onAdd={handleAdd}
        onEdit={handleEdit}
        editContact={editContact}
        t={t}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title={t("pages.create.contacts.confirmDelete.title")}
        description={deleteTarget ? t("pages.create.contacts.confirmDelete.description", {
          name: `${deleteTarget.firstname} ${deleteTarget.lastname}`,
        }) : ""}
        confirmLabel={t("pages.create.contacts.confirmDelete.confirm")}
        cancelLabel={t("pages.create.contacts.confirmDelete.cancel")}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
