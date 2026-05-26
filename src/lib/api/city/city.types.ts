export interface ICitySearchItem {
  code: string;
  name: string;
  postalCodes: string[];
  departmentCode?: string;
  regionCode?: string;
  population?: number;
}

export interface ICitySearchQuery {
  city?: string;
  postalCode?: string;
  limit?: number;
}
