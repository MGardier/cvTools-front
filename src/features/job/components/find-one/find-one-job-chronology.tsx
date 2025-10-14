import type { Job } from "@/types/entity";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { FindOneJobInfosField } from "./find-one-job-infos-field";


interface FindOneJobChronologyProps {
  job: Job;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const FindOneJobChronology = ({ job }: FindOneJobChronologyProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-sm">
      <div
        className="p-6 flex items-center justify-center gap-1  "
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-lg font-semibold">Chronologie</h5>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen && (
        <div className="p-6 border-t border-slate-100">
          <ul className="list-none">
            <FindOneJobInfosField
              icon={FileText}
              title={"Créée le "}
              value={formatDate(job.createdAt)}
            />
            <FindOneJobInfosField
              icon={Send}
              title={"Postulé le"}
              value={
                job.appliedAt ? formatDate(job.appliedAt) : "Non renseigné"
              }
            />
            <FindOneJobInfosField
              icon={MessageSquare}
              title={"Dernier contact"}
              value={
                job.lastContactAt
                  ? formatDate(job.lastContactAt)
                  : "Non renseigné"
              }
            />
            {job.interviewCount > 0 && (
              <FindOneJobInfosField
                icon={User}
                title={"Nombre d'entretiens"}
                value={String(job.interviewCount)}
              />
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
