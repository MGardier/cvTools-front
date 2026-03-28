import { useState, useMemo, useRef, type ReactNode } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";

import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/shared/components/ui/command";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/utils";

interface IEntitySearchFieldProps<T> {
  /** Currently selected items */
  items: T[];

  /** All available items to search from */
  options: T[];

  /** Called when an item is selected from dropdown */
  onAdd: (item: T) => void;

  /** Called when remove button (X) is clicked — removes from form selection only */
  onRemove: (index: number) => void;

  /** Called when edit button is clicked */
  onEdit: (item: T) => void;

  /** Called when the "+" create button is clicked */
  onCreateClick: () => void;

  /** Extract unique identifier from an item */
  getItemId: (item: T) => number | string;

  /** Extract searchable text from an item */
  getSearchValue: (item: T) => string;

  /** Render an item in the autocomplete dropdown */
  renderOption: (item: T) => ReactNode;

  /** Render an item's content in the grid card */
  renderItem: (item: T) => ReactNode;

  /** Search input placeholder */
  placeholder: string;

  /** Text shown when no items are selected */
  emptyText: string;

  /** Tailwind grid classes for the cards layout */
  gridClassName?: string;

  /** Called to create an item inline from the search text (e.g. findOrCreate) */
  onCreateInline?: (search: string) => void;

  /** Label for the inline create option in dropdown */
  createInlineLabel?: (search: string) => string;

  /** Whether an inline creation is in progress */
  isCreatingInline?: boolean;

  /** Called when the delete (trash) button is clicked — deletes from DB via API */
  onDeleteEntity?: (item: T) => void;

  /** Whether to show the edit button for a given item (defaults to true) */
  canEdit?: (item: T) => boolean;

  /** Whether to show the delete button for a given item (defaults to false if onDeleteEntity not set) */
  canDelete?: (item: T) => boolean;

  /** Called when search input changes — allows parent to react (e.g. for server-side search) */
  onSearchChange?: (search: string) => void;

  /** If true, filtering is handled externally (server-side) — skip client-side filter */
  isServerFiltered?: boolean;
}

export const EntitySearchField = <T,>({
  items,
  options,
  onAdd,
  onRemove,
  onEdit,
  onCreateClick,
  getItemId,
  getSearchValue,
  renderOption,
  renderItem,
  placeholder,
  emptyText,
  gridClassName = "grid-cols-2 sm:grid-cols-3",
  onCreateInline,
  createInlineLabel,
  isCreatingInline = false,
  onDeleteEntity,
  canEdit,
  canDelete,
  onSearchChange,
  isServerFiltered = false,
}: IEntitySearchFieldProps<T>) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const blurTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const selectedIds = useMemo(
    () => new Set(items.map((item) => getItemId(item))),
    [items, getItemId]
  );

  const filtered = useMemo(() => {
    const available = options.filter((o) => !selectedIds.has(getItemId(o)));
    if (isServerFiltered || !search.trim()) return available;
    const lower = search.trim().toLowerCase();
    return available.filter((o) =>
      getSearchValue(o).toLowerCase().includes(lower)
    );
  }, [options, selectedIds, search, getItemId, getSearchValue, isServerFiltered]);

  const showInlineCreate =
    onCreateInline &&
    createInlineLabel &&
    search.trim().length > 0 &&
    !options.some(
      (o) => getSearchValue(o).toLowerCase() === search.trim().toLowerCase()
    );

  const showDropdown = open && (filtered.length > 0 || showInlineCreate);

  const handleSelect = (item: T) => {
    if (selectedIds.has(getItemId(item))) return;
    onAdd(item);
    setSearch("");
    setOpen(false);
  };

  const handleInlineCreate = () => {
    const trimmed = search.trim();
    if (!trimmed || !onCreateInline) return;
    onCreateInline(trimmed);
    setSearch("");
    setOpen(false);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    setOpen(true);
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  return (
    <div className="grid gap-4">
      {/* Search bar + create button */}
      <Command shouldFilter={false} className="overflow-visible">
        <div className="flex items-center">
          <div className="flex items-center flex-1 gap-2 rounded-l-lg border px-3 h-9">
            <Search className="size-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              placeholder={placeholder}
              value={search}
              onValueChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="flex h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-l-none border-l-0 shrink-0"
            onClick={onCreateClick}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="relative">
            <CommandList className="absolute top-1 left-0 right-0 z-50 rounded-lg border bg-popover shadow-md">
              <CommandGroup>
                {filtered.map((item) => (
                  <CommandItem
                    key={getItemId(item)}
                    onSelect={() => handleSelect(item)}
                    className="cursor-pointer"
                  >
                    {renderOption(item)}
                  </CommandItem>
                ))}
                {showInlineCreate && (
                  <CommandItem
                    onSelect={handleInlineCreate}
                    className="cursor-pointer"
                    disabled={isCreatingInline}
                  >
                    <Plus className="w-4 h-4" />
                    {createInlineLabel(search.trim())}
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>

      {/* Grid cards */}
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          {emptyText}
        </p>
      ) : (
        <div className={cn("grid gap-2", gridClassName)}>
          {items.map((item, index) => {
            const showEdit = canEdit ? canEdit(item) : true;
            const showDelete = canDelete ? canDelete(item) : !!onDeleteEntity;

            return (
              <div
                key={getItemId(item)}
                className="flex items-start justify-between gap-2 rounded-lg border px-3 py-2"
              >
                <div className="min-w-0 flex-1">{renderItem(item)}</div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {showEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="p-1 rounded-md text-muted-foreground hover:text-sky-600 hover:bg-muted transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {showDelete && onDeleteEntity && (
                    <button
                      type="button"
                      onClick={() => onDeleteEntity(item)}
                      className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
