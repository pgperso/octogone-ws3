import { cva } from "class-variance-authority";

export const accordionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      ghost: "border-none shadow-none",
      outline: "border rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "",
        ghost: "hover:bg-marine-50",
        outline: "px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const accordionContentVariants = cva(
  "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  {
    variants: {
      variant: {
        default: "",
        ghost: "px-0",
        outline: "px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
