import React from 'react';
import { type VariantProps } from "class-variance-authority";
declare const variants: (props?: ({
    variant?: "default" | "outline" | "secondary" | "destructive" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {
    asChild?: boolean;
}
declare const AuthButton: React.ForwardRefExoticComponent<props & React.RefAttributes<HTMLButtonElement>>;
export { AuthButton, variants };
