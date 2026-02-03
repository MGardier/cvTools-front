import { cn } from "@/common/utils/utils";
import { PaginationLink } from "../ui/pagination";
import { PaginationItem } from "@/components/ui/pagination";
import type { ReactNode } from "react";

interface DataTablePaginationItemProps {
  children: ReactNode;
  handleClick: () => void;
}

export const DataTablePaginationItem = ({

  children,
  handleClick,
}: DataTablePaginationItemProps) => {
  return (
    <PaginationItem >
      <PaginationLink
        className={cn(
          "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm cursor-pointer",
        )}
        onClick={() => handleClick()}
      >
        {children}
      </PaginationLink>
    </PaginationItem>
  );
};
