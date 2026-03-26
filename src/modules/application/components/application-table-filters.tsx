import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Search, MapPin, X } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DatePickerInput } from "@/shared/components/input/date-picker-input";
import { cn } from "@/shared/utils/utils";

import { EApplicationStatus } from "@/modules/application/types";
import type { IApplicationFilters, TApplicationStatus } from "@/modules/application/types";

interface IApplicationTableFiltersProps {
  filters: IApplicationFilters;
  onFiltersChange: (partial: Partial<IApplicationFilters>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

/* ── Shared wrapper classes for joined-pill segments ── */
const SEGMENT_BASE =
  "h-16 border border-offgreen-medium bg-background flex items-center transition-colors focus-within:border-sky-600";
const SEGMENT_MOBILE = "rounded-xl";
const SEGMENT_FIRST = "md:rounded-l-xl md:rounded-r-none";
const SEGMENT_MIDDLE = "md:rounded-none md:border-l-transparent";
const SEGMENT_LAST = "md:rounded-r-xl md:rounded-l-none md:border-l-transparent";
const SEGMENT_INNER_INPUT =
  "h-full md:h-full lg:h-full w-full border-none shadow-none rounded-none md:rounded-none lg:rounded-none bg-transparent focus-visible:ring-0 md:focus-visible:ring-0 lg:focus-visible:ring-0 focus-visible:border-transparent placeholder:text-offgreen-dark text-sm md:text-sm lg:text-sm";

export const ApplicationTableFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
}: IApplicationTableFiltersProps) => {
  const { t } = useTranslation("application");

  // ── Local state for debounced text inputs ──
  const [keywordValue, setKeywordValue] = useState(filters.keyword ?? "");
  const [cityValue, setCityValue] = useState(filters.city ?? "");

  // ── Debounce keyword (300ms) ──
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ keyword: keywordValue.trim() || undefined });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordValue]);

  // ── Debounce city (300ms) ──
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ city: cityValue.trim() || undefined });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue]);

  // ── Sync local state when filters are cleared externally ──
  useEffect(() => {
    if (!filters.keyword) setKeywordValue("");
  }, [filters.keyword]);

  useEffect(() => {
    if (!filters.city) setCityValue("");
  }, [filters.city]);

  const statusOptions = Object.values(EApplicationStatus).map((status) => ({
    value: status,
    label: t(`status.${status}`),
  }));

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* ── Filter bar ── */}
      <div className="flex flex-col w-full gap-4 md:gap-0 md:flex-row">
        {/* 1. Keyword search */}
        <div className={cn("flex-1", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_FIRST)}>
          <Search className="w-5 h-5 ml-5 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            value={keywordValue}
            onChange={(e) => setKeywordValue(e.target.value)}
            placeholder={t("list.filters.search")}
            className={SEGMENT_INNER_INPUT}
          />
        </div>

        {/* 2. City search */}
        <div className={cn("flex-1", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_MIDDLE)}>
          <MapPin className="w-5 h-5 ml-5 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            placeholder={t("list.filters.city")}
            className={SEGMENT_INNER_INPUT}
          />
        </div>

        {/* 3. Status select + favorite toggle */}
        <div
          className={cn(
            "flex-[0.8] px-4 gap-2",
            SEGMENT_BASE,
            SEGMENT_MOBILE,
            SEGMENT_MIDDLE
          )}
        >
          <Select
            value={filters.currentStatus ?? ""}
            onValueChange={(value) =>
              onFiltersChange({
                currentStatus: value ? (value as TApplicationStatus) : undefined,
              })
            }
          >
            <SelectTrigger className="h-full border-none shadow-none bg-transparent focus:ring-0 text-sm text-offgreen-dark w-full">
              <SelectValue placeholder={t("list.filters.statusPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={() => onFiltersChange({ isFavorite: filters.isFavorite ? undefined : true })}
            className={cn(
              "shrink-0 transition-colors",
              filters.isFavorite ? "text-red-500" : "text-muted-foreground hover:text-foreground"
            )}
            title={t("filter.favorite")}
          >
            <Heart
              className={cn("w-5 h-5", filters.isFavorite && "fill-current")}
            />
          </button>
        </div>

        {/* 4. Date picker */}
        <div className={cn("flex-1", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_LAST)}>
          <DatePickerInput
            value={filters.createdAt ? new Date(filters.createdAt) : ""}
            label={t("list.filters.createdAtFrom")}
            placeholder={t("list.filters.createdAtFrom")}
            handleOnChange={(date) =>
              onFiltersChange({ createdAt: date.toISOString().split("T")[0] })
            }
            containerClassName="w-full h-full"
            inputClassName={SEGMENT_INNER_INPUT}
          />
        </div>
      </div>

      {/* ── Active filter chips ── */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex flex-wrap gap-2">
            {filters.keyword && (
              <button
                type="button"
                onClick={() => { onFiltersChange({ keyword: undefined }); setKeywordValue(""); }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {filters.keyword}
              </button>
            )}
            {filters.city && (
              <button
                type="button"
                onClick={() => { onFiltersChange({ city: undefined }); setCityValue(""); }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {filters.city}
              </button>
            )}
            {filters.currentStatus && (
              <button
                type="button"
                onClick={() => onFiltersChange({ currentStatus: undefined })}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t(`status.${filters.currentStatus}`)}
              </button>
            )}
            {filters.isFavorite && (
              <button
                type="button"
                onClick={() => onFiltersChange({ isFavorite: undefined })}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t("filter.favorite")}
              </button>
            )}
            {filters.createdAt && (
              <button
                type="button"
                onClick={() => onFiltersChange({ createdAt: undefined })}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {filters.createdAt}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            {t("list.filters.clearFilters")}
          </button>
        </div>
      )}
    </div>
  );
};
