export interface ICitySearchItem {
  code: string;
  name: string;
  postalCodes: string[];
  departmentCode?: string;
  regionCode?: string;
  population?: number;
}
