import { cva } from "class-variance-authority";

export const navigationTriggerVariants = cva(
  [
    // Base
    "group inline-flex items-center justify-center gap-2",
    "rounded-md px-3 py-2 text-base font-medium",
    "transition-all duration-200",
    "outline-none focus-visible:ring-2 focus-visible:ring-gold-300",
    "relative",

    // Default state
    "text-marine-600 hover:text-marine-900",
    "hover:bg-marine-50/80",

    // Active/Open state
    "data-[state=open]:bg-marine-50/80",
    "data-[state=open]:text-marine-900",
  ],
  {
    variants: {
      active: {
        true: "text-marine-900 bg-marine-50/80",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const navigationContentVariants = cva([
  // Base
  "absolute left-0 top-full w-full",

  // Animations
  "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
  "data-[motion^=from-]:duration-200 data-[motion^=to-]:duration-150",
  "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
  "data-[motion=from-end]:slide-in-from-right-4",
  "data-[motion=from-start]:slide-in-from-left-4",
  "data-[motion=to-end]:slide-out-to-right-4",
  "data-[motion=to-start]:slide-out-to-left-4",
  "data-[motion^=from-]:translate-y-[8px] data-[motion^=to-]:translate-y-0",

  // Styling
  "transform-gpu",
]);

export const navigationLinkVariants = cva(
  [
    // Base
    "block rounded-md px-3 py-2",
    "text-base font-medium leading-none no-underline",
    "outline-none transition-all duration-200",
    "focus-visible:ring-2 focus-visible:ring-gold-300",

    // Default state
    "text-marine-600 hover:text-marine-900",
    "hover:bg-marine-50/80",
  ],
  {
    variants: {
      active: {
        true: "text-marine-900 bg-marine-50/80",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
