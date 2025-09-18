import { Card } from "@/components/ui/card";
import { InputSkeletonField } from "@/components/form/skeleton/input-skeleton-field";
import { PaginationSkeleton } from "@/components/skeleton/pagination-skeleton";
import { SubmitSkeleton } from "@/components/form/skeleton/submit-skeleton";
import { SwitchSkeletonField } from "@/components/form/skeleton/switch-skeleton-field";
import { FormCardSkeletonHeader } from "@/components/form/form-card-skeleton-header";

export const JobSkeletonForm = () => {
  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <FormCardSkeletonHeader />
      <div className="px-6">
        <div className="grid gap-6">
          <InputSkeletonField />

          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
            </div>

            <div className="flex gap-2 items-center">
              <div className="h-8 md:h-12 lg:h-12 bg-gray-200 rounded-lg md:rounded-2xl animate-pulse flex-1" />
              <div className="h-8 md:h-12 w-12 bg-gray-200 rounded-xl md:rounded-2xl animate-pulse" />
            </div>
          </div>

          <InputSkeletonField />

          <SwitchSkeletonField />

          <PaginationSkeleton length={4} />

          <SubmitSkeleton />
        </div>
      </div>
    </Card>
  );
};
