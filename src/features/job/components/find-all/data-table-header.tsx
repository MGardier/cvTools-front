import { Plus, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { IFiltersJob } from "@/features/job/types/hook";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { DatePickerInput } from "@/components/input/date-picker-input";
import { SelectInput } from "@/components/form/input/select-input";
import {
  getJobSApplicationMethodWithTranslation,
  getJobStatusWithTranslation,
} from "@/utils/utils";
import type { TFunction } from "i18next";
import type { IUseFiltersReturn } from "@/types/hook";
import type { JobApplyMethod, JobStatus } from "@/types/entity";

interface JobDataTableHeaderProps {
  t: TFunction<"job", undefined>;
  addItemLink: string;
  filtersManager: IUseFiltersReturn<IFiltersJob>;
  clearParams: () => void;
  hasActiveParams?: boolean;
}

export const JobDataTableHeader = ({
  addItemLink,
  t,
  filtersManager,
  clearParams,
  hasActiveParams = false,
}: JobDataTableHeaderProps) => {
  const navigate = useNavigate();

  const { filters, updateFilters, clearFilters, hasActiveFilters } = filtersManager;


  const [tempFilters, setTempFilters] = useState<IFiltersJob>(filters);


  const syncTempFilters = () => {
    setTempFilters(filters);
  };

  const updateTempFilter = <K extends keyof IFiltersJob>(
    key: K,
    value: IFiltersJob[K]
  ) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateFilters(tempFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
    setTempFilters({
      jobTitle: undefined,
      enterprise: undefined,
      status: undefined,
      applicationMethod: undefined,
      appliedAt: undefined,
    });
  };

  return (
    <div className="flex justify-start items-center gap-2 p-2">
      <Button
        className="flex gap-2 text-white"
        variant="blue"
        onClick={() => navigate(addItemLink)}
      >
        <Plus />
        {t("actions.add")}
      </Button>

      <Sheet onOpenChange={(open) => open && syncTempFilters()}>
        <SheetTrigger asChild>
          <Button className="flex gap-2 text-white" variant="blue">
            <SlidersHorizontal />
            {t("actions.filter")}
            {hasActiveFilters() && (
              <span className="ml-1 rounded-full bg-white text-blue-600 px-2 py-0.5 text-xs font-semibold">
                {Object.values(filters).filter((v) => v !== undefined && v !== null).length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t("filters.title")}</SheetTitle>
            <SheetDescription>
              {t("filters.description")}
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">


            {/* JOBTITLE */}
            <div className="grid gap-3">
              <Label htmlFor="filter-jobTitle">{t("filters.jobTitle")}</Label>
              <Input
                id="filter-jobTitle"
                value={tempFilters.jobTitle || ""}
                placeholder={t("filters.jobTitlePlaceholder")}
                onChange={(e) => updateTempFilter("jobTitle", e.target.value || undefined)}
              />
            </div>


            {/* ENTERPRISE */}
            <div className="grid gap-3">
              <Label htmlFor="filter-enterprise">{t("filters.enterprise")}</Label>
              <Input
                id="filter-enterprise"
                value={tempFilters.enterprise || ""}
                placeholder={t("filters.enterprisePlaceholder")}
                onChange={(e) => updateTempFilter("enterprise", e.target.value || undefined)}
              />
            </div>


            {/* STATUS */}
            <div className="grid gap-3">
              <Label htmlFor="filter-status">{t("filters.status")}</Label>
              <SelectInput
                handleOnChange={(value: string) => updateTempFilter("status", value as typeof JobStatus[keyof typeof JobStatus])}
                defaultValue={tempFilters.status}
                required={false}
                selectValues={getJobStatusWithTranslation(t)}
                placeholder={t("filters.statusPlaceholder")}
              />
            </div>


            {/* APPLICATION METHOD */}
            <div className="grid gap-3">
              <Label htmlFor="filter-applicationMethod">
                {t("filters.applicationMethod")}
              </Label>
              <SelectInput
                handleOnChange={(value: string) => updateTempFilter("applicationMethod", value as typeof JobApplyMethod[keyof typeof JobApplyMethod])}
                defaultValue={tempFilters.applicationMethod}
                required={false}
                selectValues={getJobSApplicationMethodWithTranslation(t)}
                placeholder={t("filters.applicationMethodPlaceholder")}
              />
            </div>


            {/* APPLIED AT  */}
            <div className="grid gap-3">
              <Label htmlFor="filter-appliedAt">{t("filters.appliedAt")}</Label>
              <DatePickerInput
                value={tempFilters.appliedAt || ""}
                label={t("filters.appliedAt")}
                placeholder={t("filters.appliedAtPlaceholder")}
                handleOnChange={(value: Date) => updateTempFilter("appliedAt", value)}
              />
            </div>


          </div>

          <SheetFooter className="gap-2">
            <SheetClose asChild>
              <Button
                className="flex gap-2 text-white"
                variant="blue"
                onClick={applyFilters}
              >
                <SlidersHorizontal />
                {t("actions.apply")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" onClick={handleClearFilters}>
                <RotateCcw className="mr-2 h-4 w-4" />
                {t("actions.clearFilters")}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Button
        className="flex gap-2 text-white"
        variant="blue"
        onClick={clearParams}
        disabled={!hasActiveFilters() && !hasActiveParams}
      >
        <RotateCcw />
        {t("actions.resetAll")}
      </Button>


      {hasActiveFilters() && (
        <span className="text-sm text-gray-600">
          {t("filters.activeCount", { count: Object.values(filters).filter((v) => v !== undefined && v !== null).length })}
        </span>
      )}
    </div>
  );
};
