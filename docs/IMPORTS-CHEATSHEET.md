# 📦 Cheatsheet des Imports - Octogone

Guide rapide pour importer les modules du projet.

---

## 🎯 Données

### **Témoignages**

```typescript
// Import via l'index (recommandé)
import { clientsReal, clientsDemo, type Testimonial } from '@/data/testimonials';

// Import direct
import clientsReal from '@/data/testimonials/clients-real.json';
import clientsDemo from '@/data/testimonials/clients-demo.json';

// Via le fichier principal
import { testimonials } from '@/data/testimonials-data';
```

### **Secteurs**

```typescript
import { sectors } from '@/data/sectors-data';
```

### **Fonctionnalités**

```typescript
import { features } from '@/data/features-data';
```

---

## 🔧 Générateurs SEO

### **Schemas de témoignages**

```typescript
// Import via l'index (recommandé)
import { 
  generateReviewSchema,
  generateTestimonialBreadcrumb,
  generateProductSchema,
  generateOrganizationWithTestimonials,
  generateAggregateRating,
  type TestimonialSchemaData
} from '@/lib/seo';

// Import direct
import { generateReviewSchema } from '@/lib/seo/schema-generator';
```

**Fonctions disponibles :**

| Fonction | Paramètres | Retour | Usage |
|----------|-----------|--------|-------|
| `generateReviewSchema()` | `testimonial, locale` | Schema Review | Page détail |
| `generateTestimonialBreadcrumb()` | `id, name, locale` | Schema Breadcrumb | Page détail |
| `generateProductSchema()` | `locale` | Schema Product | Page accueil |
| `generateOrganizationWithTestimonials()` | `locale` | Schema Organization | Page accueil |
| `generateAggregateRating()` | - | AggregateRating | Automatique |

---

## 🎨 Composants SEO

### **Schemas globaux**

```typescript
// Import via l'index (recommandé)
import { SimpleSchema } from '@/components/seo';

// Import direct
import { SimpleSchema } from '@/components/seo/global-schema';

// Utilisation
<SimpleSchema locale={locale} />
```

### **SEO dynamique**

```typescript
import { DynamicSEO } from '@/components/seo';

// Utilisation (futur)
<DynamicSEO 
  testimonials={testimonials}
  features={features}
  sectors={sectors}
  locale={locale}
/>
```

---

## 🧩 Composants UI

### **Navigation**

```typescript
import Navigation from '@/features/navigation';
import { Footer } from '@/components/ui/footer';
```

### **Sections**

```typescript
import { ResponsiveSection } from '@/components/ui/responsive-section';

// Utilisation
<ResponsiveSection spacing="xl" bgColor="bg-white">
  {children}
</ResponsiveSection>
```

### **Widgets**

```typescript
import FloatingROIWidget from '@/components/ui/floating-roi-widget';
```

---

## 🌐 Routing & i18n

### **Routes**

```typescript
import { routes } from '@/config/routes';

// Utilisation
const href = routes.testimonials.detail(locale, testimonialId);
```

### **Paramètres de locale**

```typescript
import { useParams } from 'next/navigation';

const params = useParams();
const locale = params?.locale as string || 'fr';
```

---

## 🎯 Contextes

### **Calculator**

```typescript
import { CalculatorProvider, useCalculator } from '@/contexts/calculator-context';

// Utilisation
const { openCalculator } = useCalculator();
```

---

## 📊 Analytics

### **Provider**

```typescript
import { AnalyticsProvider } from '@/components/analytics/analytics-provider';

// Utilisation
<AnalyticsProvider>
  {children}
</AnalyticsProvider>
```

---

## 🖼️ Images

### **Next.js Image**

```typescript
import Image from 'next/image';

// Utilisation
<Image
  src="/images/testimonials/client.jpg"
  alt="Description"
  fill
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 896px"
  priority
/>
```

---

## 🛠️ Utilitaires

### **Class Names**

```typescript
import { cn } from '@/lib/utils';

// Utilisation
<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)} />
```

---

## 📝 Types

### **Témoignages**

```typescript
import type { Testimonial } from '@/data/testimonials-data';

// Ou via l'index
import type { Testimonial } from '@/data/testimonials';
```

### **SEO**

```typescript
import type { TestimonialSchemaData } from '@/lib/seo';
```

---

## 🎯 Exemples Complets

### **Page de témoignage**

```typescript
"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { testimonials, type Testimonial } from "@/data/testimonials-data";
import { 
  generateReviewSchema, 
  generateTestimonialBreadcrumb 
} from "@/lib/seo";

export default function TestimonialDetailPage() {
  const params = useParams();
  const locale = params?.locale as string || "fr";
  const testimonialId = params?.testimonialId as string;
  
  const testimonial = testimonials.find(t => t.id === testimonialId);
  
  useEffect(() => {
    if (testimonial) {
      const reviewSchema = generateReviewSchema(testimonial, locale);
      const breadcrumbSchema = generateTestimonialBreadcrumb(
        testimonialId,
        locale === "fr" ? testimonial.nameFr : testimonial.nameEn,
        locale
      );
      
      // Injecter les schemas...
    }
  }, [testimonial, locale]);
  
  return (
    <main>
      {/* Contenu */}
    </main>
  );
}
```

### **Layout avec SEO**

```typescript
"use client";

import React from "react";
import { Inter } from "next/font/google";
import Navigation from "@/features/navigation";
import { Footer } from "@/components/ui/footer";
import { SimpleSchema } from "@/components/seo";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";

const inter = Inter({ subsets: ["latin"] });

export default function LocaleLayout({ children, params }) {
  const locale = params?.locale || "fr";
  
  return (
    <html lang={locale}>
      <head>
        <SimpleSchema locale={locale} />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <Navigation locale={locale} />
          {children}
          <Footer locale={locale} />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
```

---

## 🔄 Migration des anciens imports

### **Avant (anciens noms)**

```typescript
// ❌ Anciens imports
import realTestimonialsData from './testimonials/real-testimonials.json';
import { generateReviewSchema } from '@/lib/seo/testimonial-schema-generator';
import { SimpleSchema } from '@/components/seo/simple-schema';
```

### **Après (nouveaux noms)**

```typescript
// ✅ Nouveaux imports
import { clientsReal } from '@/data/testimonials';
import { generateReviewSchema } from '@/lib/seo';
import { SimpleSchema } from '@/components/seo';
```

---

## 📚 Ressources

- [STRUCTURE-GUIDE.md](./STRUCTURE-GUIDE.md) : Guide complet de structure
- [SEO-AI-STRATEGY.md](./SEO-AI-STRATEGY.md) : Stratégie SEO
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Dernière mise à jour** : 2025-10-14  
**Version** : 2.0
