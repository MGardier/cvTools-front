import { Badge } from "@/components/ui/badge";
import type { Job } from "@/types/entity";
 interface FindOneJobHeaderProps {
  job: Job;
}

export const FindOneJobHeader = ({ job }: FindOneJobHeaderProps) => {
  return (
    <div className=" flex justify-center items-center w-full h-15 inset-0 ">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="md:text-3xl text-2xl font-medium text-blue-400">
          {job?.jobTitle}
        </h3>
        <div className="flex flex-wrap gap-2 ">
          {job.technologies.map((tech, index) => (
            <Badge variant="blue" key={`${tech}-${index}`}>
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
