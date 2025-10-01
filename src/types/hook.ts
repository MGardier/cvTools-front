


export interface ISortingItem<TData> {
  field: keyof TData;
  order : 'asc' | 'desc' 
}

export  interface IUseSortingReturn<TData> {

  sorting: ISortingItem<TData>[] ;
  updateSorting:(field: keyof TData) => void;
  getSortOrder : (field: keyof TData) => "asc" | "desc" | "none"
  clearSorting : ()=> void

}