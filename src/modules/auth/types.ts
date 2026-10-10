import type { TContractInputs, TContractOutputs } from "@cvtools/contracts";

// Params / responses are inferred from @cvtools/contracts (single source of truth).
type TAuthInputs = TContractInputs["auth"];
type TAuthOutputs = TContractOutputs["auth"];

/************************************************** SIGNUP ********************************/

export type ISignUpParams = TAuthInputs["signUp"];

export type ISignUpResponse = TAuthOutputs["signUp"];

/************************************************** SIGN IN ********************************/

export type ISignInParams = TAuthInputs["signIn"];

export type ISignInResponse = TAuthOutputs["signIn"];

/************************************************** LOGOUT ********************************/

// 204 No Content
export type ILogoutResponse = TAuthOutputs["logout"];

/**************************************************  CONFIRM ACCOUNT ********************************/

export type ISendConfirmAccountParams = TAuthInputs["resendConfirmAccount"];

export type ISendConfirmAccountResponse = TAuthOutputs["resendConfirmAccount"];

export type IConfirmAccountParams = TAuthInputs["confirmAccount"];

export type IConfirmAccountResponse = TAuthOutputs["confirmAccount"];

/************************************************** RESET PASSWORD ********************************/

export type ISendForgotPasswordParams = TAuthInputs["forgotPassword"];

export type ISendForgotPasswordResponse = TAuthOutputs["forgotPassword"];

export type IResetPasswordParams = TAuthInputs["resetPassword"];

export type IResetPasswordResponse = TAuthOutputs["resetPassword"];

/************************************************** ME ********************************/

export type IMeResponse = TAuthOutputs["me"];
