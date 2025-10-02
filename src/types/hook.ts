
/**************************   SORTING  ***********************************************************/

export interface ISortingItem<TData> {
  field: keyof TData;
  order: 'asc' | 'desc'
}

export interface IUseSortingReturn<TData> {

  sorting: ISortingItem<TData>[];
  updateSorting: (field: keyof TData) => void;
  getSortOrder: (field: keyof TData) => "asc" | "desc" | "none"
  clearSorting: () => void

}


/**************************   PAGINATION  ***********************************************************/

export interface IPaginationItem {
  page: number;
  limit: number;
}

export interface IUsePaginationReturn {
  pagination: IPaginationItem;
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  clearPagination: () => void
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: () => boolean;
  canGoPrev: () => boolean;
  getTotalPages: ()=>number;


}