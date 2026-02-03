/****************************  USER **************************************************************************** */

export type TUserStatus =
  "ALLOWED"
  | "PENDING"
  | "BANNED"


export type TUserRoles =
  "ADMIN"
  | "USER"




export interface IUser {
  id: string;
  email: string;
  status: TUserStatus
  roles: TUserRoles;
  createdAt?: Date;
  updatedAt?: Date;

}
