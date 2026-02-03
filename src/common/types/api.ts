
export interface IApiResponse {

  success: boolean;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;

}



export interface IApiErrors extends IApiResponse {

}


export interface IFilterParams<TFilter extends object> {
  limit: number;
  page : number;
  sort?: string;
  filters?: TFilter;
}

export interface IFilterDataResponse<Tdata> {
  data :Tdata[],
  count: number;
  limit: number;
  page: number;
  maxPage: number;

}

