"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { testimonials, type Testimonial } from "@/data/testimonials-data";
import Image from "next/image";
import { generateReviewSchema, generateTestimonialBreadcrumb } from "@/lib/seo/schema-generator";

// Données complètes des témoignages (pour ceux qui ont des détails - exemples fictifs)
const demoTestimonialDetails = [
  {
    id: "mario-rossi",
    fullStoryFr: "Propriétaire du Restaurant Mario depuis 15 ans, j'ai toujours eu du mal à gérer efficacement mes stocks et à prévoir mes commandes. Avec Octogone et son IA Cortex, tout a changé. L'automatisation des inventaires nous fait gagner un temps précieux, et les prédictions sont d'une précision remarquable. Nous n'avons plus de ruptures de stock sur nos ingrédients phares comme les tomates San Marzano ou la mozzarella di bufala.",
    fullStoryEn: "Owner of Restaurant Mario for 15 years, I always struggled to efficiently manage my inventory and forecast my orders. With Octogone and its AI Cortex, everything changed. Inventory automation saves us precious time, and the predictions are remarkably accurate. We no longer have stock shortages on our flagship ingredients like San Marzano tomatoes or mozzarella di bufala.",
    resultsFr: [
      "25% de réduction des coûts alimentaires",
      "3h économisées par jour sur la gestion",
      "0 rupture de stock depuis 6 mois",
      "Augmentation de 15% de la satisfaction client"
    ],
    resultsEn: [
      "25% reduction in food costs",
      "3 hours saved per day on management",
      "0 stock shortages in 6 months",
      "15% increase in customer satisfaction"
    ]
  },
  {
    id: "laurent-dubois",
    fullStoryFr: "En tant que chef-propriétaire d'un bistro traditionnel parisien, je cherchais une solution moderne sans perdre l'âme de mon établissement. Octogone a su s'adapter à nos spécificités : produits frais quotidiens, menu changeant selon les saisons, et gestion des vins. L'équipe a adopté l'outil très rapidement grâce à son interface intuitive.",
    fullStoryEn: "As chef-owner of a traditional Parisian bistro, I was looking for a modern solution without losing the soul of my establishment. Octogone adapted to our specificities: daily fresh products, seasonal menu changes, and wine management. The team adopted the tool very quickly thanks to its intuitive interface.",
    resultsFr: [
      "3h économisées quotidiennement",
      "Réduction de 30% du gaspillage alimentaire",
      "Meilleure rotation des vins",
      "Formation de l'équipe en 1 semaine"
    ],
    resultsEn: [
      "3 hours saved daily",
      "30% reduction in food waste",
      "Better wine rotation",
      "Team training in 1 week"
    ]
  },
  {
    id: "yuki-tanaka",
    fullStoryFr: "La cuisine japonaise exige une fraîcheur absolue et une précision millimétrique. Cortex comprend parfaitement nos contraintes : commandes de poisson quotidiennes, gestion des produits ultra-frais, et anticipation des pics de fréquentation. Les algorithmes s'adaptent même aux variations saisonnières de nos clients.",
    fullStoryEn: "Japanese cuisine demands absolute freshness and millimetric precision. Cortex perfectly understands our constraints: daily fish orders, ultra-fresh product management, and anticipating traffic peaks. The algorithms even adapt to seasonal variations in our clientele.",
    resultsFr: [
      "18% d'augmentation des marges",
      "0 rupture de stock sur les produits frais",
      "Optimisation des commandes de poisson",
      "Réduction de 40% des pertes"
    ],
    resultsEn: [
      "18% increase in margins",
      "0 stock shortages on fresh products",
      "Optimized fish orders",
      "40% reduction in losses"
    ]
  },
  {
    id: "sophie-martin",
    fullStoryFr: "Gérer une chaîne de 12 cafés était un défi constant : harmoniser les stocks, optimiser les achats groupés, et maintenir la qualité partout. Octogone centralise tout en respectant les spécificités de chaque point de vente. Le tableau de bord unifié nous donne une vision claire de notre performance globale.",
    fullStoryEn: "Managing a chain of 12 cafes was a constant challenge: harmonizing inventory, optimizing group purchases, and maintaining quality everywhere. Octogone centralizes everything while respecting the specificities of each point of sale. The unified dashboard gives us a clear vision of our overall performance.",
    resultsFr: [
      "Vision unifiée sur 12 établissements",
      "20% d'économies sur les achats groupés",
      "Standardisation des processus",
      "Pilotage de la croissance facilité"
    ],
    resultsEn: [
      "Unified vision across 12 locations",
      "20% savings on group purchases",
      "Process standardization",
      "Facilitated growth management"
    ]
  }
];

export default function TestimonialDetailPage() {
  const params = useParams();
  const locale = params?.locale as string || "fr";
  const testimonialId = params?.testimonialId as string;

  // Trouver le témoignage (qui contient déjà tous les détails depuis le JSON)
  const testimonial = testimonials.find((t: Testimonial) => t.id === testimonialId);
  
  // Trouver les détails supplémentaires pour les démos s'ils existent
  const demoDetails = demoTestimonialDetails.find((t: { id: string }) => t.id === testimonialId);
  
  // Combiner avec les détails démo si nécessaire (mémorisé pour éviter les recalculs)
  const fullTestimonial = useMemo(() => {
    return testimonial && !testimonial.fullStoryFr && demoDetails 
      ? { ...testimonial, ...demoDetails } 
      : testimonial;
  }, [testimonial, demoDetails]);

  // Mettre à jour les métadonnées dynamiquement
  useEffect(() => {
    if (fullTestimonial) {
      const title = locale === "fr" 
        ? `Témoignage ${fullTestimonial.nameFr} - ${fullTestimonial.businessFr} | Octogone`
        : `Testimonial ${fullTestimonial.nameEn} - ${fullTestimonial.businessEn} | Octogone`;
      
      const description = locale === "fr" ? fullTestimonial.quoteFr : fullTestimonial.quoteEn;
      
      document.title = title;
      
      // Métadonnées
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Open Graph
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMetaTag('og:title', title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:type', 'article');
      if (fullTestimonial.image) {
        updateMetaTag('og:image', fullTestimonial.image);
      }

      // Schema.org JSON-LD pour SEO - Review + Breadcrumb
      const existingSchema = document.getElementById('testimonial-schema');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Générer les schemas avec le générateur centralisé
      const reviewSchema = generateReviewSchema(fullTestimonial, locale);
      const breadcrumbSchema = generateTestimonialBreadcrumb(
        testimonialId,
        locale === "fr" ? fullTestimonial.nameFr : fullTestimonial.nameEn,
        locale
      );

      // Combiner les schemas
      const combinedSchemas = [reviewSchema, breadcrumbSchema];

      const script = document.createElement('script');
      script.id = 'testimonial-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(combinedSchemas);
      document.head.appendChild(script);
    }
  }, [fullTestimonial, locale, testimonialId]);

  // Si le témoignage n'existe pas, afficher une page 404
  if (!fullTestimonial) {
    return (
      <ResponsiveSection spacing="xl" className="text-center">
        <h1 className="text-4xl font-bold text-marine-900 mb-4">
          {locale === "fr" ? "Témoignage non trouvé" : "Testimonial not found"}
        </h1>
        <p className="text-lg text-marine-700">
          {locale === "fr" 
            ? "Le témoignage demandé n'existe pas ou a été supprimé." 
            : "The requested testimonial does not exist or has been removed."}
        </p>
      </ResponsiveSection>
    );
  }

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section du témoignage */}
      <article className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12" style={{ backgroundColor: 'var(--background)' }} itemScope itemType="https://schema.org/Review">
        <div className="w-full rounded-3xl p-8 lg:p-12 shadow-xl text-center" style={{ backgroundColor: 'var(--secondary-container)' }}>
          {/* Badge témoignage */}
          <div className="inline-block px-4 py-2 rounded-full font-semibold mb-6" style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}>
            {locale === "fr" ? "Témoignage Client" : "Customer Testimonial"}
          </div>

          {/* Citation principale */}
          <div className="text-6xl mb-4" style={{ color: 'var(--primary)' }} aria-hidden="true">&ldquo;</div>
          <blockquote className="text-2xl lg:text-3xl font-medium leading-relaxed mb-8" style={{ color: 'var(--on-secondary-container)' }} itemProp="reviewBody">
            {locale === "fr" ? fullTestimonial.quoteFr : fullTestimonial.quoteEn}
          </blockquote>

          {/* Étoiles */}
          <div className="flex justify-center mb-8">
            {[...Array(fullTestimonial.rating)].map((_, i) => (
              <svg key={i} className="w-8 h-8 mx-1" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--primary)' }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Nom et entreprise */}
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--on-secondary-container)' }} itemProp="name">
              {locale === "fr" ? fullTestimonial.nameFr : fullTestimonial.nameEn}
            </h1>
            <p className="text-xl" style={{ color: 'var(--on-secondary-container)' }} itemProp="jobTitle">
              {locale === "fr" ? fullTestimonial.businessFr : fullTestimonial.businessEn}
            </p>
          </div>
          <meta itemProp="ratingValue" content={fullTestimonial.rating.toString()} />
          <meta itemProp="bestRating" content="5" />
        </div>
      </article>

      {/* Image du client (pour les vrais témoignages) */}
      {fullTestimonial.isReal && fullTestimonial.image && (
        <ResponsiveSection spacing="xl">
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={fullTestimonial.image}
                alt={locale === "fr" ? fullTestimonial.businessFr : fullTestimonial.businessEn}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </ResponsiveSection>
      )}

      {/* Histoire complète */}
      <ResponsiveSection spacing="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--on-background)' }}>
            {locale === "fr" ? "L'histoire complète" : "The full story"}
          </h2>
          <div className="rounded-2xl shadow-lg p-8 lg:p-12" style={{ backgroundColor: 'var(--surface)' }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--on-surface)' }}>
              {locale === "fr" ? fullTestimonial.fullStoryFr : fullTestimonial.fullStoryEn}
            </p>
          </div>
        </div>
      </ResponsiveSection>

      {/* Résultats obtenus */}
      <ResponsiveSection spacing="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--on-background)' }}>
            {locale === "fr" ? "Résultats obtenus" : "Results achieved"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fullTestimonial.resultsFr && locale === "fr" && fullTestimonial.resultsFr.map((result: string, index: number) => (
              <div key={index} className="rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <p className="text-lg font-medium" style={{ color: 'var(--on-surface)' }}>{result}</p>
                </div>
              </div>
            ))}
            {fullTestimonial.resultsEn && locale === "en" && fullTestimonial.resultsEn.map((result: string, index: number) => (
              <div key={index} className="rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <p className="text-lg font-medium" style={{ color: 'var(--on-surface)' }}>{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResponsiveSection>

      {/* Call to action */}
      <ResponsiveSection spacing="xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--on-background)' }}>
            {locale === "fr" ? "Prêt à transformer votre restaurant ?" : "Ready to transform your restaurant?"}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--on-surface-variant)' }}>
            {locale === "fr" 
              ? "Rejoignez des centaines de restaurateurs qui font confiance à Octogone pour optimiser leur gestion."
              : "Join hundreds of restaurateurs who trust Octogone to optimize their management."}
          </p>
          <button className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}>
            {locale === "fr" ? "Demander une démo" : "Request a demo"}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </ResponsiveSection>
    </main>
  );
}
