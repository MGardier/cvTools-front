
export type TFormContact = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  profession: string;
};

export type TFormSkill = {
  id: number;
  label: string;
  isOwner?: boolean;
  isUsed?: boolean;
};
