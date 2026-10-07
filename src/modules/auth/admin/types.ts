import type { IApiResponse } from "@/shared/types/api";
import type { IUser } from "@/shared/types/entity";

/************************************************** VALIDATE INVITATION ********************************/

export interface IValidateAdminInvitationParams {
  token: string;
}

export type IValidateAdminInvitationResponse = IApiResponse<{
  email: string;
}>;

/************************************************** REGISTER (PASSWORD) ********************************/

export interface IRegisterAdminParams {
  token: string;
  password: string;
}

export type IRegisterAdminResponse = IApiResponse<IUser>;
