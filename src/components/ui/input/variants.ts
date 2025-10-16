import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-marine-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-marine-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-marine-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white",
        ghost: "border-none shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
