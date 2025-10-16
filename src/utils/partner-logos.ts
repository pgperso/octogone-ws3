// Utilitaire pour les logos partenaires

// Interface pour les logos partenaires
export interface PartnerLogo {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

// Logos partenaires statiques
export const staticPartnerLogos: PartnerLogo[] = [
  {
    id: 1,
    name: "Archibald",
    logo: "/images/partners/archibald-logo.png",
    alt: "Logo Archibald",
  },
  {
    id: 2,
    name: "Arsenal",
    logo: "/images/partners/arsernal_lowres.png",
    alt: "Logo Arsenal",
  },
  {
    id: 3,
    name: "Ashton",
    logo: "/images/partners/ashton_logo_plein_rvb_ketchup.png",
    alt: "Logo Ashton",
  },
  {
    id: 4,
    name: "Assemblée Nationale du Québec",
    logo: "/images/partners/Assemblee-Nationale-Quebec_couleur-ms (1).jpg",
    alt: "Logo Assemblée Nationale du Québec",
  },
  {
    id: 5,
    name: "Belle et Boeuf",
    logo: "/images/partners/belle-et-boeuf-logo (1).png",
    alt: "Logo Belle et Boeuf",
  },
  {
    id: 6,
    name: "Biceps BBQ",
    logo: "/images/partners/biceps_bbq (1).png",
    alt: "Logo Biceps BBQ",
  },
  {
    id: 8,
    name: "Chez Boulay",
    logo: "/images/partners/Chez_Boulay (1).png",
    alt: "Logo Chez Boulay",
  },
  {
    id: 9,
    name: "Micro Resto",
    logo: "/images/partners/logo-2020-Micro-Resto (1).jpg",
    alt: "Logo Micro Resto",
  },
  {
    id: 10,
    name: "Germain Hôtels",
    logo: "/images/partners/Logo_GermainHotels_FR (1).png",
    alt: "Logo Germain Hôtels",
  },
  {
    id: 11,
    name: "Les Botanistes",
    logo: "/images/partners/logo_les-botanistes-768x768-1 (1).jpg",
    alt: "Logo Les Botanistes",
  },
  {
    id: 12,
    name: "Restaurant Partenaire",
    logo: "/images/partners/Logo_RP_vertical (2).png",
    alt: "Logo Restaurant Partenaire",
  },
  {
    id: 13,
    name: "Restos Plaisir",
    logo: "/images/partners/restos_plaisir (2).png",
    alt: "Logo Restos Plaisir",
  },
  {
    id: 14,
    name: "Top Resto",
    logo: "/images/partners/Top_resto (1).png",
    alt: "Logo Top Resto",
  },
];

// Fonction pour ajouter un nouveau logo partenaire
export function addPartnerLogo(name: string, logo: string): PartnerLogo {
  const newLogo: PartnerLogo = {
    id: staticPartnerLogos.length + 1,
    name,
    logo,
    alt: `Logo ${name}`,
  };

  return newLogo;
}
