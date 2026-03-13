// =============================================================================
//                               USER
// =============================================================================

export type TUserStatus =
  "ALLOWED"
  | "PENDING"
  | "BANNED"


export type TUserRoles =
  "ADMIN"
  | "USER"




export interface IUser {
  id: number;
  email: string;
  status: TUserStatus;
  roles: TUserRoles;
}


// =============================================================================
//                               CONTACT
// =============================================================================

export interface IContact {
  id: number
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
  phone?: string;
}

// =============================================================================
//                               SKILL
// =============================================================================

export interface ISkill {
  id: number
  label: string;
  createdAt: Date;
}