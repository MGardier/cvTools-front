import type { TContractInputs, TContractOutputs } from "@cvtools/contracts";

// Params / responses are inferred from @cvtools/contracts (single source of truth).
type TAdminInputs = TContractInputs["admin"];
type TAdminOutputs = TContractOutputs["admin"];

/************************************************** VALIDATE INVITATION ********************************/

export type IValidateAdminInvitationParams = TAdminInputs["validateInvitation"];

export type IValidateAdminInvitationResponse = TAdminOutputs["validateInvitation"];

/************************************************** REGISTER (PASSWORD) ********************************/

export type IRegisterAdminParams = TAdminInputs["register"];

export type IRegisterAdminResponse = TAdminOutputs["register"];
