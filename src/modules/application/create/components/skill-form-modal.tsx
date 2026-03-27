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
  createSkillSchema,
  type TCreateSkillInput,
  type TCreateSkillOutput,
} from "@/modules/application/schema/skill-schema";
import { skillService } from "@/lib/api/skill/skill.service";
import type { ISkill } from "@/shared/types/entity";

interface ISkillFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (skill: ISkill) => void;
  t: TFunction;
}

export const SkillFormModal = ({ open, onOpenChange, onAdd, t }: ISkillFormModalProps) => {
  const schema = createSkillSchema(t);

  const form = useForm<TCreateSkillInput, unknown, TCreateSkillOutput>({
    resolver: zodResolver(schema),
    defaultValues: { label: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TCreateSkillOutput) =>
      skillService.create({ label: data.label }),
    onSuccess: (skill) => {
      onAdd(skill);
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error(t("pages.create.skills.modal.error"));
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("pages.create.skills.modal.title")}</DialogTitle>
          <DialogDescription>{t("pages.create.skills.modal.subtitle")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => { e.stopPropagation(); form.handleSubmit((data) => mutate(data))(e); }} className="grid gap-4">
            <InputField
              form={form}
              name="label"
              label={t("pages.create.skills.modal.label")}
              placeholder={t("pages.create.skills.modal.labelPlaceholder")}
              type="text"
              required
            />
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => { form.reset(); onOpenChange(false); }}>
                {t("pages.create.skills.modal.cancel")}
              </Button>
              <Button type="submit" disabled={isPending} className="bg-sky-600 hover:bg-sky-700">
                {t("pages.create.skills.modal.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
