import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, AlertCircle } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { CityAutocomplete } from "@/modules/offer/components/city-autocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/utils/utils";

import {
  EContractType,
  ERemotePolicy,
  EExperienceLevel,
  EPublishedSince,
} from "@/modules/offer/types";
import type { IOfferSearchFilters } from "@/modules/offer/types";

interface IOfferTableFiltersProps {
  stagedFilters: IOfferSearchFilters;
  committedFilters: IOfferSearchFilters;
  onStagedChange: (partial: Partial<IOfferSearchFilters>) => void;
  onSearch: () => void;
  onRemoveFilter: (key: keyof IOfferSearchFilters) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  cityResetKey: number;
}

/* ── Shared wrapper classes for joined-pill segments ── */
const SEGMENT_BASE =
  "h-16 border border-offgreen-medium bg-background flex items-center transition-colors";
const SEGMENT_MOBILE = "rounded-xl";
const SEGMENT_FIRST = "md:rounded-l-xl md:rounded-r-none";
const SEGMENT_MIDDLE = "md:rounded-none md:border-l-transparent";
const SEGMENT_LAST = "md:rounded-r-xl md:rounded-l-none md:border-l-transparent";
const SEGMENT_INNER_INPUT =
  "h-full md:h-full lg:h-full w-full border-none shadow-none rounded-none md:rounded-none lg:rounded-none bg-transparent outline-none focus-visible:ring-0 md:focus-visible:ring-0 lg:focus-visible:ring-0 focus-visible:border-transparent placeholder:text-offgreen-dark text-sm md:text-sm lg:text-sm";

export const OfferTableFilters = ({
  stagedFilters,
  committedFilters,
  onStagedChange,
  onSearch,
  onRemoveFilter,
  onClearFilters,
  hasActiveFilters,
  cityResetKey,
}: IOfferTableFiltersProps) => {
  const { t } = useTranslation("offer");
  const [cityHasError, setCityHasError] = useState(false);
  const handleCityValidation = useCallback((hasError: boolean) => setCityHasError(hasError), []);

  const contractTypeOptions = Object.values(EContractType).map((v) => ({
    value: v,
    label: t(`contractType.${v}`),
  }));

  const remoteOptions = Object.values(ERemotePolicy).map((v) => ({
    value: v,
    label: t(`remotePolicy.${v}`),
  }));

  const experienceOptions = Object.values(EExperienceLevel).map((v) => ({
    value: v,
    label: t(`experience.${v}`),
  }));

  const publishedSinceOptions = Object.values(EPublishedSince).map((v) => ({
    value: v,
    label: t(`list.publishedSince.${v}`),
  }));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* ── Filter bar ── */}
      <div className="flex flex-col w-full gap-4 md:gap-0 md:flex-row">
        {/* 1. Keyword search */}
        <div className={cn("flex-[1.5]", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_FIRST)}>
          <Search className="w-5 h-5 ml-5 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            value={stagedFilters.keyword ?? ""}
            onChange={(e) => onStagedChange({ keyword: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder={t("list.filters.keyword")}
            className={SEGMENT_INNER_INPUT}
          />
        </div>

        {/* 2. City search (autocomplete) */}
        <div className={cn("flex-[1.2]", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_MIDDLE)}>
          <CityAutocomplete
            key={cityResetKey}
            value={stagedFilters.city ?? ""}
            postalCode={stagedFilters.postalCode ?? ""}
            onChange={(city, postalCode) => onStagedChange({ city, postalCode })}
            onClear={() => onStagedChange({ city: undefined, postalCode: undefined })}
            onValidationChange={handleCityValidation}
            onKeyDown={handleKeyDown}
            placeholder={t("list.filters.city")}
            inputClassName={SEGMENT_INNER_INPUT}
          />
        </div>

        {/* 3. Contract type */}
        <div className={cn("flex-[0.5] px-3", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_MIDDLE)}>
          <Select
            value={stagedFilters.contractType ?? ""}
            onValueChange={(value) =>
              onStagedChange({ contractType: value ? (value as IOfferSearchFilters["contractType"]) : undefined })
            }
          >
            <SelectTrigger className="h-full border-none shadow-none bg-transparent focus:ring-0 text-sm text-offgreen-dark w-full">
              <SelectValue placeholder={t("list.filters.contractTypePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {contractTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 4. Remote */}
        <div className={cn("flex-[0.5] px-3", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_MIDDLE)}>
          <Select
            value={stagedFilters.remote ?? ""}
            onValueChange={(value) =>
              onStagedChange({ remote: value ? (value as IOfferSearchFilters["remote"]) : undefined })
            }
          >
            <SelectTrigger className="h-full border-none shadow-none bg-transparent focus:ring-0 text-sm text-offgreen-dark w-full">
              <SelectValue placeholder={t("list.filters.remotePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {remoteOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 5. Experience */}
        <div className={cn("flex-[0.5] px-3", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_MIDDLE)}>
          <Select
            value={stagedFilters.experience ?? ""}
            onValueChange={(value) =>
              onStagedChange({ experience: value ? (value as IOfferSearchFilters["experience"]) : undefined })
            }
          >
            <SelectTrigger className="h-full border-none shadow-none bg-transparent focus:ring-0 text-sm text-offgreen-dark w-full">
              <SelectValue placeholder={t("list.filters.experiencePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {experienceOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 6. Published since */}
        <div className={cn("flex-[0.5] px-3", SEGMENT_BASE, SEGMENT_MOBILE, SEGMENT_MIDDLE)}>
          <Select
            value={stagedFilters.publishedSince ?? ""}
            onValueChange={(value) =>
              onStagedChange({ publishedSince: value ? (value as IOfferSearchFilters["publishedSince"]) : undefined })
            }
          >
            <SelectTrigger className="h-full border-none shadow-none bg-transparent focus:ring-0 text-sm text-offgreen-dark w-full">
              <SelectValue placeholder={t("list.filters.publishedSincePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {publishedSinceOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 7. Search button */}
        <button
          type="button"
          onClick={onSearch}
          className={cn(
            "h-16 px-6 font-medium text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors shrink-0",
            SEGMENT_MOBILE,
            SEGMENT_LAST
          )}
        >
          {t("list.searchButton")}
        </button>
      </div>

      {/* ── Active filter chips + validation messages ── */}
      {(hasActiveFilters || cityHasError) && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex flex-wrap gap-2">
            {cityHasError && (
              <span className="inline-flex items-center gap-1.5 text-sm text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                {t("list.filters.citySelectRequired")}
              </span>
            )}
            {committedFilters.keyword && (
              <button
                type="button"
                onClick={() => onRemoveFilter("keyword")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {committedFilters.keyword}
              </button>
            )}
            {committedFilters.city && (
              <button
                type="button"
                onClick={() => onRemoveFilter("city")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {committedFilters.city}
              </button>
            )}
            {committedFilters.contractType && (
              <button
                type="button"
                onClick={() => onRemoveFilter("contractType")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t(`contractType.${committedFilters.contractType}`)}
              </button>
            )}
            {committedFilters.remote && (
              <button
                type="button"
                onClick={() => onRemoveFilter("remote")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t(`remotePolicy.${committedFilters.remote}`)}
              </button>
            )}
            {committedFilters.experience && (
              <button
                type="button"
                onClick={() => onRemoveFilter("experience")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t(`experience.${committedFilters.experience}`)}
              </button>
            )}
            {committedFilters.publishedSince && (
              <button
                type="button"
                onClick={() => onRemoveFilter("publishedSince")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                {t(`list.publishedSince.${committedFilters.publishedSince}`)}
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
