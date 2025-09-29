

export interface DataTableParams<TData> {
  currentPage : number;
  limit: number;
  sorting : SortItem<TData>[]
 
}

export interface SortItem<TData> {
  field: keyof TData;
  direction : 'asc' | 'desc' 
}

export interface EnumWithTranslationItem {
  label : string;
  value: string;
}