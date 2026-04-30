import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, X } from "lucide-react";
import { Command, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/shared/components/ui/command";
import { cityService } from "@/lib/api/city/city.service";
import type { ICitySearchItem } from "@/lib/api/city/city.types";
import { cn } from "@/shared/utils/utils";

interface ICityAutocompleteProps {
  value: string;
  postalCode: string;
  onChange: (city: string, postalCode: string) => void;
  onClear: () => void;
  onValidationChange?: (hasError: boolean) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder: string;
  inputClassName?: string;
}

const DEBOUNCE_MS = 300;

export const CityAutocomplete = ({
  value,
  postalCode,
  onChange,
  onClear,
  onValidationChange,
  onKeyDown,
  placeholder,
  inputClassName,
}: ICityAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(!!value && !!postalCode);
  const [isDirty, setIsDirty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
    setIsSelected(!!value && !!postalCode);
    setIsDirty(false);
  }, [value, postalCode]);

  // Debounce input
  useEffect(() => {
    if (!inputValue || isSelected) {
      setDebouncedQuery("");
      return;
    }
    const timer = setTimeout(() => setDebouncedQuery(inputValue), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue, isSelected]);

  // Notify parent of validation state
  const hasError = isDirty && !isSelected && inputValue.length > 0 && !isFocused;
  useEffect(() => {
    onValidationChange?.(hasError);
  }, [hasError, onValidationChange]);

  const { data: suggestions } = useQuery({
    queryKey: ["city-autocomplete", debouncedQuery],
    queryFn: () => cityService.search(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  const items: ICitySearchItem[] = suggestions?.data ?? [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = useCallback((val: string) => {
    setInputValue(val);
    setIsSelected(false);
    setIsDirty(true);
    setIsOpen(true);
    if (!val) {
      onClear();
      setIsDirty(false);
    }
  }, [onClear]);

  const handleSelect = useCallback((item: ICitySearchItem) => {
    const firstPostalCode = item.postalCodes[0] ?? "";
    setInputValue(item.name);
    setIsSelected(true);
    setIsDirty(false);
    setIsOpen(false);
    onChange(item.name, firstPostalCode);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setIsSelected(false);
    setIsDirty(false);
    setIsOpen(false);
    onClear();
    inputRef.current?.focus();
  }, [onClear]);

  return (
    <div ref={containerRef} className="relative flex-1 flex items-center w-full">
      <MapPin className={cn("w-5 h-5 ml-5 mr-1 shrink-0", hasError ? "text-red-400" : "text-muted-foreground")} />
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (inputValue && !isSelected) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
            onKeyDown?.(e);
          }}
          placeholder={placeholder}
          className={cn(inputClassName, hasError && "text-red-400")}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && items.length > 0 && !isSelected && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <Command shouldFilter={false}>
            <CommandList>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.code}
                    value={item.code}
                    onSelect={() => handleSelect(item)}
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
      {isOpen && debouncedQuery.length >= 2 && items.length === 0 && !isSelected && (
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
};
