import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps<T extends ElementType = "div"> {
  children: ReactNode;
  className?: string;
  as?: T;
  fluid?: boolean;
}

export function Container<T extends ElementType = "div">({
  children,
  className,
  as,
  fluid = false,
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8",
        {
          "max-w-[450px] sm:max-w-[728px] md:max-w-[984px] lg:max-w-[1240px] xl:max-w-[1496px]":
            !fluid,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
}
