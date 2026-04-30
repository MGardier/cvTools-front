import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { cityService } from "@/lib/api/city/city.service";
import type { ICitySearchItem, ICitySearchQuery } from "@/lib/api/city/city.types";
import { CityAutocompleteUi } from "./city-autocomplete.ui";

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
const POSTAL_CODE_PATTERN = /^\d{2,}$/;

const buildCityQuery = (query: string): ICitySearchQuery => {
  const trimmed = query.trim();
  return POSTAL_CODE_PATTERN.test(trimmed)
    ? { postalCode: trimmed }
    : { city: trimmed };
};

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
    queryFn: () => cityService.search(buildCityQuery(debouncedQuery)),
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

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (inputValue && !isSelected) setIsOpen(true);
  }, [inputValue, isSelected]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
    onKeyDown?.(e);
  }, [onKeyDown]);

  const showSuggestions = isOpen && items.length > 0 && !isSelected;
  const showEmpty = isOpen && debouncedQuery.length >= 2 && items.length === 0 && !isSelected;

  return (
    <CityAutocompleteUi
      inputValue={inputValue}
      placeholder={placeholder}
      inputClassName={inputClassName}
      items={items}
      hasError={hasError}
      showSuggestions={showSuggestions}
      showEmpty={showEmpty}
      containerRef={containerRef}
      inputRef={inputRef}
      onInputChange={handleInputChange}
      onSelect={handleSelect}
      onClear={handleClear}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};
