import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: string;
  fluid?: boolean;
}

export function Container({
  children,
  className,
  as = "div",
  fluid = false,
}: ContainerProps) {
  return React.createElement(
    as,
    {
      className: cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8",
        {
          "max-w-[450px] sm:max-w-[728px] md:max-w-[984px] lg:max-w-[1240px] xl:max-w-[1496px]":
            !fluid,
        },
        className,
      ),
    },
    children
  );
}
