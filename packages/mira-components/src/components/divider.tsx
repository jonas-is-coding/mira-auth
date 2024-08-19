import { cn } from "../lib/utils"
import React from "react";

export interface props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Divider = React.forwardRef<HTMLSpanElement, props>(
  ({ className, type, ...props }, ref) => {
    return (
      <span
        className={cn("w-full h-[1px] bg-gray-900", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider"
   
export { Divider }