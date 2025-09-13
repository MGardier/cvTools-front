import type { Job } from "@/types/entity";
import {  Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from '@/components/ui/badge';

interface JobChronologyProps {
  job: Job;
}



export const JobChronology = ({job}: JobChronologyProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="shadow-sm dark:shadow-gray-700 rounded-md bg-white sticky top-20">
      <div
        className="p-6 flex gap-1 items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-lg font-semibold">Informations</h5>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isOpen && (
        <div className="p-6 border-t border-slate-100 dark:border-t-gray-700">
          <ul className="list-none">
            <li className="flex items-center">
              <div className="my-2">
                <p className="font-medium">Technologies:</p>
                <div className="flex flex-wrap gap-2 my-2">
                  {job.technologies.map((tech) => (
                    <Badge variant="blue" key={`${tech}-${tech.id}`}>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </li>
            <li className="flex items-center">
              <Building2 />

              <div className="ms-4">
                <p className="font-medium">Entreprise:</p>
                <span className="text-blue-500 font-medium text-sm">
                  {job.enterprise}
                </span>
              </div>
            </li>


          </ul>
        </div>
      )}
    </div>
  );
};
