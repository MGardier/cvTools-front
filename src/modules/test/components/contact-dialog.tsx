import { Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/utils/utils";

import { ContactList } from "./contact-list";

type TContactDialogProps = {
  className?: string;
};

export const ContactDialog = ({ className }: TContactDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-fit items-center gap-2 self-center rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-xs font-medium text-zinc-600 shadow-sm transition duration-300 hover:border-blue-300 hover:text-blue-400",
            className,
          )}
        >
          <Mail className="h-3.5 w-3.5" />
          Me contacter
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Me contacter</DialogTitle>
        </DialogHeader>
        <ContactList className="mt-1 items-center" />
      </DialogContent>
    </Dialog>
  );
};
