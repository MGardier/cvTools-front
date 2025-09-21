
export interface ApiResponse {

  success: boolean;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;

}



export interface ApiErrors extends ApiResponse {

}


export interface DataTableParams {
  currentPage : number;
  limit: number;
  sort : string[]

}

export interface FilterDataResponse<Tdata> {
  data :Tdata[],
  count: number;
  limit: number;
  page: number;
  maxPage: number;

}

