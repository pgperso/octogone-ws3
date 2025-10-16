"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Route } from "@/types/routes";
import { MobileDrawerProps } from "./types";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/modern-sheet";

export const ModernMobileNav: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  routes,
  locale = "fr",
}) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const pathname = usePathname();
  
  // Pour les traductions côté client, nous utilisons des textes codés en dur
  // Les traductions seront gérées côté serveur dans le layout

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-2">
          <motion.div
            className="px-6 space-y-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {routes.map((route) => {
              const hasChildren = route.children && route.children.length > 0;
              const isExpanded = expandedItems.includes(route.path);
              const isActive = pathname === route.path;

              return (
                <motion.div key={route.path} variants={itemVariants} className="mb-2">
                  {hasChildren ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleExpanded(route.path)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-lg text-left",
                          isActive
                            ? "bg-marine-50 text-marine-900 font-medium"
                            : "text-marine-700 hover:bg-marine-50/50",
                        )}
                      >
                        <span className="text-lg">{route.label}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-marine-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-marine-500" />
                        )}
                      </button>

                      {/* Dropdown Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 gap-2 p-3 bg-marine-50/30 rounded-lg mt-1">
                              {route.children?.map((child: Route) => {
                                const isChildActive = pathname === child.path;
                                return (
                                  <Link
                                    key={child.path}
                                    href={child.path}
                                    className={cn(
                                      "p-3 rounded-lg transition-colors",
                                      isChildActive
                                        ? "bg-white shadow-sm text-marine-900 font-medium"
                                        : "text-marine-700 hover:bg-white/80",
                                    )}
                                    onClick={onClose}
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium">{child.label}</span>
                                      {child.description && (
                                        <span className="text-sm text-marine-500 mt-1 line-clamp-2">
                                          {child.description}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={route.path}
                      className={cn(
                        "block p-3 rounded-lg",
                        isActive
                          ? "bg-marine-50 text-marine-900 font-medium"
                          : "text-marine-700 hover:bg-marine-50/50",
                      )}
                      onClick={onClose}
                    >
                      <span className="text-lg">{route.label}</span>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Footer */}
        <SheetFooter className="flex flex-col gap-4">
          {/* Theme & Language Toggle */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-marine-500 dark:text-dark-muted" />
                <span className="text-marine-700 dark:text-dark-text">Changer de langue:</span>
                <LanguageToggle currentLocale={locale} />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center gap-2">
                <span className="text-marine-700 dark:text-dark-text">Thème:</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          <Button variant="primary" className="w-full py-6 text-base" onClick={onClose}>
            {locale === "fr" ? "Réserver une démo" : "Book a demo"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
