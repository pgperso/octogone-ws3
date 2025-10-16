import { cva } from "class-variance-authority";

export const carouselVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      outline: "border rounded-lg p-4",
      ghost: "shadow-none",
    },
    size: {
      default: "w-full",
      sm: "max-w-sm",
      lg: "max-w-lg",
      xl: "max-w-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const carouselContentVariants = cva("flex h-full w-full gap-4", {
  variants: {
    orientation: {
      horizontal: "-ml-4",
      vertical: "flex-col -mt-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const carouselItemVariants = cva(
  "relative h-full min-w-0 shrink-0 grow-0 basis-full pl-4",
  {
    variants: {
      orientation: {
        horizontal: "first:pl-4",
        vertical: "pt-4 first:pt-4",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const carouselPreviousVariants = cva(
  "absolute rounded-full flex items-center justify-center text-marine-900 hover:bg-marine-100",
  {
    variants: {
      orientation: {
        horizontal: "-left-12 top-1/2 -translate-y-1/2 h-8 w-8",
        vertical: "-top-12 left-1/2 -translate-x-1/2 h-8 w-8 rotate-90",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const carouselNextVariants = cva(
  "absolute rounded-full flex items-center justify-center text-marine-900 hover:bg-marine-100",
  {
    variants: {
      orientation: {
        horizontal: "-right-12 top-1/2 -translate-y-1/2 h-8 w-8",
        vertical: "-bottom-12 left-1/2 -translate-x-1/2 h-8 w-8 rotate-90",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);
