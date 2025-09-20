import { cn } from "@/utils/utils";
import { PaginationLink } from "../ui/pagination";
import { PaginationItem } from "@/components/ui/pagination";

interface DataTablePaginationItemProps {
  page: number;
  isInError?: boolean;
  isActive: boolean;
  handleClick: (page: number) => void;
  key: number;
}

export const DataTablePaginationItem = ({

  page,
  isInError,
  isActive,
  handleClick,
}: DataTablePaginationItemProps) => {
  return (
    <PaginationItem >
      <PaginationLink
        className={cn(
          "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm cursor-pointer",
          isInError && "text-red-500",
          isActive && "text-blue-600"
        )}
        onClick={() => handleClick(page)}
        isActive={isActive}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );
};
