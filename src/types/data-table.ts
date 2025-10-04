

export interface IDataTableParams<TData> {
  page : number;
  limit: number;
  sorting : ISortFilterItem<TData>[]
 
}


export interface ISortFilterItem<TData> {
  field: keyof TData;
  order : 'asc' | 'desc'
}

export interface EnumWithTranslationItem {
  label : string;
  value: string;
}

export interface DateFilterParams {
  value: Date;
  operator: 'equals' | 'before' | 'after' | 'between';
  secondValue?: Date;
  
}