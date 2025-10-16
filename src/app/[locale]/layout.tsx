"use client";

import * as React from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navigation from "@/features/navigation";
import { Footer } from "@/components/ui/footer";
import FloatingROIWidget from "@/components/ui/floating-roi-widget";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { SimpleSchema } from "@/components/seo/global-schema";
import { routes } from "@/config/routes";
import { CalculatorProvider, useCalculator } from "@/contexts/calculator-context";

const inter = Inter({ subsets: ["latin"] });

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  const pathname = usePathname();

  // Extraire le chemin sans le préfixe de locale
  const path = pathname.replace(/^\/[^\/]+/, "");
  const activeRoute = path || "/";

  // Ajouter le préfixe de locale aux routes
  const localizedRoutes = routes.map(route => ({
    href: `/${locale}${route.path}`,
    label: route.label,
    path: route.path,
    description: route.description,
    children: route.children?.map(child => ({
      href: `/${locale}${child.path}`,
      label: child.label,
      path: child.path,
      description: child.description,
    }))
  }));

  return (
    <AnalyticsProvider>
      <CalculatorProvider>
        <LayoutContent locale={locale} localizedRoutes={localizedRoutes} activeRoute={activeRoute}>
          {children}
        </LayoutContent>
      </CalculatorProvider>
    </AnalyticsProvider>
  );
}

function LayoutContent({ 
  locale, 
  localizedRoutes, 
  activeRoute, 
  children 
}: { 
  locale: string; 
  localizedRoutes: Array<Record<string, unknown>>; 
  activeRoute: string; 
  children: React.ReactNode;
}) {
  const { isCalculatorMinimized, expandCalculator, minimizeCalculator } = useCalculator();
  
  return (
    <div lang={locale} className={inter.className}>
      {/* Schema.org simple et fiable pour SEO IA */}
      <SimpleSchema locale={locale} />
      
      <Navigation routes={localizedRoutes} activeRoute={activeRoute} theme="light" locale={locale} />
      <main className="min-h-screen pt-32">{children}</main>
      <Footer />
      
      {/* Widget flottant ROI */}
      <FloatingROIWidget 
        isMinimized={isCalculatorMinimized} 
        onExpand={expandCalculator}
        onMinimize={minimizeCalculator}
      />
    </div>
  );
}
