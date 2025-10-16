import { cva } from "class-variance-authority";

export const formItemVariants = cva("space-y-2", {
  variants: {
    layout: {
      default: "",
      horizontal: "sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 sm:space-y-0",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

export const formLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      layout: {
        default: "",
        horizontal: "sm:pt-1.5",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  },
);

export const formControlVariants = cva("", {
  variants: {
    layout: {
      default: "",
      horizontal: "sm:col-span-3",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

export const formDescriptionVariants = cva("text-sm text-marine-500", {
  variants: {
    layout: {
      default: "",
      horizontal: "sm:col-span-3 sm:col-start-2",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

export const formMessageVariants = cva("text-sm font-medium text-red-500", {
  variants: {
    layout: {
      default: "",
      horizontal: "sm:col-span-3 sm:col-start-2",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});
