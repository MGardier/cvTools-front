// =============================================================================
//                          SHARED TYPES
// =============================================================================

export type TTranslationFn = (key: string) => string;

export type TDetailTab = "description" | "notes" | "historique" | "taches";

export interface IDetailTab {
  id: TDetailTab;
  labelKey: string;
}

// =============================================================================
//                          METADATA STRIP
// =============================================================================

export interface IMetaItem {
  labelKey: string;
  value: string;
}

// =============================================================================
//                          TASKS
// =============================================================================

export type TTaskFilter = "all" | "todo" | "done";
