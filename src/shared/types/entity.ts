/****************************  USER **************************************************************************** */

export type TUserStatus =
  "ALLOWED"
  | "PENDING"
  | "BANNED"


export type TUserRoles =
  "ADMIN"
  | "USER"




export interface IUserResponse {
  id: number;
  email: string;
  status: TUserStatus;
  roles: TUserRoles;
}
