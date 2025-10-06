

export interface IDataTableParams<TData> {
  page : number;
  limit: number;
  sorting : ISortFilterItem<TData>[]
 
}


export interface ISortFilterItem<TData> {
  field: keyof TData;
  order : 'asc' | 'desc'
}

