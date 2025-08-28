import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        warning:
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800",
        primary:
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800",
        violet:
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-800",
        danger:
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800",

   
      },

    },
    defaultVariants: {
      variant: "primary",

    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {

  return (
    <span
      data-slot="button"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}


export { Badge, badgeVariants };
