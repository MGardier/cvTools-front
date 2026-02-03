import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/common/utils/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Layout & Display
        "peer", "inline-flex", "shrink-0", "items-center",
        
        // Dimensions
        "h-[1.15rem]", "w-8",
        
        // Colors & Background States
        "data-[state=checked]:bg-blue-400", "data-[state=unchecked]:bg-input", "dark:data-[state=unchecked]:bg-input/80",
        
        // Borders
        "border", "border-transparent",
        
        // Focus & Ring
        "focus-visible:border-ring", "focus-visible:ring-ring/50", "focus-visible:ring-[3px]", "outline-none",
        
        // Shape & Visual Effects
        "rounded-full", "shadow-xs",
        
        // Transitions & Animations
        "transition-all",
        
        // Disabled States
        "disabled:cursor-not-allowed", "disabled:opacity-50",
        
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Layout & Interaction
          "pointer-events-none", "block",
          
          // Dimensions
          "size-4",
          
          // Colors & Background States
          "bg-background", "dark:data-[state=unchecked]:bg-foreground", "dark:data-[state=checked]:bg-primary-foreground",
          
          // Ring & Outline
          "ring-0",
          
          // Shape
          "rounded-full",
          
          // Transforms & Transitions
          "transition-transform", "data-[state=checked]:translate-x-[calc(100%-2px)]", "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch}