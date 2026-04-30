import { MapPin, X } from "lucide-react";
import { Command, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/shared/components/ui/command";
import { cn } from "@/shared/utils/utils";
import type { ICitySearchItem } from "@/lib/api/city/city.types";

interface ICityAutocompleteUiProps {
  inputValue: string;
  placeholder: string;
  inputClassName?: string;
  items: ICitySearchItem[];
  hasError: boolean;
  showSuggestions: boolean;
  showEmpty: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (val: string) => void;
  onSelect: (item: ICitySearchItem) => void;
  onClear: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const CityAutocompleteUi = ({
  inputValue,
  placeholder,
  inputClassName,
  items,
  hasError,
  showSuggestions,
  showEmpty,
  containerRef,
  inputRef,
  onInputChange,
  onSelect,
  onClear,
  onFocus,
  onBlur,
  onKeyDown,
}: ICityAutocompleteUiProps) => (
  <div ref={containerRef} className="relative flex-1 flex items-center w-full">
    <MapPin className={cn("w-5 h-5 ml-5 mr-1 shrink-0", hasError ? "text-red-400" : "text-muted-foreground")} />
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(inputClassName, hasError && "text-red-400")}
      />
      {inputValue && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>

    {/* Suggestions dropdown */}
    {showSuggestions && (
      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <Command shouldFilter={false}>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.code}
                  value={item.code}
                  onSelect={() => onSelect(item)}
                  className="cursor-pointer px-4 py-2.5"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    )}

    {/* No results */}
    {showEmpty && (
      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty />
          </CommandList>
        </Command>
      </div>
    )}
  </div>
);
