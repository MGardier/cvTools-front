import { useState } from "react";
import type { TFunction } from "i18next";

import { EntityBadgeField } from "@/shared/components/form/entity-badge-field";
import { ContactModal } from "./contact-modal";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { IContact } from "@/shared/types/entity";

interface IStepContactsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
}

export const StepContacts = ({ form, t }: IStepContactsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const contacts = form.watch("contacts") ?? [];

  const handleAddContact = (contact: IContact) => {
    form.setValue("contacts", [...contacts, contact], { shouldValidate: true });
  };

  const handleRemoveContact = (index: number) => {
    form.setValue(
      "contacts",
      contacts.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <>
      <EntityBadgeField
        title={t("pages.create.contacts.title")}
        items={contacts}
        getLabel={(c) => `${c.firstname} ${c.lastname} (${c.email})`}
        onRemove={handleRemoveContact}
        onAddClick={() => setModalOpen(true)}
        addLabel={t("pages.create.contacts.add")}
        emptyText={t("pages.create.contacts.empty")}
      />
      <ContactModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAdd={handleAddContact}
        t={t}
      />
    </>
  );
};
