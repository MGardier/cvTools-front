
/**************************   SORTING  ***********************************************************/



export interface ISortingItem<TData> {
  field: keyof TData;
  order: 'asc' | 'desc'
}

export interface IUseSortingReturn<TData> {

  sorting: ISortingItem<TData>[];
  updateSorting: (field: keyof TData) => void;
  getSortOrder : (field: keyof TData) => 'asc' | 'desc' | 'none';
  clearSorting: () => void

}


/**************************   PAGINATION  ***********************************************************/

export interface IPaginationItem {
  page: number;
  limit: number;
  totalItems: number
}

export interface IUsePaginationReturn {

  pagination: IPaginationItem;

  setPage: (page: number) => void
  setLimit: (limit: number) => void
  clearPagination: () => void
  setTotalItems: (totalItems: number)=> void ;

  nextPage: () => void;
  prevPage: () => void;

  canGoNext: ()=> boolean;
  canGoPrev: ()=> boolean;
  getTotalPages: ()=>number;

}


/**************************  FILTERS  ***********************************************************/

export interface IUseFiltersReturn<TFilters extends object> {
  filters: TFilters;
  updateFilters: (partial: Partial<TFilters>) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
  getFilter: <K extends keyof TFilters>(key: K) => TFilters[K];
}
