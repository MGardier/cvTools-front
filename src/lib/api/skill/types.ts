import type { ISkill } from "@/shared/types/entity";


export type TCreateSkillParams = Pick<ISkill,'label'> ;

export type TUpdateSkillParams  = Partial<TCreateSkillParams>;
