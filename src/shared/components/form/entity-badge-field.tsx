import { Plus, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/utils";

interface IEntityBadgeFieldProps<T> {
  title?: string;
  items: T[];
  getLabel: (item: T) => string;
  onRemove: (index: number) => void;
  onAddClick: () => void;
  addLabel: string;
  emptyText: string;
  isAdding?: boolean;
  className?: string;
}

export const EntityBadgeField = <T,>({
  title,
  items,
  getLabel,
  onRemove,
  onAddClick,
  addLabel,
  emptyText,
  isAdding = false,
  className,
}: IEntityBadgeFieldProps<T>) => {
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center justify-between">
        {title && <h3 className="text-sm font-medium">{title}</h3>}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddClick}
          disabled={isAdding}
          className="gap-1.5 ml-auto"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">{emptyText}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Badge
              key={index}
              variant="outline_blue"
              className="gap-1.5 py-1.5 px-3 text-sm"
            >
              {getLabel(item)}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
