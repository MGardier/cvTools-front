import { jobFormSchema } from "../schema/job-schema";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

import type { Job } from "@/types/entity";
import type { TFunction } from "i18next";
import type { UseJobFormReturn } from "../types/hook";


interface useJobFormProps {
  job?: Job;
  t: TFunction<"job">;
  handleSubmit: (values: z.infer<ReturnType<typeof jobFormSchema>>) => any;
}

export const useJobForm = ({
  job,
  t,
  handleSubmit,
}: useJobFormProps): UseJobFormReturn => {
  

    const fieldsByStep = {
    first: new Set([
      "jobTitle",
      "technologies",
      "status",
      "compatibility",
      "isFavorite",
    ]),
    second: new Set(["enterprise", "type", "applicationMethod", "appliedAt"]),
    third: new Set(["description", "rating", "rejectedReason", "isArchived"]),
    fourth: new Set(["link", "address", "notes"]),
    fifth: new Set([
      "managerName",
      "managerEmail",
      "interviewCount",
      "lastContactAt",
    ]),
  };

  const values = {
    //REQUIRED
    enterprise: job?.enterprise ? job.enterprise : "",
    link: job?.link ? job.link : "",
    jobTitle: job?.jobTitle ? job.jobTitle : "",
    rating: job?.rating ? job.rating : 0,
    isArchived: job?.isArchived ? job.isArchived : false,
    isFavorite: job?.isFavorite ? job.isFavorite : false,
    interviewCount: job?.interviewCount ? job.interviewCount : 0,

    //OPTIONNAL
    managerName: job?.managerName ? job.managerName : "",
    managerEmail: job?.managerEmail ? job.managerEmail : "",
    appliedAt: job?.appliedAt ?job.appliedAt : "" as "",
    lastContactAt: job?.lastContactAt ? job.lastContactAt : "" as "",
    rejectedReason: job?.rejectedReason ? job.rejectedReason : "",
    description: job?.description ? job.description : "",
    notes: job?.notes ? job.notes : "",

    //ENUM
    type: job?.type as any ,
    status: job?.status as any ,
    compatibility: job?.compatibility  as any,
    applicationMethod: job?.applicationMethod as  any,

    //NESTED
    technologies:
      job?.technologies && job?.technologies?.length > 0
        ? [...job.technologies.map((tech) => {
            return { name: tech.name };
          }), { name: "" }]: [{ name: "" }],
    address: {
      city: job?.address?.city ? job.address.city : "",
      postalCode: job?.address?.postalCode ? job.address.postalCode : "",
    },
  };

  const schema = jobFormSchema(t);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as Resolver<z.infer<typeof schema>>,
    defaultValues: values,
    values   ,
  });

  const technologiesFields = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    handleSubmit(values);
  };

  return {
    form,
    onSubmit,
    technologiesFields,
    fieldsByStep,
  };
};
