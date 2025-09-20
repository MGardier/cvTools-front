
export interface ApiResponse {

  success: boolean;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;

}



export interface ApiErrors extends ApiResponse {

}


export interface FilterDataResponse<Tdata> {
  data :Tdata[],
  count: number;
  limit: number;
  page: number;
  maxPage: number;

}

export interface FilterOptions {
  page?: number;
  limit?: number;

}