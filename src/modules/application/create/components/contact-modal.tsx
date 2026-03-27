import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { TFunction } from "i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { InputField } from "@/shared/components/form/input-field";
import {
  createContactSchema,
  type TCreateContactInput,
  type TCreateContactOutput,
} from "@/modules/application/schema/contact-schema";
import { contactService } from "@/lib/api/contact/contact.service";
import type { IContact } from "@/shared/types/entity";

interface IContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (contact: IContact) => void;
  onEdit?: (contact: IContact) => void;
  editContact?: { id: number; firstname: string; lastname: string; email: string; phone?: string; profession: string } | null;
  t: TFunction;
}

export const ContactModal = ({ open, onOpenChange, onAdd, onEdit, editContact, t }: IContactModalProps) => {
  const schema = createContactSchema(t);
  const isEditing = !!editContact;

  const form = useForm<TCreateContactInput, unknown, TCreateContactOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      profession: "",
    },
  });

  useEffect(() => {
    if (open && editContact) {
      form.reset({
        firstname: editContact.firstname,
        lastname: editContact.lastname,
        email: editContact.email,
        phone: editContact.phone ?? "",
        profession: editContact.profession,
      });
    } else if (open) {
      form.reset({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        profession: "",
      });
    }
  }, [open, editContact]);

  const { mutate: createMutate, isPending: isCreating } = useMutation({
    mutationFn: (data: TCreateContactOutput) =>
      contactService.create({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        profession: data.profession,
        phone: data.phone,
      }),
    onSuccess: (contact) => {
      onAdd(contact);
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t("pages.create.contacts.modal.error"));
    },
  });

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: TCreateContactOutput) =>
      contactService.update(editContact!.id, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        profession: data.profession,
        phone: data.phone,
      }),
    onSuccess: (contact) => {
      onEdit?.(contact);
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t("pages.create.contacts.modal.error"));
    },
  });

  const isPending = isCreating || isUpdating;

  const handleSubmit = (data: TCreateContactOutput) => {
    if (isEditing) {
      updateMutate(data);
    } else {
      createMutate(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t("pages.create.contacts.modal.editTitle") : t("pages.create.contacts.modal.title")}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? t("pages.create.contacts.modal.editSubtitle") : t("pages.create.contacts.modal.subtitle")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => { e.stopPropagation(); form.handleSubmit(handleSubmit)(e); }} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                form={form}
                name="firstname"
                label={t("pages.create.contacts.modal.firstname")}
                placeholder={t("pages.create.contacts.modal.firstnamePlaceholder")}
                type="text"
                required
              />
              <InputField
                form={form}
                name="lastname"
                label={t("pages.create.contacts.modal.lastname")}
                placeholder={t("pages.create.contacts.modal.lastnamePlaceholder")}
                type="text"
                required
              />
            </div>
            <InputField
              form={form}
              name="email"
              label={t("pages.create.contacts.modal.email")}
              placeholder={t("pages.create.contacts.modal.emailPlaceholder")}
              type="email"
              required
            />
            <InputField
              form={form}
              name="phone"
              label={t("pages.create.contacts.modal.phone")}
              placeholder={t("pages.create.contacts.modal.phonePlaceholder")}
              type="tel"
            />
            <InputField
              form={form}
              name="profession"
              label={t("pages.create.contacts.modal.profession")}
              placeholder={t("pages.create.contacts.modal.professionPlaceholder")}
              type="text"
              required
            />
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => { form.reset(); onOpenChange(false); }}>
                {t("pages.create.contacts.modal.cancel")}
              </Button>
              <Button type="submit" disabled={isPending} className="bg-sky-600 hover:bg-sky-700">
                {isEditing ? t("pages.create.contacts.modal.save") : t("pages.create.contacts.modal.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
