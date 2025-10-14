import { Plus, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";

import type { Job, JobApplyMethod, JobStatus } from "@/types/entity";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Input } from "../../../components/ui/input";
import type {
  IFiltersJob,
} from "@/features/job/types/hook";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Label } from "../../../components/ui/label";
import { DatePickerInput } from "../../../components/input/date-picker-input";
import { SelectInput } from "@/components/form/input/select-input";
import {
  getJobSApplicationMethodWithTranslation,
  getJobStatusWithTranslation,
} from "@/utils/utils";
import type { TFunction } from "i18next";
import type { IUseFiltersReturn } from "@/types/hook";

interface DataTableHeaderProps <TFilter extends object> {
  t: TFunction<"Job", undefined>;
  addItemLink: string;
  filtersManager: IUseFiltersReturn<TFilter>;
  clearParams: () => void;
}

export const DataTableHeader = <TFilter extends object>({
  addItemLink,
  t,
  filtersManager,
  clearParams,
}: DataTableHeaderProps<TFilter>) => {
  const navigate = useNavigate();

  const { filters, updateFilters, clearFilters } =   filtersManager;
;

  const defaultFilters = {
    jobTitle: filters.jobTitle || "",
    enterprise: filters.enterprise || "",
    status: filters.status || undefined,
    applicationMethod: filters?.applicationMethod || undefined,
    appliedAt: undefined,
  };

  const [tempFilters, setTempFilters] = useState<IFiltersJob>(defaultFilters);

  const updateTempFilters = (
    column: keyof Job,
    value:
      | string
      | Date
      | (typeof JobApplyMethod)[keyof typeof JobApplyMethod]
      | (typeof JobStatus)[keyof typeof JobStatus]
  ) =>
    setTempFilters((prev) => {
      return { ...prev, [column]: value };
    });

  const applyFitlers = () => updateFilters(tempFilters);
  return (
    <div className="flex justify-start items-center gap-2 p-2">
      <Button
        className="flex  gap-2  text-white"
        variant="blue"
        onClick={() => navigate(addItemLink)}
      >
        <Plus />
        Ajouter
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex  gap-2  text-white" variant="blue">
            <SlidersHorizontal />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3" key="jobTitle">
              <Label htmlFor="sheet-demo-name">Titre</Label>
              <Input
                value={tempFilters.jobTitle}
                required={false}
                onChange={(e) => updateTempFilters("jobTitle", e.target.value)}
              />
            </div>
            <div className="grid gap-3" key="enterprise">
              <Label htmlFor="sheet-demo-name">Entreprise</Label>
              <Input
                value={tempFilters.enterprise}
                required={false}
                onChange={(e) =>
                  updateTempFilters("enterprise", e.target.value)
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Status</Label>
              <SelectInput
                {...{
                  handleOnChange: (value: string) =>
                    updateTempFilters("status", value),
                  ...(tempFilters.status
                    ? { defaultValue: tempFilters.status }
                    : {}),
                  required: false,
                  selectValues: getJobStatusWithTranslation(t),
                  placeholder: "CHoisir un status",
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Postulé via</Label>
              <SelectInput
                {...{
                  handleOnChange: (value: string) =>
                    updateTempFilters("applicationMethod", value),
                  ...(tempFilters.applicationMethod
                    ? { defaultValue: tempFilters.applicationMethod }
                    : {}),
                  required: false,
                  selectValues: getJobSApplicationMethodWithTranslation(t),
                  placeholder: "CHoisir une méthode",
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Postulée le</Label>
              <DatePickerInput
                value={tempFilters.appliedAt || ""}
                label="Postulée le"
                placeholder="2 septembre 2015"
                handleOnChange={(value: Date) =>
                  updateTempFilters("appliedAt", value)
                }
              />
            </div>
          </div>
          <SheetFooter>
            <Button
              className="flex  gap-2  text-white"
              variant="blue"
              onClick={applyFitlers}
            >
              {" "}
              <SlidersHorizontal /> Appliquer
            </Button>
            <SheetClose asChild>
              <Button
                variant="blue"
                onClick={() => {
                  clearFilters();
                  setTempFilters({
                    jobTitle: "",
                    enterprise: "",
                    status: undefined,
                    applicationMethod: undefined,
                    appliedAt: undefined,
                  });
                }}
              >
                <RotateCcw /> Reinitialiser Filters
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Button
        className="flex  gap-2  text-white"
        variant="blue"
        onClick={() => clearParams()}
      >
        <RotateCcw />
        Réinitialiser
      </Button>
    </div>
  );
};
