
export interface ApiResponse {

  success: boolean;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;

}



export interface ApiErrors extends ApiResponse {

}

export interface FilterParams {
  limit: number;
  page : number;
  sort?: string;
  filters?: string;
  
}

export interface FilterDataResponse<Tdata> {
  data :Tdata[],
  count: number;
  limit: number;
  page: number;
  maxPage: number;

}

