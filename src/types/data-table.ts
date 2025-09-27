
export interface DataTableParams {
  currentPage : number;
  limit: number;
  sorting : SortItem[]
  filters: Record<string,string>;

}

export interface SortItem {
  field: string;
  direction : 'asc' | 'desc' 
}