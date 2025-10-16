import { cva } from "class-variance-authority";

export const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        outline: "border",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2 data-[state=active]:border-primary",
        ghost: "hover:bg-muted/50",
      },
      size: {
        default: "px-3 py-1.5",
        sm: "px-2 py-1 text-xs",
        lg: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        outline: "border rounded-md p-4",
        ghost: "mt-0",
      },
      animation: {
        default:
          "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95",
        slide:
          "data-[state=active]:animate-in data-[state=active]:slide-in-from-left",
        fade: "data-[state=active]:animate-in data-[state=active]:fade-in",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "default",
    },
  },
);
