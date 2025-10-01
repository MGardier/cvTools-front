

export interface DataTableParams<TData> {
  currentPage : number;
  limit: number;
  sorting : SortFilterItem<TData>[]
 
}



export interface EnumWithTranslationItem {
  label : string;
  value: string;
}

export interface DateFilterParams {
  value?: Date;
   operator?: 'equals' | 'before' | 'after' | 'between';
  secondValue?: Date;
  
}