import React from 'react';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"
import { Slot } from "@radix-ui/react-slot"

const variants = cva(
    "flex items-center justify-center font-medium w-full h-[52px] px-[10px] py-5 rounded-md cursor-pointer",
    {
      variants: {
        variant: {
          default: "bg-[#1d1923] hover:bg-[#201e28] text-white",
          outline:
            "bg-transparent hover:bg-[#201e28] text-white border border-[#1d1923]",
          secondary:
            "bg-gray-100 text-[#02000a] hover:bg-gray-200",
        destructive:
            "bg-red-700 text-white hover:bg-red-700/90",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )

  export interface props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, props>(
    ({ className, variant, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button"
      return (
        <Comp
          className={cn(variants({ variant, className }))}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Button.displayName = "Button"
   
  export { Button, variants }