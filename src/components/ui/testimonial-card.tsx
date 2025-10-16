"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  className?: string;
  avatarIndex?: number; // Index pour générer un avatar aléatoire
  avatarImage?: string; // Chemin vers l'image d'avatar (optionnel)
  isFlipped?: boolean;
}

/**
 * Composant TestimonialCard - Affiche un témoignage client
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  className = "",
  avatarIndex = 0, // Valeur par défaut déterministe
  avatarImage,
  isFlipped = false,
}) => {
  // Pas d'animation pour éviter les problèmes

  // Générer une couleur de fond aléatoire pour l'avatar basée sur l'index
  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-amber-100 text-amber-600',
      'bg-rose-100 text-rose-600',
      'bg-teal-100 text-teal-600',
      'bg-indigo-100 text-indigo-600',
      'bg-orange-100 text-orange-600',
      'bg-cyan-100 text-cyan-600',
      'bg-emerald-100 text-emerald-600'
    ];
    return colors[index % colors.length];
  };

  // Générer les initiales à partir du nom (version déterministe)
  const getInitials = (name: string) => {
    // S'assurer que le même résultat est généré côté serveur et client
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length >= 2) {
      return `${nameParts[0][0]}${nameParts[0][1]}`.toUpperCase();
    } else {
      return (nameParts[0][0] || '?').toUpperCase();
    }
  };

  return (
    <div className={`flex h-full ${className}`}>
      {/* Avatar à gauche et étoiles */}
      <div className="mr-4 flex flex-col">
        {/* Avatar avec animation slide-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {avatarImage ? (
            <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm relative">
              <Image 
                src={`/${avatarImage}`} 
                alt={`Avatar de ${name}`}
                width={56}
                height={56}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getAvatarColor(avatarIndex)}`}>
              <span className="font-semibold text-base">{getInitials(name)}</span>
            </div>
          )}
        </motion.div>
        
        {/* 3 étoiles dorées avec animation slide-right */}
        <div className="flex mt-2 justify-center">
          <motion.svg 
            className="w-4 h-4 text-gold-500 fill-current" 
            viewBox="0 0 24 24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </motion.svg>
          <motion.svg 
            className="w-4 h-4 text-gold-500 fill-current mx-0.5" 
            viewBox="0 0 24 24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </motion.svg>
          <motion.svg 
            className="w-4 h-4 text-gold-500 fill-current" 
            viewBox="0 0 24 24"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </motion.svg>
        </div>
      </div>
      
      {/* Contenu à droite */}
      <div className="flex flex-col flex-grow">
        {/* Citation */}
        <div>
          <p className="text-gold-800 text-sm md:text-base italic mb-1">{quote}</p>
        
          {/* Informations sur l'auteur directement sous le témoignage */}
          <div className="mt-1">
            <p className="text-gold-700 font-semibold">{name}</p>
            <p className="text-gold-600 text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
