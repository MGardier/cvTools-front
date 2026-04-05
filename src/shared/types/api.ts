
export interface IApiResponse<T> {

  success: boolean;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;
  data: T

}



export type IApiErrors = IApiResponse<null>;




