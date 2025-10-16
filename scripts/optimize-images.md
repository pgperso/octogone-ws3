# 🖼️ Optimisation des Images - Action Plan

## Images Critiques Détectées (> 500KB)

### 🚨 **URGENT - Images Lourdes**
- `bromont.png` - **3.5MB** ❌ (utilisée dans témoignages)
- `new_dashboard.png` - **1.2MB** ❌ (non utilisée - à supprimer)
- `happy_octogone_users.png` - **921KB** ❌ (utilisée dans features)
- `hero_image.png` - **918KB** ❌ (non utilisée - à supprimer)
- `serious_octogone_users.png` - **799KB** ❌ (non utilisée - à supprimer)

## Actions Recommandées

### 1. **Suppression Immédiate** (Images non utilisées)
```bash
# À supprimer - non utilisées dans le code
rm public/images/new_dashboard.png
rm public/images/hero_image.png  
rm public/images/serious_octogone_users.png
```

### 2. **Optimisation Critique** (Images utilisées)
```bash
# Optimiser avec des outils comme:
# - TinyPNG/TinyJPG
# - ImageOptim
# - Squoosh.app

# Cibles:
# bromont.png: 3.5MB → ~200KB (compression 95%)
# happy_octogone_users.png: 921KB → ~150KB (compression 85%)
```

### 3. **Formats Modernes**
Next.js convertit automatiquement en WebP/AVIF grâce à la config, mais les sources doivent être optimisées.

## Impact Performance Estimé
- **Réduction totale**: ~6.5MB → ~500KB
- **Amélioration LCP**: 2-3 secondes sur mobile
- **Score Lighthouse**: +15-20 points

## Statut
- ✅ Bundle analyzer ajouté
- ✅ Hook useReducedMotion créé  
- 🔄 Optimisation images en cours
