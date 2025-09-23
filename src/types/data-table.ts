
export interface DataTableParams {
  currentPage : number;
  limit: number;
  sorting : SortItem[]


}

export interface SortItem {
  field: string;
  direction : 'asc' | 'desc' 
}