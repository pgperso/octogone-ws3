import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-lg border border-marine-200 bg-white text-marine-900 shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "border-none shadow-none",
        elevated: "shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const cardHeaderVariants = cva("flex flex-col space-y-1.5 p-6", {
  variants: {
    variant: {
      default: "",
      compact: "p-4",
      spacious: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const cardContentVariants = cva("p-6", {
  variants: {
    variant: {
      default: "",
      compact: "p-4",
      spacious: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const cardFooterVariants = cva("flex items-center p-6", {
  variants: {
    variant: {
      default: "",
      compact: "p-4",
      spacious: "p-8",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "start",
  },
});
