import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-marine-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-marine-900 text-white hover:bg-marine-700",
        primary: "bg-gold-500 text-marine-900 hover:bg-gold-400",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-marine-200 bg-white hover:bg-marine-100 hover:text-marine-900",
        secondary: "bg-marine-100 text-marine-900 hover:bg-marine-200",
        ghost: "hover:bg-marine-100 hover:text-marine-900",
        link: "text-marine-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
