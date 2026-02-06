import * as React from "react";

import { cn } from "@/shared/utils/utils";


interface InputProps extends React.ComponentProps<"input"> {
  disableDisabledStyles?: boolean;
}


       

function Input({ className, type, disableDisabledStyles, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex",
        "rounded-lg md:rounded-2xl lg:rounded-2xl",
        "border",
        "border-input",
        "bg-transparent",
        "px-2 md:px-3  lg:px-3 py-1",
        "text-sm md:text-base lg:text-base",
        "shadow-xs",
        "outline-none",
        "transition-[color,box-shadow]",
        "md:text-sm",

        //File style
        "file:text-foreground",
        "file:inline-flex",
        "file:h-7",
        "file:border-0",
        "file:bg-transparent",
        "file:text-sm",
        "file:font-medium",

        "placeholder:text-muted-foreground",

        //Selection style
        "selection:bg-blue-900",
        "selection:text-white",

        //Focus style
        "focus-visible:ring-1 md:focus-visible:ring-2 lg:focus-visible:ring-2  focus-visible:ring-blue-500/50",
        "focus-visible:border-blue-500",

        // Disabled style
         !disableDisabledStyles && [
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed", 
          "disabled:opacity-50"
        ],

        //error
        "aria-invalid:border-destructive",
        "aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
