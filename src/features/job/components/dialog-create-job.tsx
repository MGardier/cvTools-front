import { FormCardContent } from "@/components/form/form-card-content";
import { FormCardHeader } from "@/components/form/form-card-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCreateJob } from "../hooks/useCreateJob";
import { FormCardField } from "@/components/form/form-card-field";

export function DialogCreateJob() {
  const {t,onSubmit,form, isPending} = useCreateJob();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="flex  gap-2  text-white" variant="blue">
            <Plus />
            Ajouter
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("pages.createJob.title")}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
            <FormCardHeader title={t("pages.createJob.title")}>
  
    
            </FormCardHeader>

            <FormCardContent
              {...{
                onSubmit,
                form,
                labelButton: t("pages.createJob.form.button"),
                isLoading: isPending,
              }}
            >


              <div className="grid gap-6">
                {/** ENTERPRISE  */}
                <FormCardField
                  label={t("pages.signUp.form.enterprise")}
                  name="enterprise"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  {...{ form }}
                />


              </div>
            </FormCardContent>
          </Card>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
