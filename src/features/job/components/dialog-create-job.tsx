import { FormCardContent } from "@/components/form/form-card-content";
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
import { Plus, X } from "lucide-react";
import { useCreateJob } from "../hooks/useCreateJob";
import { FormCardField } from "@/components/form/form-card-field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TechnologiesForm } from "./technologies-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypeEnterprise } from "@/types/entity";

export function DialogCreateJob() {
  const { t, onSubmit, form, error, isPending, isError, technologiesFields } =
    useCreateJob();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="flex  gap-2  text-white" variant="blue">
            <Plus />
            Ajouter
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:min-w-4xl md:min-w-2xl min-w-64">
          <DialogHeader>
            <DialogTitle>{t("pages.createJob.title")}</DialogTitle>
            <DialogDescription>
              {isError && (
                <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
                  <p>
                    <b>
                      {error?.message
                        ? t(`messages.errors.api.${error.message}.short`)
                        : t("messages.errors.fallback")}
                    </b>
                    .
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <Card className="border-0 shadow-none w-full ">
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
                  label={t("pages.createJob.form.enterprise.label")}
                  name="enterprise"
                  type="text"
                  placeholder={t("pages.createJob.form.enterprise.placeholder")}
                  required
                  {...{ form }}
                />
              </div>

              <div className="grid gap-6">
                {/** TITLE  */}
                <FormCardField
                  label={t("pages.createJob.form.jobTitle.label")}
                  name="jobTitle"
                  type="text"
                  placeholder={t("pages.createJob.form.jobTitle.placeholder")}
                  required
                  {...{ form }}
                />
              </div>
              <TechnologiesForm {...{ form, t, technologiesFields }} />
              <div className="grid gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          Object.values(TypeEnterprise).map((value)=><SelectItem value={value}>
                          {value}
                        </SelectItem>)
                        }
                        
    
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
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
