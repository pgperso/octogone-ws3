"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Testimonial } from "@/data/testimonials-data";

interface TestimonialWidgetProps {
  testimonial: Testimonial;
  locale: string;
  className?: string;
  showTitle?: boolean;
  title?: {
    fr: string;
    en: string;
  };
}

/**
 * Widget TestimonialWidget - Affiche un témoignage avec le style uniforme
 * Utilisable partout dans l'application avec le même rendu
 */
const TestimonialWidget: React.FC<TestimonialWidgetProps> = ({
  testimonial,
  locale,
  className = "",
  showTitle = true,
  title = {
    fr: "Témoignage client",
    en: "Client testimonial"
  }
}) => {
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {showTitle && (
        <h3 className="text-2xl font-bold text-marine-900 mb-8 text-center">
          {locale === "fr" ? title.fr : title.en}
        </h3>
      )}
      
      <Link
        href={`/${locale}/temoignages/${testimonial.id}`}
        className="block group cursor-pointer w-full flex-1 flex"
      >
        <div className="bg-white rounded-2xl overflow-hidden relative transform transition-all duration-700 ease-out group-hover:scale-102 border-2 w-full flex flex-col" style={{ borderColor: '#E5E5E5' }}>
          {/* Image de fond */}
          {testimonial.image && (
            <div className="relative h-48 lg:h-64 w-full flex-shrink-0">
              <Image
                src={testimonial.image}
                alt={locale === "fr" ? testimonial.businessFr : testimonial.businessEn}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
          )}
          
          {/* Contenu */}
          <div className="relative p-8 lg:p-12 flex-1 flex flex-col justify-between">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4" style={{ color: '#BADFF6' }}>&ldquo;</div>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 line-clamp-3">
                {locale === "fr" ? testimonial.quoteFr : testimonial.quoteEn}
              </p>
              
              {/* Étoiles */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 mx-1" fill="#dcb26b" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Nom et entreprise */}
              <div>
                <h4 className="text-xl font-bold text-marine-900 mb-2">
                  {locale === "fr" ? testimonial.nameFr : testimonial.nameEn}
                </h4>
                <p className="text-marine-600">
                  {locale === "fr" ? testimonial.businessFr : testimonial.businessEn}
                </p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <div className="inline-flex items-center text-marine-600 group-hover:text-marine-800 transition-colors duration-500">
                <span className="text-sm font-medium">
                  {locale === "fr" ? "Lire le témoignage complet" : "Read full testimonial"}
                </span>
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TestimonialWidget;
