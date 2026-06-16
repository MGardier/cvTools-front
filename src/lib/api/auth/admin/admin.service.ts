import { adminApi } from "./admin.api";

import type {
  IRegisterAdminParams,
  IRegisterAdminResponse,
  IValidateAdminInvitationResponse,
} from "@/modules/auth/admin/types";

export const adminService = {
  /**************** VALIDATE INVITATION ************************************************************/

  async validateInvitation(
    token: string,
  ): Promise<IValidateAdminInvitationResponse> {
    return await adminApi.validateInvitation({ token });
  },

  /**************** REGISTER (PASSWORD) ************************************************************/

  async register(data: IRegisterAdminParams): Promise<IRegisterAdminResponse> {
    const params = { token: data.token, password: data.password };
    return await adminApi.register(params);
  },
};
