import { useState, useEffect, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { TFunction } from "i18next";
import { AxiosError } from "axios";

import { StepContactsUi } from "./step-contacts.ui";
import { contactService } from "@/lib/api/contact/contact.service";
import type { TCreateApplicationFormReturn } from "@/modules/application/schema/application-schema";
import type { TFormContact } from "../types";
import type { IApiErrors } from "@/shared/types/api";

interface IStepContactsProps {
  form: TCreateApplicationFormReturn;
  t: TFunction;
  applicationId?: number;
}

export const StepContacts = ({ form, t, applicationId }: IStepContactsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<TFormContact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TFormContact | null>(null);
  const contacts = useWatch({ control: form.control, name: "contacts" }) ?? [];
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
    queryKey: ["contacts", "search", debouncedSearch],
    queryFn: () =>
      debouncedSearch.trim()
        ? contactService.search(debouncedSearch.trim())
        : contactService.findAll(),
  });

  const { mutate: deleteContact } = useMutation({
    mutationFn: (id: number) => contactService.delete(id),
    onSuccess: (_data, id) => {
      const current = form.getValues("contacts");
      form.setValue(
        "contacts",
        current.filter((c) => c.id !== id),
        { shouldValidate: true }
      );
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      if (applicationId) {
        queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      }
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

  const { mutate: linkToApplication } = useMutation({
    mutationFn: ({ contactId, appId }: { contactId: number; appId: number }) =>
      contactService.linkToApplication(contactId, appId),
    onSuccess: () => {
      if (applicationId) {
        queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      }
    },
    onError: (_error, variables) => {
      const current = form.getValues("contacts");
      form.setValue(
        "contacts",
        current.filter((c) => c.id !== variables.contactId),
        { shouldValidate: true },
      );
      toast.error(t("pages.create.contacts.linkError"));
    },
  });

  const { mutate: unlinkFromApplication } = useMutation({
    mutationFn: ({ contactId, appId }: { contactId: number; appId: number; rollback: TFormContact }) =>
      contactService.unlinkFromApplication(contactId, appId),
    onSuccess: () => {
      if (applicationId) {
        queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      }
    },
    onError: (_error, variables) => {
      const current = form.getValues("contacts");
      form.setValue("contacts", [...current, variables.rollback], { shouldValidate: true });
      toast.error(t("pages.create.contacts.unlinkError"));
    },
  });

  const handleAdd = (contact: TFormContact) => {
    const formContact: TFormContact = {
      id: contact.id,
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      phone: contact.phone,
      profession: contact.profession,
    };
    form.setValue("contacts", [...contacts, formContact], { shouldValidate: true });

    if (applicationId) {
      linkToApplication({ contactId: contact.id, appId: applicationId });
    }
  };

  const handleRemove = (index: number) => {
    const contact = contacts[index];
    if (!contact) return;

    form.setValue(
      "contacts",
      contacts.filter((_: TFormContact, i: number) => i !== index),
      { shouldValidate: true }
    );

    if (applicationId) {
      unlinkFromApplication({ contactId: contact.id, appId: applicationId, rollback: contact });
    }
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

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteContact(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const canDeleteContact = (contact: TFormContact) => {
    const full = searchResults.find((c) => c.id === contact.id);
    return full ? !full.isUsed : false;
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  return (
    <StepContactsUi
      contacts={contacts}
      searchResults={searchResults}
      modalOpen={modalOpen}
      editContact={editContact}
      deleteTarget={deleteTarget}
      isServerFiltered
      t={t}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onEdit={(contact) => { setEditContact(contact); setModalOpen(true); }}
      onSaveEdit={handleEdit}
      onDeleteEntity={(contact) => setDeleteTarget(contact)}
      onConfirmDelete={confirmDelete}
      onModalOpenChange={(v) => { setModalOpen(v); if (!v) setEditContact(null); }}
      onCreateClick={() => { setEditContact(null); setModalOpen(true); }}
      onDeleteTargetClear={() => setDeleteTarget(null)}
      onSearchChange={handleSearchChange}
      canDelete={canDeleteContact}
    />
  );
};
