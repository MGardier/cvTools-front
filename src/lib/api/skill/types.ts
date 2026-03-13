

export interface ICreateSkillParams {
  label: string;
}

export interface IUpdateSkillParams extends Partial<ICreateSkillParams>{

}


export interface ISkillResponse {
  id: number;
  label: string 
  createdAt: Date;
}