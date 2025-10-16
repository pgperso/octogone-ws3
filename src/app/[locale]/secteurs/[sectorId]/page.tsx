"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { getAllSectors, restaurantStyles, getNextSector, getPreviousSector } from "@/data/sectors-data";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectorDetailWidget from "@/components/widgets/sector-detail-widget";

export default function SectorDetailPage() {
  const params = useParams();
  const locale = params?.locale as string || "fr";
  const sectorId = params?.sectorId as string;

  // Trouver le secteur correspondant
  const allSectors = getAllSectors();
  const sector = allSectors.find(s => s.id === sectorId);
  
  // Déterminer si c'est un style de restaurant ou un type d'entreprise
  const isRestaurantStyle = restaurantStyles.some(s => s.id === sectorId);
  
  // Navigation entre secteurs
  const nextSector = getNextSector(sectorId, isRestaurantStyle);
  const previousSector = getPreviousSector(sectorId, isRestaurantStyle);

  // Si le secteur n'existe pas, afficher une page 404
  if (!sector) {
    return (
      <ResponsiveSection spacing="xl" className="text-center">
        <h1 className="text-4xl font-bold text-marine-900 mb-4">
          {locale === "fr" ? "Secteur non trouvé" : "Sector not found"}
        </h1>
        <p className="text-lg text-marine-700">
          {locale === "fr" 
            ? "Le secteur demandé n'existe pas ou a été supprimé." 
            : "The requested sector does not exist or has been removed."}
        </p>
      </ResponsiveSection>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section du secteur avec image */}
      <ResponsiveSection 
        spacing="xl" 
        className="relative overflow-hidden"
      >
        {/* Image de fond */}
        {sector.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={sector.image}
              alt={locale === "fr" ? sector.titleFr : sector.titleEn}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        )}

        <div className="relative z-10 text-center">
          {/* Catégorie en texte simple */}
          <p className="text-white text-lg font-semibold mb-4 opacity-90">
            {locale === "fr" 
              ? (isRestaurantStyle ? "Style de restaurant" : "Type d'entreprise")
              : (isRestaurantStyle ? "Restaurant style" : "Business type")
            }
          </p>

          {/* Titre du secteur */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            {locale === "fr" ? `Octogone pour ${sector.titleFr}` : `Octogone for ${sector.titleEn}`}
          </h1>
          
          {/* Description du secteur */}
          <p className="text-lg text-white opacity-90 max-w-3xl mx-auto mb-8">
            {locale === "fr" ? sector.descriptionFr : sector.descriptionEn}
          </p>

          {/* Navigation inter-secteurs */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Bouton Précédent */}
            {previousSector && (
              <Link 
                href={`/${locale}/secteurs/${previousSector.id}`}
                className="flex items-center gap-3 px-6 py-3 w-64 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#dcb26b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
              >
                <ChevronLeft className="w-6 h-6 text-marine-700" />
                <div className="text-center min-w-0 flex-1">
                  <div className="text-sm font-medium text-marine-900 overflow-hidden text-ellipsis whitespace-nowrap">
                    {locale === "fr" ? previousSector.titleFr : previousSector.titleEn}
                  </div>
                </div>
              </Link>
            )}

            {/* Bouton Suivant */}
            {nextSector && (
              <Link 
                href={`/${locale}/secteurs/${nextSector.id}`}
                className="flex items-center gap-3 px-6 py-3 w-64 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#dcb26b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
              >
                <div className="text-center min-w-0 flex-1">
                  <div className="text-sm font-medium text-marine-900 overflow-hidden text-ellipsis whitespace-nowrap">
                    {locale === "fr" ? nextSector.titleFr : nextSector.titleEn}
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-marine-700" />
              </Link>
            )}
          </div>
        </div>
      </ResponsiveSection>

      {/* Widget de contenu principal */}
      <SectorDetailWidget 
        sector={sector} 
        locale={locale} 
        isRestaurantStyle={isRestaurantStyle}
      />
    </main>
  );
}
