import type { ComponentType } from "react";

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
//                          NOTES
// =============================================================================

export interface INote {
  id: number;
  content: string;
  createdAt: string;
}

// =============================================================================
//                          HISTORY
// =============================================================================

export interface IHistoryEvent {
  id: number;
  action: string;
  detail: string;
  date: string;
  time: string;
  icon: ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

// =============================================================================
//                          TASKS
// =============================================================================

export interface ITask {
  id: number;
  label: string;
  done: boolean;
}

export type TTaskFilter = "all" | "todo" | "done";
