import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        warning:
          "inline-flex items-center rounded-full px-2.5 py-1  font-medium bg-amber-100 text-amber-800",
        primary:
          "inline-flex items-center rounded-full px-2.5 py-1  font-medium bg-blue-400 hover:bg-blue-800 text-white ",
        violet:
          "inline-flex items-center rounded-full px-2.5 py-1  font-medium bg-purple-100 text-purple-800",
        danger:
          "inline-flex items-center rounded-full px-2.5 py-1 font-medium bg-red-100 text-red-800",
        outline_blue:
          "inline-flex items-center rounded-full px-2.5 py-1  font-medium bg-white hover:bg-blue-400 hover:text-white text-blue-500 border-1 border-blue-400 ",
        blue:
           "inline-flex items-center rounded-full px-2.5 py-1  font-medium bg-blue-400 text-white  border-1 border-blue-400 ",
        emerald:
           "inline-flex items-center rounded-full px-2.5 py-1  font-medium bg-emerald-600 text-white  border-1 border-emerald-600 "

   
      },
      size: {
        default: "px-2.5 py-1 ",
        sm: "px-1.25 py-0.5 ",

      },

    },
    defaultVariants: {
      variant: "primary",
      size: "default",


    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {

  return (
    <span
      data-slot="button"
      className={cn(badgeVariants({ variant, size,className }))}
      {...props}
    />
  );
}


export { Badge, badgeVariants };
