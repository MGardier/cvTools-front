import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, MapPin, X } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { MultiSelectInput } from "@/shared/components/input/multi-select-input";
import { DatePickerInput } from "@/shared/components/input/date-picker-input";
import { cn } from "@/shared/utils/utils";

import { EApplicationStatus } from "@/modules/application/types";
import type { IApplicationFilters } from "@/modules/application/types";

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
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [cityValue, setCityValue] = useState(filters.city ?? "");

  // ── Debounce search (300ms) ──
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ search: searchValue.trim() || undefined });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

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
    if (!filters.search) setSearchValue("");
  }, [filters.search]);

  useEffect(() => {
    if (!filters.city) setCityValue("");
  }, [filters.city]);

  // ── Status options for multi-select (Favoris first, then real statuses) ──
  const FAVORITE_VALUE = "FAVORITE";
  const statusOptions = [
    { value: FAVORITE_VALUE, label: t("filter.favorite") },
    ...Object.values(EApplicationStatus).map((status) => ({
      value: status,
      label: t(`status.${status}`),
    })),
  ];

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* ── Filter bar ── */}
      <div className="flex flex-col w-full gap-4 md:gap-0 md:flex-row">
        {/* 1. Keyword search */}
        <div
          className={cn(
            "flex-1",
            SEGMENT_BASE,
            SEGMENT_MOBILE,
            SEGMENT_FIRST
          )}
        >
          <Search className="w-5 h-5 ml-5 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("list.filters.search")}
            className={SEGMENT_INNER_INPUT}
          />
        </div>

        {/* 2. City search */}
        <div
          className={cn(
            "flex-1",
            SEGMENT_BASE,
            SEGMENT_MOBILE,
            SEGMENT_MIDDLE
          )}
        >
          <MapPin className="w-5 h-5 ml-5 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            placeholder={t("list.filters.city")}
            className={SEGMENT_INNER_INPUT}
          />
        </div>

        {/* 3. Status multi-select */}
        <div
          className={cn(
            "flex-[0.7] px-4",
            SEGMENT_BASE,
            SEGMENT_MOBILE,
            SEGMENT_MIDDLE
          )}
        >
          <MultiSelectInput
            options={statusOptions}
            selected={[
              ...(filters.isFavorite ? [FAVORITE_VALUE] : []),
              ...(filters.status ?? []),
            ]}
            onChange={(values) => {
              const hasFavorite = values.includes(FAVORITE_VALUE);
              const statuses = values.filter((v) => v !== FAVORITE_VALUE);
              onFiltersChange({
                isFavorite: hasFavorite || undefined,
                status: statuses.length > 0 ? statuses : undefined,
              });
            }}
            placeholder={t("list.filters.statusPlaceholder")}
            countLabel={(count) =>
              t("list.filters.statusCount", { count })
            }
            className="w-full h-full"
          />
        </div>

        {/* 4. Date picker */}
        <div
          className={cn(
            "flex-1",
            SEGMENT_BASE,
            SEGMENT_MOBILE,
            SEGMENT_LAST
          )}
        >
          <DatePickerInput
            value={filters.createdAtFrom ? new Date(filters.createdAtFrom) : ""}
            label={t("list.filters.createdAtFrom")}
            placeholder={t("list.filters.createdAtFrom")}
            handleOnChange={(date) =>
              onFiltersChange({
                createdAtFrom: date.toISOString().split("T")[0],
              })
            }
            containerClassName="w-full h-full"
            inputClassName="h-full md:h-full lg:h-full w-full border-none shadow-none rounded-none md:rounded-none lg:rounded-none bg-transparent focus-visible:ring-0 md:focus-visible:ring-0 lg:focus-visible:ring-0 focus-visible:border-transparent placeholder:text-offgreen-dark text-sm md:text-sm"
          />
        </div>
      </div>

      {/* ── Active filter chips ── */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between gap-4 mt-4">
          {/* Chips à gauche */}
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <button
                type="button"
                onClick={() => { onFiltersChange({ search: undefined }); setSearchValue(""); }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {filters.search}
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
            {filters.status && filters.status.length > 0 &&
              filters.status.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      status: filters.status!.filter((v) => v !== s).length > 0
                        ? filters.status!.filter((v) => v !== s)
                        : undefined,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  {t(`status.${s}`)}
                </button>
              ))
            }
            {filters.createdAtFrom && (
              <button
                type="button"
                onClick={() => onFiltersChange({ createdAtFrom: undefined })}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {filters.createdAtFrom}
              </button>
            )}
          </div>

          {/* Réinitialiser à droite */}
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
