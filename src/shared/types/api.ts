import type {
  TDtoErrorCode,
  TErrorCode,
  TErrorData,
} from "@cvtools/contracts";

// Error body of every route (oRPC error format), thrown as an `ORPCError` by the
// oRPC client. `message` equals `code`. Codes come from @cvtools/contracts.
export type TApiErrorCode = TErrorCode | TDtoErrorCode;

export interface IApiErrors {
  code: TApiErrorCode;
  status: number;
  message: TApiErrorCode;
  data?: TErrorData;
}
