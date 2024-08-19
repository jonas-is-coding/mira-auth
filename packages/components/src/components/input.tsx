import { cn } from "../lib/utils"
import React from 'react';
 
export interface props
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, props>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          className={cn(
            "h-[44px] text-[16px] w-full text-gray-100 bg-[#1d1923] hover:bg-[#201e28] px-[10px] py-[14px] rounded-md focus:outline-violet-400 focus:outline-1 focus:outline placeholder:font-light placeholder:text-gray-600",
            className
          )}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Input.displayName = "Input"
   
  export { Input }