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
import { cn } from "../lib/utils";
import React from 'react';
const Input = React.forwardRef((_a, ref) => {
    var { className, type } = _a, props = __rest(_a, ["className", "type"]);
    return (React.createElement("input", Object.assign({ type: type, className: cn("h-[44px] text-[16px] w-full text-gray-100 bg-[#1d1923] hover:bg-[#201e28] px-[10px] py-[14px] rounded-md focus:outline-violet-400 focus:outline-1 focus:outline placeholder:font-light placeholder:text-gray-600", className), ref: ref }, props)));
});
Input.displayName = "Input";
export { Input };
