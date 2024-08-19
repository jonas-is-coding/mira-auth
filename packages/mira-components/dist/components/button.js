var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Slot } from "@radix-ui/react-slot";
const variants = cva("flex items-center justify-center font-medium w-full h-[52px] px-[10px] py-5 rounded-md cursor-pointer", {
    variants: {
        variant: {
            default: "bg-[#1d1923] hover:bg-[#201e28] text-white",
            outline: "bg-transparent hover:bg-[#201e28] text-white border border-[#1d1923]",
            secondary: "bg-gray-100 text-[#02000a] hover:bg-gray-200",
            destructive: "bg-red-700 text-white hover:bg-red-700/90",
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
});
const Button = React.forwardRef((_a, ref) => {
    var { className, variant, asChild = false } = _a, props = __rest(_a, ["className", "variant", "asChild"]);
    const Comp = asChild ? Slot : "button";
    return (React.createElement(Comp, Object.assign({ className: cn(variants({ variant, className })), ref: ref }, props)));
});
Button.displayName = "Button";
export { Button, variants };
