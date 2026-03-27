import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";
import type { TFunction } from "i18next";

import { EntitySearchField } from "@/shared/components/form/entity-search-field";
import { ContactModal } from "./contact-modal";
import { contactService } from "@/lib/api/contact/contact.service";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { TFormContact } from "../types";



interface IStepContactsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepContacts = ({ form, t }: IStepContactsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<TFormContact | null>(null);
  const contacts = form.watch("contacts") ?? [];

  const { data: allContacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => contactService.findAll(),
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
        getItemId={(c) => c.id}
        getSearchValue={(c) => `${c.firstname} ${c.lastname} ${c.email} ${c.profession}`}
        
        //Auto complete render
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
    </div>
  );
};
