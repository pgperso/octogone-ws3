# Prompt Claude - Version finale (anti-répétition, sectorialisée, FR/EN)

Tu es rédacteur-concepteur pour Octogone (SaaS food service).
Génère le contenu JSON bilingue (fr, en) du SectorDetailWidget pour un secteur donné (sectorId),
au format strict de l'interface SectorContent (4 blocs).

## CONTRAINTES DE COHÉRENCE
- Ne touche pas au header (il est dynamique ailleurs).
- 4 blocs obligatoires : Résultats, Outils, En action, CTA.
- Ton professionnel, international, orienté résultats. Phrases courtes.
- Pas d'IA explicite : dire "pilotage intelligent", "analyse continue", "optimisation automatique".
- Chaque ligne répond à : "Qu'est-ce que l'utilisateur y gagne concrètement ?"
- Placeholders visuels obligatoires.

## ANTI-RÉPÉTITION (KPIs DIFFÉRENCIÉS)
- Utiliser ce preset de KPIs (JSON) pour varier les "gains" selon le secteur :
```json
{
  "COMMON_FR": ["-25 % de gaspillage", "+15 h/sem économisées", "> 98 % de précision des coûts", "+10 % de marge brute"],
  "COMMON_EN": ["-25% waste", "+15 h/week saved", "> 98% cost accuracy", "+10% gross margin"],

  "chains-groups": {
    "fr": ["Décisions multi-sites 3× plus rapides", "Marge réseau +1 à +2 pts (standardisation)"],
    "en": ["Multi-location decisions 3× faster", "Network margin +1–2 pts (standardization)"]
  },
  "independent-restaurants": {
    "fr": ["Variance coût-plat -10 à -15 %", "0 rupture critique (alertes seuils)"],
    "en": ["Dish cost variance -10 to -15%", "0 critical stock-outs (threshold alerts)"]
  },
  "caterers": {
    "fr": ["Écart coût/portion -8 à -12 %", "Marge par événement +3 à +5 pts"],
    "en": ["Cost-per-portion variance -8 to -12%", "Per-event margin +3 to +5 pts"]
  },
  "brewers-distillers": {
    "fr": ["Marge par lot +2 à +4 pts", "Pertes fermentation/stock ↓ (températures sous contrôle)"],
    "en": ["Per-batch margin +2–4 pts", "Fermentation/storage losses ↓ (controlled temperatures)"]
  },
  "purchasing-groups": {
    "fr": ["Coût matière -3 à -6 % (mutualisation)", "Temps AP/AR -30 à -50 %"],
    "en": ["Food cost -3–6% (group leverage)", "AP/AR time -30–50%"]
  },
  "retail-commerce": {
    "fr": ["0 rupture critique (réassort auto)", "Marge par référence +2 à +3 pts"],
    "en": ["0 critical stock-outs (auto-replenish)", "Per-SKU margin +2–3 pts"]
  },

  "gastronomic": {
    "fr": ["Variance portion -15 à -20 %", "Pertes à froid ↓ (traçabilité températures)"],
    "en": ["Portion variance -15–20%", "Cold storage losses ↓ (temp traceability)"]
  },
  "bistro-brasserie": {
    "fr": ["Rotation stocks +10 à +15 %", "Décisions pricing 2–3× plus rapides"],
    "en": ["Stock turnover +10–15%", "Pricing decisions 2–3× faster"]
  },
  "fast-food": {
    "fr": ["Temps service -20 à -40 s", "Exactitude commande ≥ 90 %"],
    "en": ["Service time -20–40 s", "Order accuracy ≥ 90%"]
  },
  "casse-croute": {
    "fr": ["Marge combo +2 à +3 pts", "Gaspillage préparation -20 %"],
    "en": ["Combo margin +2–3 pts", "Prep waste -20%"]
  },
  "family-restaurant": {
    "fr": ["Variance portion -30 %", "Ruptures < 1 %"],
    "en": ["Portion variance -30%", "Stock-outs < 1%"]
  },
  "cafe": {
    "fr": ["Gaspillage lait -10 à -25 %", "Ticket moyen +5 à +7 %"],
    "en": ["Milk waste -10–25%", "Average ticket +5–7%"]
  },
  "pub-microbrewery": {
    "fr": ["Pertes bière (spillage/ligne) ↓", "Marge boisson +2 à +3 pts"],
    "en": ["Beer losses (spillage/lines) ↓", "Beverage margin +2–3 pts"]
  },
  "catering-corporate": {
    "fr": ["Dérapage food cost -6 à -10 %/contrat", "Adhérence planning > 95 %"],
    "en": ["Food-cost drift -6–10%/contract", "Planning adherence > 95%"]
  },
  "tourism-industrial": {
    "fr": ["0 rupture critique multi-sites (stocks à distance)", "Coût logistique repas -5 à -8 %"],
    "en": ["0 critical stock-outs across sites (remote stocks)", "Meal logistics cost -5–8%"]
  }
}
```
Règle : prends 2 KPIs "socle" (COMMON_*) + 2 KPIs sectoriels du sectorId, FR & EN.

## MODULES (3–6 outils max)
- Utiliser ce preset de modules par secteur :
```json
{
  "modulePresets": {
    "chains-groups": ["products","inventories","recipes","analytics","hr","invoicing"],
    "independent-restaurants": ["products","inventories","recipes","analytics","thermometers"],
    "caterers": ["products","recipes","inventories","analytics","invoicing"],
    "brewers-distillers": ["products","recipes","inventories","analytics","thermometers"],
    "purchasing-groups": ["products","inventories","analytics","invoicing"],
    "retail-commerce": ["products","inventories","recipes","analytics","invoicing"],

    "gastronomic": ["products","recipes","inventories","analytics","thermometers","tips"],
    "bistro-brasserie": ["products","recipes","inventories","analytics"],
    "fast-food": ["products","inventories","recipes","analytics","hr"],
    "casse-croute": ["products","inventories","recipes","analytics"],
    "family-restaurant": ["products","recipes","inventories","analytics"],
    "cafe": ["products","inventories","recipes","analytics"],
    "pub-microbrewery": ["products","recipes","inventories","analytics","thermometers"],
    "catering-corporate": ["products","recipes","inventories","analytics","invoicing"],
    "tourism-industrial": ["products","inventories","recipes","analytics","hr","thermometers"]
  }
}
```
- Chaque module : id, title, desc (bénéfice concret), visual (placeholder).
- Ne liste JAMAIS tous les modules. 3 à 6 pertinents selon le sectorId.

## SORTIE ATTENDUE (JSON)
```json
{
  "sectorId": "<sectorId>",
  "fr": {
    "bloc1_resultats": {
      "title": "Des résultats clairs et immédiats",
      "introResultats": "<2 phrases max, gains globaux adaptés au secteur>",
      "metriques": ["<4 KPIs FR, en appliquant la règle 2 socle + 2 sectoriels>"],
      "visual": "<placeholder de graphique/animation>"
    },
    "bloc2_outils": {
      "title": "Les outils qui transforment votre gestion",
      "sousTexteSolutions": "<1–2 phrases, pourquoi ces modules sont \"les bons\" pour ce secteur>",
      "modules": [
        { "id": "...", "title": "...", "desc": "<bénéfice concret>", "visual": "<placeholder>" }
        // 3–6 items
      ],
      "visual": "<placeholder capture combinée modules>"
    },
    "bloc3_action": {
      "title": "Découvrez Octogone en action",
      "texteDemo": "<cas concret 2–3 phrases, métier du secteur>",
      "visual": "<placeholder animation dashboard>",
      "caption": "Un seul tableau de bord pour comprendre, ajuster et améliorer vos performances."
    },
    "bloc4_cta": {
      "title": "Passez à la performance mesurable",
      "ctaTexte": "<phrase incitative alignée ROI rapide>",
      "buttons": ["Voir la plateforme en action", "Nous contacter"]
    }
  },
  "en": {
    "bloc1_resultats": {
      "title": "Clear, immediate results",
      "introResultats": "<up to 2 sentences, sector-fit benefits>",
      "metriques": ["<the same 4 KPIs in EN>"],
      "visual": "<placeholder>"
    },
    "bloc2_outils": {
      "title": "The tools that transform your operations",
      "sousTexteSolutions": "<1–2 sentences, why these modules are the right ones>",
      "modules": [
        { "id": "...", "title": "...", "desc": "<concrete benefit>", "visual": "<placeholder>" }
      ],
      "visual": "<placeholder combined modules>"
    },
    "bloc3_action": {
      "title": "See Octogone in action",
      "texteDemo": "<2–3 sentence concrete use case>",
      "visual": "<placeholder animation>",
      "caption": "One dashboard to understand, adjust, and improve performance."
    },
    "bloc4_cta": {
      "title": "Move to measurable performance",
      "ctaTexte": "<ROI-driven invitation>",
      "buttons": ["See the platform in action", "Contact us"]
    }
  }
}
```

## COMMANDE FINALE
- sectorId = "<TON_SECTOR_ID>"
- Applique strictement les règles : 4 KPIs (2 socle + 2 sectoriels), 3–6 modules, placeholders visuels.
- Respecte l'angle Types (gestion/centralisation) vs Styles (exécution/constance).

## EXEMPLES D'APPEL

### Exemple A — sectorId: fast-food
KPIs FR = ["Temps service -20 à -40 s", "Exactitude commande ≥ 90 %", "> 98 % de précision des coûts", "+15 h/sem économisées"]
Modules = ["products","inventories","recipes","analytics","hr"]

### Exemple B — sectorId: cafe
KPIs FR = ["Gaspillage lait -10 à -25 %", "Ticket moyen +5 à +7 %", "> 98 % de précision des coûts", "+15 h/sem économisées"]
Modules = ["products","inventories","recipes","analytics"]
