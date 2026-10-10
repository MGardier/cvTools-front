import { orpcClient } from "@/lib/orpc/client";
import type {
  IRegisterAdminParams,
  IRegisterAdminResponse,
  IValidateAdminInvitationParams,
  IValidateAdminInvitationResponse,
} from "@/modules/auth/admin/types";

// Routes, methods and payloads are defined by @cvtools/contracts (contract.admin).
export const adminApi = {
  /**************** VALIDATE INVITATION ************************************************************/

  async validateInvitation(
    params: IValidateAdminInvitationParams,
  ): Promise<IValidateAdminInvitationResponse> {
    return await orpcClient.admin.validateInvitation({ token: params.token });
  },

  /**************** REGISTER (PASSWORD) ************************************************************/

  async register(
    params: IRegisterAdminParams,
  ): Promise<IRegisterAdminResponse> {
    return await orpcClient.admin.register(params);
  },
};
