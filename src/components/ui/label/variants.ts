import { cva } from "class-variance-authority";

export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-marine-900",
        ghost: "text-marine-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
