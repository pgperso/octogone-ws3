"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DesktopNavProps } from "./types";
// import { Button } from "@/components/ui/button"; // Non utilisé
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  navigationTriggerVariants,
  // navigationContentVariants, // Non utilisé
  navigationLinkVariants,
} from "@/components/ui/navigation-menu/variants";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
  }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "inline-block select-none rounded-lg p-4 leading-none no-underline outline-none transition-colors hover:bg-marine-50/80 hover:text-marine-900 focus:bg-marine-50",
          className,
        )}
        {...props}
      >
        <div className="text-lg font-semibold leading-tight text-marine-900">
          {title}
        </div>
        {children && (
          <p className="text-sm leading-relaxed text-marine-500 mt-2">
            {children}
          </p>
        )}
      </Link>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

export const DesktopNav: React.FC<DesktopNavProps> = ({
  routes,
  activeRoute,
}) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center w-full">
      <NavigationMenu className="w-full max-w-screen-lg">
        <NavigationMenuList className="flex items-center gap-6 justify-center">
          {routes.map((route) => {
            // Extraire le chemin sans locale pour la comparaison
            const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '');
            
            // Vérifie si l'item principal est actif en tenant compte des sous-chemins
            const isActive =
              activeRoute === route.path || 
              pathname === route.path ||
              pathWithoutLocale === route.path ||
              pathWithoutLocale.startsWith(route.path + "/") ||
              // Vérifie si un des enfants est actif
              (route.children && route.children.some(child => 
                pathname === child.path || pathname.startsWith(child.path + "/")
              ));
            const hasChildren = route.children && route.children.length > 0;

            return (
              <NavigationMenuItem key={route.path}>
                {hasChildren ? (
                  <>
                    <NavigationMenuTrigger
                      className={`${navigationTriggerVariants({ active: isActive })} nav-item ${isActive ? "active-nav-item" : ""} rounded-md px-3 py-2`}
                    >
                      {route.label}
                      <ChevronDown 
                        className="h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" 
                        style={{ color: isActive ? 'var(--on-secondary-container)' : 'var(--on-background)' }} 
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent 
                      className="backdrop-blur-sm p-6 rounded-lg shadow-lg flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 mt-8 border"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--outline)',
                        opacity: 0.98
                      }}
                    >
                      {(() => {
                        const itemCount = route.children?.length || 0;
                        const itemWidth = 220; // Largeur d'un item en pixels
                        const columnCount = Math.min(Math.max(1, itemCount), 7); // Max 7 colonnes
                        const containerWidth = columnCount * itemWidth;

                        return (
                          <div
                            className="grid gap-4"
                            style={{
                              width: `${containerWidth}px`,
                              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                            }}
                          >
                            {route.children?.map((item: { path: string; label: string }) => {
                              const isActive = pathname.includes(item.path);
                              return (
                                <Link
                                  key={item.path}
                                  href={item.href || item.path}
                                  className="block p-4 rounded-md transition-all duration-200"
                                  style={{
                                    backgroundColor: isActive ? 'var(--secondary-container)' : 'transparent'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--secondary-container)';
                                    const title = e.currentTarget.querySelector('.item-title') as HTMLElement;
                                    const desc = e.currentTarget.querySelector('.item-description') as HTMLElement;
                                    if (title) title.style.color = 'var(--on-secondary-container)';
                                    if (desc) desc.style.color = 'var(--on-secondary-container)';
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isActive) {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                      const title = e.currentTarget.querySelector('.item-title') as HTMLElement;
                                      const desc = e.currentTarget.querySelector('.item-description') as HTMLElement;
                                      if (title) title.style.color = 'var(--on-background)';
                                      if (desc) desc.style.color = 'var(--on-surface-variant)';
                                    }
                                  }}
                                >
                                  <div className="item-title text-lg font-medium mb-2" style={{ color: isActive ? 'var(--on-secondary-container)' : 'var(--on-background)' }}>
                                    {item.label}
                                  </div>
                                  {item.description && (
                                    <p className="item-description text-sm" style={{ color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}>
                                      {item.description}
                                    </p>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={(route as { href?: string; path: string }).href || route.path}
                      className={`
                      ${navigationLinkVariants({ active: isActive })} 
                      nav-item ${isActive ? "active-nav-item" : ""} 
                      rounded-md px-3 py-2
                      ${route.label === "Connexion" ? "ml-2" : ""}
                    `}
                    >
                      {route.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
};
