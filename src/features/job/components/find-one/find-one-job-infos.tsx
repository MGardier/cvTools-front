import type { Job } from "@/types/entity";
import { FindOneJobInfosField } from "./find-one-job-infos-field";
import { Building2, ChevronDown, ChevronUp,  Info, Mail,  MapPin, Percent, User } from "lucide-react";
import { useState } from "react";

 interface FindOneJobInfosProps {
  job: Job;
}


export const FindOneJobInfos = ({job}:FindOneJobInfosProps) => {
  const [isOpen,setIsOpen] = useState(false);
  return (

      <div className="shadow-sm">
        <div className="p-6 flex items-center justify-center gap-1  " onClick={()=> setIsOpen(!isOpen)}>
          <h5 className="text-lg font-semibold">Informations</h5>
          {isOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </div>
        {isOpen && (<div className="p-6 border-t border-slate-100">
          <ul className="list-none">
            <FindOneJobInfosField icon={Info } title={"Status"} value={job.status} />
            <FindOneJobInfosField icon={Percent} title={"Compatibilité"} value={job.compatibility} />
            <FindOneJobInfosField icon={Building2} title={"Entreprise"} value={`${job.enterprise} (${job.type})`} />
            <FindOneJobInfosField icon={User} title={"Nom du contact"} value={job.managerName || "Non renseigné"} />
            <FindOneJobInfosField icon={Mail} title={"Email du contact"} value={job.managerEmail || "Non renseigné"} />
            <FindOneJobInfosField icon={MapPin} title={"Ville"} value={`${job.address.city} - ${job.address.postalCode}`} />

          </ul>
        </div>)}
        </div>
      
   
  );
};
