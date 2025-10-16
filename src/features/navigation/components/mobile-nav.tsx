"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Route } from "@/types/routes";
import { MobileDrawerProps } from "./types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navigationLinkVariants } from "@/components/ui/navigation-menu/variants";

export const MobileNav: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  routes,
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {routes.map((route) => {
              const hasChildren = route.children && route.children.length > 0;
              const isExpanded = expandedItems.includes(route.path);
              const isActive = pathname === route.path;

              return (
                <div key={route.path} className="space-y-1">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(route.path)}
                      className={cn(
                        navigationLinkVariants({ active: isActive }),
                        "w-full flex items-center justify-between",
                      )}
                    >
                      <span>{route.label}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isExpanded && "rotate-90",
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={route.path}
                      className={navigationLinkVariants({ active: isActive })}
                      onClick={onClose}
                    >
                      {route.label}
                    </Link>
                  )}

                  {/* Dropdown Content */}
                  {hasChildren && route.children && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden motion-element"
                          onAnimationComplete={() => {
                            // Nettoyage après animation de sous-menu
                            if (isExpanded) {
                              const element = document.querySelector(`[data-submenu="${route.path}"]`);
                              if (element) element.classList.add('animation-complete');
                            }
                          }}
                          pl-4
                        >
                          <div className="space-y-1 border-l border-marine-100 pl-4">
                            {route.children.map((child: Route) => (
                              <motion.div
                                key={route.path}
                                initial="hidden"
                                animate="visible"
                                variants={navigationLinkVariants}
                                transition={{ delay: index * 0.1 }}
                                className="motion-element"
                                onAnimationComplete={() => {
                                  // Nettoyage GPU après animation
                                  const element = document.querySelector(`[data-route="${route.path}"]`);
                                  if (element) element.classList.add('animation-complete');
                                }}
                              >
                                <Link
                                  href={child.path}
                                  className={navigationLinkVariants({
                                    active: pathname === child.path,
                                  })}
                                  onClick={onClose}
                                >
                                  {child.label}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t mt-auto">
          <Button variant="default" className="w-full" onClick={onClose}>
            Réserver une démo
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
