import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border border-marine-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-marine-900",
  {
    variants: {
      variant: {
        default: "bg-white text-marine-900",
        destructive:
          "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500",
        success: "border-green-500/50 text-green-500 [&>svg]:text-green-500",
        warning: "border-yellow-500/50 text-yellow-500 [&>svg]:text-yellow-500",
        info: "border-blue-500/50 text-blue-500 [&>svg]:text-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const alertTitleVariants = cva(
  "mb-1 font-medium leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "text-marine-900",
        destructive: "text-red-500",
        success: "text-green-500",
        warning: "text-yellow-500",
        info: "text-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed", {
  variants: {
    variant: {
      default: "text-marine-500",
      destructive: "text-red-400",
      success: "text-green-400",
      warning: "text-yellow-400",
      info: "text-blue-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
