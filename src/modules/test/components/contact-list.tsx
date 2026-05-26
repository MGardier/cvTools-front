import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { cn } from "@/shared/utils/utils";

import { CANDIDATE } from "../data/candidate";

import { CopyableItem } from "./copyable-item";

type TContactListProps = {
  className?: string;
};

export const ContactList = ({ className }: TContactListProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="flex w-fit items-center gap-1.5 text-xs text-zinc-600 transition duration-300 hover:scale-[1.10] hover:text-blue-500">
        <MapPin className="h-3.5 w-3.5 text-blue-400" />
        {CANDIDATE.location}
      </span>
      <CopyableItem icon={Mail} text={CANDIDATE.email} />
      <CopyableItem icon={Phone} text={CANDIDATE.phone} />
      <div className="mt-1 flex items-center gap-2">
        <a
          href={`https://${CANDIDATE.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-blue-400 transition duration-300 hover:scale-[1.10] hover:text-blue-500"
        >
          <Linkedin className="h-3.5 w-3.5" /> LinkedIn
        </a>
        <span className="text-zinc-200">·</span>
        <a
          href={`https://${CANDIDATE.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-blue-400 transition duration-300 hover:scale-[1.10] hover:text-blue-500"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
      </div>
    </div>
  );
};
