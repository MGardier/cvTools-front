
export interface ApiResponse {

  success: boolean;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;

}


export interface ApiErrors extends ApiResponse {

}

